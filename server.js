/*  JavaScript node code for a file server that services
 *  the client's requests for trials and data exchanges.
 *  Make sure the port you are using is cleared by firewall settings.
 *  Roberto Viviani, December 2021
 */

const PORT = 61543;  //Change this to set the port of your server

var http = require("http"), 
	fs = require("fs");
var favicon = fs.readFileSync("./HayStack.ico");
var mainpage = fs.readFileSync("./Main.html", "utf8");
//var clientjs = fs.readFileSync("./client.js");  //decomment here and below after development

/* Load tests from script.js, the file that contains all questions or items */
var tests = process.argv.length > 2 ? require("./" + process.argv[2]) : require("./script");
function checkTests(tests) {
    for (let testID in tests) {
        let test = tests[testID];
        test.testID = testID;

        //check required properties and if required set to default values
        if (undefined === test.frame) throw("Test " + testID + ": no frame specified in script.");
        let noOutputFrames = new Set(["infopage"]);
        if (undefined === test.timeout && !noOutputFrames.has(test.frame)) {
            test.timeout = 0;
            console.log("Test " + testID + ", property timeout: set to default value none");
        }
        if (undefined === test.timeRefractory && !noOutputFrames.has(test.frame)) {
            test.timeRefractory = 0;
            console.log("Test " + testID + ", property timeRefractory: set to default value none");
        }
        if (undefined === test.skipOutput && !noOutputFrames.has(test.frame)) {
            test.skipOutput = false;
            console.log("Test " + testID + ", property skipOutput: set to default value 'false'");
        }
        if (undefined === test.randomOrder) test.randomOrder = false;
        if (undefined === test.randomBlock) test.randomBlock = []; else test.randomBlock.length;
        
        if (undefined !== test.itemID)    throw("Test " + testID + ": itemID property invalid here");
        if (undefined !== test.timestamp) throw("Test " + testID + ": timestamp property invalid here");
        if (undefined !== test.source)    throw("Test " + testID + ": source property invalid here");
        if (undefined !== test.sessionID) throw("Test " + testID + ": sessionID property invalid here");
        if (undefined !== test.trialID)   throw("Test " + testID + ": trialID property invalid here");
        if (undefined !== test.subjectID) throw("Test " + testID + ": subjectID property invalid here");
        if (undefined !== test.block)     throw("Test " + testID + ": block property invalid here");

        //bequeth porperties to trials and check required properties
        let fields = Object.keys(test);
        for (let i in test.trials) {
            let trial = test.trials[i];
            for (let j in fields) {
                let fname = fields[j];
                if ("trials" === fname) continue; 
                if ("options" === fname) continue;
                if (undefined === trial[fname]) trial[fname] = test[fname];
            }
            if (undefined === trial.itemID) throw("Test " + testID + ": item at position " + i + " has no itemID field.");
            if (undefined === trial.data)   throw("Test " + testID + ", item " + trial.itemID + ": missing data property.");
            if (!Array.isArray(trial.data)) throw("Test " + testID + ", item " + trial.itemID + ": data property must be an array.");
            if (undefined === trial.type) trial.type = "";
            if (undefined === trial.polarity) trial.polarity = 0;
            test.trials[i] = trial;
        }

        //create app-wide function for random blocks in tests
        if (test.randomBlock.length > 0)
            test.randomBlockFunction = randMatcher(test.randomBlock);
    }
    console.log("Available tests:");
    for (let tt in tests) console.log(tt);
    return tests;
}
tests = checkTests(tests);

//helper function to random shuffle arrays
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
function shuffleTrials(trials) {
    //select trials to reorder. If randomOrder property is not defined, 
    //define it assuming shuffle
    let shTrials = trials.filter(function(value) {
        if (undefined === value.randomOrder) return true;
        return value.randomOrder;
    });
    //reorder
    shTrials = shuffle(shTrials);
    //copy back reordered trials, leaving not-reordered intact
    return trials.map(function(value) {
        return value.randomOrder ? shTrials.pop() : value;
    });
}  
function randMatcher(block) {
    //initialized to an array of indices, returns a function that
    //samples from the indices w/o replacement, restarting after
    //selecting all values. For use to create matched random samples.
    let buffer = [];
    return function() {
        if (buffer.length === 0) {
            buffer = block.slice();
            buffer = shuffle(buffer);
        }
        let value = buffer.pop();
        console.log("returning sampled block " + value);
        return value;
        //return buffer.pop();
    }
}


/* Output. This section serializes to disk the data received from the client */

//Create output file if not present. The server must be restarted when deleting the database.
var dr = fs.readdirSync(".");
dr.find((el) => el === "Database.txt") || fs.writeFileSync(
	"./Database.txt", 
	"sessionID\tsubjectID\ttestID\ttrialID\titemID\ttype\tpolarity\tresponse\tRT\trespKey\tresponseData\ttrialData\tversion\ttimestamp\tsource\n",
	"utf-8"
);
dr.find((el) => el === "SocioDemographics.txt") || fs.writeFileSync(
	"./SocioDemographics.txt", 
	"sessionID\tsubjectID\tAge\tSex\tEdu\tOccupation\tRiskAttitude\ttimestamp\tsource\n",
	"utf-8"
);

//Halper function to save input data to disk
function serializeData(data, source) {
	if (undefined === data || 0 === data.length) {
		console.log("No data received in serializer"); 
		return; 
	}
    //reformat source
    let src = /\d+\.\d+\.\d+\.\d+/.exec(source);
    if (null !== src) source = src[0]; 
    let text = "";
	for (let i = 0; i < data.length; ++i) {
        let trial = data[i];
        if (trial.testID === "LOGOFF") {
            let logoffData = JSON.parse(trial.responseData);
            let logoffText = [logoffData.firstName, logoffData.secondName, 
                logoffData.matriculationNo, logoffData.logonId, logoffData.email, trial.timestamp];
            console.log(logoffText);
            fs.appendFile("./Credits.txt", logoffText.join("\t") + "\n", "utf8", 
                 err => err ? console.log("error " + err) : 
                 console.log("credits saved for " + logoffData.logonId));
            continue;
        }
        if (trial.testID === "SOCDEM") {
            let socdemData = JSON.parse(trial.responseData);
            let socdemText = [trial.sessionID, trial.subjectID, socdemData.age, 
                socdemData.sex, socdemData.edu, socdemData.occ, socdemData.rsk,
                trial.timestamp, source];
            fs.appendFile("./SocioDemographics.txt", socdemText.join("\t") + "\n", "utf8", 
                 err => err ? console.log("error " + err) : 
                 console.log("Socdem info saved for " + trial.subjectID));
            continue;
        }
        let trialtext = [trial.sessionID, trial.subjectID, trial.testID, trial.trialID, 
            trial.itemID, trial.type, trial.polarity, trial.response, trial.RT, trial.respKey, 
            trial.responseData, trial.trialData, trial.version, trial.timestamp, source];
		text += trialtext.join("\t");
		text += "\n";
	}
	fs.appendFile("./Database.txt", text, "utf8", 
				  err => err ? console.log("error " + err) : console.log("data saved for " + data[0].subjectID));
}

function getTimestamp(dat) {
    if (undefined === dat) dat = new Date(Date.now());
    return dat.toLocaleDateString() + ' ' + dat.getHours() + ':' + dat.getMinutes() + 
        ' ' + /GMT\+\d+/.exec(dat.toString())[0];
}


/* HTTP protocol services */

//The requests handler
var counter = 0;
function requestHandler(request, response) {
	
	request.on("error", function(e) {
		//this should avoid error being thrown, leading to crash
		console.log(e.stack);
		try {
			respondError(405, "Request error: " + e);
		} catch(e) {;}
	});
	
	switch (request.method) {
		
		case "GET" :
            //We first check that the requests conforms to a number of predefined
            //cases that encode reqeusting the test data. Below, if all these
            //checks fail, the server reverts to a file server.
            let requrl = request.url;
            let testNames = undefined;
            let testData = undefined;

            //request for html page for one or more tests
            let reg = /^\/?test:([\w]+,)*([\w]+)$/;  //one or more tests
			if (reg.test(requrl)) {
                testNames = requrl.split(/[:,]/);
                testNames.splice(0, 1); //drop the first element, 'test'
                //check on testnames
                for (let n = 0; n < testNames.length; ++n) {
                    let testName = testNames[n];
                    if (undefined === tests[testName]) {
                        console.log("Invalid request: " + testName + " not found in test cache");
                        respondError(404, "Invalid request: test " + testName + " is not known.");
                        return;
                    } else console.log("Requested test: " + testName);
                }
                requrl = "mainpage";  //internal name for switch code below
			}
            reg = /^\/?test:?$/;  //all available tests in script
            if (reg.test(requrl)) {
                requrl = "mainpage";
                testNames = Object.keys(tests);
            }

            //request for test data
			reg = /^\/?trials:.+:([\w]+,)*([\w]+)$/;   //one or more tests
			if (reg.test(requrl)) {
                testNames = requrl.split(/[:,]/);
                testNames.splice(0, 1); //drop the first element, 'trials'...
                let subjectID = testNames.splice(0, 1); //...the subjectID (not used at present)
                console.log("Subject ID: " + subjectID);
                //check on testname (unnlikely, tested previously)
                testData = [];
                for (let n = 0; n < testNames.length; ++n) {
                    let testName = testNames[n];
                    if (undefined === tests[testName]) {
                        console.log("Invalid request: " + testName + " not found in test cache");
                        respondError(404, "Invalid request: test " + testName + " is not known.");
                        return;
                    } else {
                        //random block function copied by reference here, as wished.
                        testData.push(Object.assign({}, tests[testName]));
                    }
                }
				if (testData === undefined || 0 === testData.length) {
					console.log("Invalid request: no test found in test cache");
					respondError(404, "Invalid request: no test found in test cache");
					return;
				}
                //initialize or refine the tests in testData
                testData.forEach(function(test) {
                    //if there are subsets of trials to randomize, do it here.
                    if (test.randomBlock.length > 0) {
                        //let block = test.randomBlock[Math.floor(Math.random() * test.randomBlock.length)];
                        let block = test.randomBlockFunction();
                        console.log("Selected block: " + block);
                        let trials = [];
                        for (let t = 0; t < test.trials.length; t++) 
                            if (test.trials[t].block === undefined || test.trials[t].block === block) 
                                trials.push(test.trials[t]);
                        test.trials = trials;
                    }
                    //here random shuffle of sents.trials
                    if (test.randomOrder)
                        test.trials = shuffleTrials(test.trials);
                    test.sessionID = undefined; //sent over in html page, not here
                    test.timestamp = getTimestamp();
                });
				requrl = "trials";  //internal name for switch code below
			}
			switch (requrl) {
                case "mainpage":
                    //This is the request of the main html page. It is the entry point of new users.
                    //A session ID is issued at this point (and new requests of this page, as in a
                    //refresh, will generate a new session ID). The session ID is coded in a variable
                    //created by JavaScript code in the pag itself. Also the requested tests (from
                    //the url) or those available in the script are coded in the variable testRequest.
                    counter = counter + 1;
					response.setHeader("Content-Type", "text/html");
                    response.setHeader("access-control-allow-origin", "*");
					response.statusCode = 200;
                    let page = mainpage.replace("{{TESTREQUEST}}", 
                        "hayStack.testRequest = " + JSON.stringify(testNames) + ";hayStack.sessionID = " + counter + ";");
                    response.end(page);
                    break;
                
				case "trials":
                    //The client issues this request when it fechtes the trials to be presented.
					console.log("uploading main to " + request.socket.remoteAddress + " - " + getTimestamp());
					response.setHeader("Content-Type", "text/html");
                    response.setHeader("access-control-allow-origin", "*");
                    response.statusCode = 200;
                    //send over data
                    response.end(JSON.stringify(testData));
                    break;

                /*
				case "/styles.css":
					console.log("uploading styles.css to " + request.socket.remoteAddress + " - " + Date(Date.now()));
					response.setHeader("Content-Type", "text/css");
					response.setHeader("access-control-allow-origin", "*");
					response.statusCode = 200;
					response.end(stylesheet);
					break;  
					
				case "/client.js":
					console.log("uploading client.js to " + request.socket.remoteAddress + " - " + getTimestamp());
					response.setHeader("Content-Type", "text/javascript");
					response.setHeader("access-control-allow-origin", "*");
					response.statusCode = 200;
					response.end(clientjs);
                    break;
                */
                
               case "/favicon.ico":
                console.log("uploading favicon.ico to " + request.socket.remoteAddress + " - " + getTimestamp());
                response.setHeader("Content-Type", "image/ico");
                response.setHeader("access-control-allow-origin", "*");
                response.statusCode = 200;
                response.end(favicon);
                break;
                
            default:
                    //here, we service all other requests by reverting to a file server.
                    let pathname = urlToPath(request.url);
                    if (!pathname) {respondError(405, "Invalid request: invalid url: " + pathname); return; }
                    //console.log("Request GET " + pathname);
                    fs.stat(pathname, function(error, stats) {
                        if (error && error.code == "ENOENT")
                            respondError(404, logRequest(request, "File not found: " + pathname));
                        else if (error)
                            respondError(500, logRequest(request, error.toString()));
                        else if (stats.isDirectory())
                            respondError(405, logRequest(request, 
                                "Invalid request: directory inquiry: " + pathname));
                        else {
                            response.setHeader("content-type", getType(pathname));
                            response.setHeader("access-control-allow-origin", "*");
                            response.statusCode = 200;
                            try {
                                let body = fs.createReadStream(pathname);
                                if (body && body.pipe)
                                    body.pipe(response);
                                else if (body)
                                    response.end(body);
                                else
                                    respondError(500, "Could not read file");
                            } catch(e) {
                                respondError(500, "Could not read file: " + pathname + 
                                    ": " + e);
                            }
                        }
                    });
                    break;
			}
			break;
			
		case "POST" :
			console.log("receiving POSTed data...");
			let buff = "";
			request.setEncoding("utf-8");
			request.on("data", function (chunk) {
				buff += chunk;
			});
			request.on("end", function () {
				//check we are not being sent something else
				if (buff.slice(0,14) !== '[{"sessionID":') {
					logRequest(request, "Invalid POST: " + buff);
					response.statusCode = 405;
					response.end();
					return;
                }
				serializeData(JSON.parse(buff), request.socket.remoteAddress);
				response.statusCode = 200;
				response.end();
			});
			break;
			
		default :
			logRequest(request, "Invalid method: " + request.method + " " + request.url);
			respondError(405, "Invalid request");
			return;
	}
	
    //local functions
	function respondError(errcode, body) {
		console.log("Responding with error " + errcode + ": " + body);
		response.setHeader("Content-Type", "text/plain");
		response.statusCode = errcode;
		response.end(body);
	}
	
	function logRequest(request, msg) {
		console.log(msg + " (remote address: " + 
            request.socket.remoteAddress + " - " + getTimestamp() + ")");
        return msg;
    }
    
    function urlToPath(url) {
        //this checks that request is legit by detecting crawling
        let path = require("url").parse(url).pathname;
        if (/[\.]+[\\\/]/.test(path)) {
            console.log("Attempted path crawling:");
            console.log(path);
            return "";   //no directory crawl
        }
        if (/^[A-Za-z]:.*/.test(path)) {
            console.log("Attempted path crawling");
            console.log(path);
            return "";   //no directory crawl
        }
        //if (/\.js$/.test(path)) return "";		//no js code
        if (/node_modules/.test(path)) return ""; //no access js modules
        return "." + decodeURIComponent(path);
      }

    function getType(path) {
        let ext = /\.\w+$/.exec(path);
        switch (ext[0].toLowerCase()) {
            case '.js' :
                return 'text/javascript';
            case '.html' :
            case '.htm' :
                return 'text/html';
            case '.css' :
                return 'text/css';
            default:
                console.log("Unrecognized type: " + ext[0]);
                return 'text/plain';
        }
    }
      
}

//This starts the server.
var server = http.createServer(requestHandler);
try {
	server.listen(PORT);
	console.log("Server opened at port " + PORT);
} catch (e) {
	console.log(e);
	console.log("Could not open socket at port " + PORT + ", exiting");
}
