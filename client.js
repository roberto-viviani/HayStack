/*  Main client script. You request a test from those listed in script.js
    by requiring the page test:testname, for example for SSTDepr,
    http://safpsy186.psychiatrie3.uni-ulm.de:61543/test:SSTDepr 
    The server checks that SSTDepr is in the script, and if this is the
    case it sends back the html page with the interface for the log on.
    The requested test name (in the example above, SSTDepr) is saved to
    window.hayStack.testRequest. After the log on, the trials are retrieved 
    via an internal call to trials:testname, where testname is the name
    of the test (in the example, SSTDepr). The purpose of this two-step 
    procedure is to allow customizing the trial sequence based on the 
    participant name (for example by repeated logons).
 */

//define own namespace
if (undefined === window.hayStack) window.hayStack = {};

//a view object to handle elements of the standard page, which
//contains a div element named 'interface'.
hayStack.view = {
    //clear interface and display message
    msg : function(txt) {
        elem = document.getElementById("interface");
        if (undefined == elem) {
            document.documentElement.innerHTML = "<p>" + txt + "</p>";
            throw("Error on loading page: " + txt);
        }
        elem.innerHTML = "<p id='msg'>" + txt + "</p>";
        elem.style.fontSize = "2vw";
        return elem;
    },

    //set any id-ed element of interface
    set : function(content, elemid) {
        if (undefined === elemid) elemid = "interface";
        elem = document.getElementById(elemid);
        elem.innerHTML = content;
        return elem;
    },

    //set a frame template or style
    setInterface : function(templateName) {
        elem = document.getElementById("interface");
        templ = document.getElementById(templateName);
        if (undefined === templ) 
            elem.innerHTML = "<p>Invalid template frame or frame not found: " + templateName + "</p>";
        else
            elem.innerHTML = templ.innerHTML;
        return elem;
    },
    setStyle : function(styleName) {
        elem = document.getElementById("styleSpec");
        templ = document.getElementById(styleName);
        if (undefined === templ) 
            elem.innerHTML = "<p>Invalid style name or style not found: " + styleName + "</p>";
        else
            elem.innerHTML = templ.innerHTML;
        return elem;
    },
};
hayStack.view.setTemplate = function(templateName, styleName) {
    elem = hayStack.view.setInterface(templateName);
    if (undefined !== elem)
        hayStack.view.setStyle(styleName);
    return elem;
};

//set up output object to push data to server
hayStack.output = (function () {
    var subjectID = undefined;
    var sessionID = window.hayStack.sessionID;
    var trialCounter = 0;
    var data = [];
    
    //post data. data must be an array.
    var post = function(data, onTerminate) {
        seq = new XMLHttpRequest();
        //try and identify server, on fail use sapfsy186
        var reg = /^http:\/(\/.*:\d+)/;
        var url = reg.exec(document.baseURI);
        var SERVER = "/safpsy186.psychiatrie3.uni-ulm.de:61543";
        undefined === url ? seq.open("POST", SERVER) :  seq.open("POST", url[0]);
        seq.addEventListener("load", (undefined === onTerminate) ? function() {} : onTerminate);
        seq.setRequestHeader("Content-Type", "text/plain");
        seq.send(JSON.stringify(data));
    };

    //an empty trial object for posting to the server.
    var getEmptyTrial = function() {
        trial = {};
        trial.sessionID = sessionID;
        trial.subjectID = ""; 
        trial.testID = ""; 
        trial.trialID = 0; 
        trial.itemID = "";
        trial.type = "";
        trial.polarity = 0;
        trial.response = "";
        trial.RT = 0;
        trial.respKey = ""; 
        trial.responseData = "";
        trial.trialData = "";
        trial.version = "";
        trial.timestamp = "";
        trial.source = "";
        return trial;
    };
        
    return {
        //call this to register a new logon. Flushes data to server
        registerSid : function(sid, onTerminate) {
            subjectID = sid;
            trial = getEmptyTrial();
            trial.timestamp = hayStack.output.datestamp();
            trial.testID = "LOGON";
            trial.subjectID = sid;
            post([trial], onTerminate);
        },
        //cumulates data into buffer.
        pushTrial : function(trial) {
            trial.subjectID = subjectID;
            data.push(trial);
        },
        //send buffered data to server.
        postTrials : function(onTerminate) {
            if (undefined === onTerminate) onTerminate = function() {};
            if (0 === data.length) {
                onTerminate();
                return;
            }
            post(data, onTerminate);
            data = [];
        },
        //utilities to compose output
        emptyTrial : function() {
            trial = getEmptyTrial();
            trial.sessionID = sessionID;
            trial.subjectID = subjectID;
            trial.trialID = ++trialCounter;
            return trial;
        },
        datestamp : function(timedata) {
            if (undefined === timedata) timedata = new Date(Date.now());
            return timedata.toLocaleDateString() + ' ' + 
                timedata.getHours() + ':' + timedata.getMinutes() + 
                ' ' + /GMT\+\d+/.exec(timedata.toString())[0];
        },
        timestamp : function(timedata) {
            if (undefined === timedata) timedata = new Date(Date.now());
            else timedata = new Date(timedata);
            return timedata.getHours() + ':' + timedata.getMinutes() + 
                ':' + timedata.getSeconds();
        },
        getSubjectID : function() {
            return subjectID;
        }
    };
})();

//the co-routine framework.
hayStack.continuations = (function() {
    var continuations = [];
    var counter = -1;
    var inputCheck = function(cont) {
        if (typeof cont !== "function") {
            continuations = [];
            hayStack.view.msg("Non-function submitted as continuation");
            throw("Non-function submitted as continuation");
        }
    };
    var coRoutine = {
        //invoke next continuation
        next : function () {
            counter = counter + 1;
            if (counter >= continuations.length) return;
            (continuations[counter])();
        },
        //add continuation
        push : function(cont) { 
            inputCheck(cont);
            continuations.push(cont); 
        },
        //concatenate continuations at end
        append : function(conts) {
            if (Array.isArray(conts))
                conts.forEach(function(value) {
                    inputCheck(value);
                    continuations.push(value);
                });
            else
                continuations.push(cont);
        },
        //insert continuation or array of continuations at position
        insert : function (conts, position) {
            if (undefined === position) position = counter + 1;
            if (Array.isArray(conts))
                for (var i = conts.length - 1; i >= 0; i--) {
                    inputCheck(conts[i]);
                    continuations.splice(position, 0, conts[i]);
                }
                else {
                    inputCheck(conts);
                    continuations.splice(position, 0, conts);
                }
        },
        dump : function() {  //debug purposes
            console.log(continuations); 
            console.log("Current ptr: " + counter); 
        },
        clear : function() {  //to stop in case of error
            continuations = []; 
            counter = -1; 
            console.log("continuation queue cleared from code.");
        } 
    };
    return coRoutine;
})();

/* This is where the main flow is specified by stacking the 
    continuations. This results is a mapping from the list of
    trials to the list of continuations to the list of results. */

//The first continuation collects the ID of the participant.
hayStack.continuations.push(
    function () {
        //setup interface to query id from user
        var lbl = document.getElementById("lblInput");
        lbl.style.visibility = "visible";
        lbl.innerHTML = "Bitte tragen Sie Ihre Identifikationskode hier ein:";
        var txt = document.getElementById("subjId");
        txt.style.visibility = "visible";
        txt.value = "";
        txt.focus();
        var btnNext = document.getElementById("btnNext");  //btnRecordID
        btnNext.style.visibility = "visible";
        var regID = /^\d\d\D\D\D$/;
        var subjInput = document.getElementById("subjId");
        btnNext.onclick = function () {
            var sid = subjInput.value;
            //validate, if invalid, just return w/o calling next
            if (false === regID.test(sid)) {
                alert("Ungültiges ID. Ein ID soll z.B. so aussehen: 18ATH");
                return;
            }
            document.getElementById("interface").innerHTML = "";
            hayStack.output.registerSid(sid, hayStack.continuations.next);
        };
        subjInput.onkeyup = function (event) {
            if (13 === event.keyCode) btnNext.onclick();
        };
    }
);

//The second continuation collects the anagraphic information from the 
//participant.

//The next continuation fetches from the server the data of the test.
//When the data are fetched, continuations are added at the current point.
//This dynamic loading of trials/continuations allows for customizing
//the trials sent over by the server based on the id of the subect.
hayStack.continuations.push(function () {
    var xhr = new XMLHttpRequest();
    //try and identify server, on fail use sapfsy186
    var reg = /^http:\/(\/.*:\d+)/;
    var url = undefined;
    url = reg.exec(document.baseURI);
    var SERVER = "/safpsy186.psychiatrie3.uni-ulm.de:61543";
    url = (undefined === url) ? SERVER : url[0];
    url += ("/trials:" + hayStack.output.getSubjectID() + 
        ":" + hayStack.testRequest.join(","));
    xhr.addEventListener("load", function() {
        var tests = JSON.parse(xhr.responseText);
        //before calling next on the coroutine, push all trials
        //onto the continuation queue at current position
        for (var i = tests.length - 1; i >= 0; i--) {
            var test = tests[i];
            if (undefined === test.frame) {
                hayStack.view.msg("Invalid definition or script/server error in test " + test);
                return;
            }
            var frame = hayStack[test.frame]; 
            if (undefined === frame) {
                hayStack.view.msg(test.frame + 
                    " is not defined: forgot to include in main.html?");
                return;
            }
            //last continuation sends over data to server
            hayStack.continuations.insert(function () {
                hayStack.output.postTrials();
                hayStack.continuations.next();
            });
            //call the continuation factory on the frame to insert the trials
            hayStack.continuations.insert(frame.continuationFactory(test));
        }
        //this calls the continuation for the first trial.
        hayStack.continuations.next();
    });
    xhr.open("GET", url);
    xhr.send();
});

//this continuation loads the logoff page and collects data for credits
hayStack.continuations.push(function () {
    hayStack.view.setTemplate("logoffPage", "logoffPageStyle");
    var elem = document.getElementById("btnLogoff");
    if (undefined === elem) console.log("Invalid coding of logoff page");
    elem.onclick = function () {
        var lgfData = {};
        var txt = document.getElementById("firstName");
        lgfData.firstName = txt.value;
        txt = document.getElementById("secondName");
        lgfData.secondName = txt.value;
        txt = document.getElementById("matriculationNo");
        lgfData.matriculationNo = txt.value;
        txt = document.getElementById("logonId");
        lgfData.logonId = txt.value;
        //check if there are any data before pushing on stack
        if (Object.values(lgfData).join("").length > 0) {
            var trial = hayStack.output.emptyTrial();
            trial.testID = "LOGOFF";
            trial.responseData = JSON.stringify(lgfData);
            trial.timestamp = hayStack.output.datestamp();
            hayStack.output.pushTrial(trial);
        }
        hayStack.continuations.next();
    };
});

// this final continuation cleans up the interface.
hayStack.continuations.push(function () {
    hayStack.view.msg("Danke! Sie sind am Ende der Testung angekommen.");
    hayStack.view.setStyle("defaultStyle");
    hayStack.output.postTrials();
    hayStack.continuations.next();
});

/*  The co.routine is kicked off after all custom modules have loaded.
    The script line that does this is at the end of the html file:
    hayStack.coRoutine.next();
*/