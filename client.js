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
    //cear interface and display message
    msg : function(txt) {
        elem = document.getElementById("interface");
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
        hayStack.view.setStyöe(styleName);
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
            trial.timestamp = hayStack.output.getTimestamp();
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
        emptyTrial : function() {
            trial = getEmptyTrial();
            trial.sessionID = sessionID;
            trial.subjectID = subjectID;
            trial.trialID = ++trialCounter;
            return trial;
        },
        getTimestamp : function(dat) {
            if (undefined === dat) dat = new Date(Date.now());
            return dat.toLocaleDateString() + ' ' + dat.getHours() + ':' + dat.getMinutes() + 
                ' ' + /GMT\+\d+/.exec(dat.toString())[0];
        },
        getSubjectID : function() {
            return subjectID;
        }
    };
})();

//the co-routine framework
hayStack.continuations = (function() {
    var continuations = [];
    var counter = -1;
    var coRoutine = {
        next : function () {
            counter = counter + 1;
            if (counter >= continuations.length) return;
            (continuations[counter])();
        },
        dump : function() { console.log(continuations); console.log("Current ptr: " + counter); },
        prepend : function (conts) {
            if (undefined === conts.length)
                continuations.splice(counter+1, 0, conts);
            else
                for (var i = conts.length - 1; i >= 0; i--)
                    continuations.splice(counter+1, 0, conts[i]);
        },
        append : function (conts) {
            continuations.push(conts);
        }
    };
    return coRoutine;
})();

/* This is where the main flow is specified by stacking the 
    continuations. This results is a mapping from the list of
    trials to the list of continuations to the list of results. */

//The first continuation collects the ID of the participant.
hayStack.continuations.append(
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
        btnNext.onclick = function () {
            var subjInput = document.getElementById("subjId");
            var sid = subjInput.value;
            //validate, if invalid, just return w/o calling next
            if (false === regID.test(sid)) {
                alert("Ungültiges ID. Ein ID soll z.B. so aussehen: 18ATH");
                return;
            }
            document.getElementById("interface").innerHTML = "";
            hayStack.output.registerSid(sid, hayStack.continuations.next);
        }
    }
);

//We now fetch from the server the data of the test.
hayStack.continuations.append(function () {
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
            var frame = hayStack[test.frame]; 
            if (undefined === frame) {
                hayStack.view.msg(test.frame + 
                    " is not defined: forgot to include in main.html?");
                return;
            }
            hayStack.continuations.prepend(frame.continuationFactory(test));
        }
        hayStack.continuations.next();
    });
    xhr.open("GET", url);
    xhr.send();
});

// the final continuation cleans up the interface and sends the data to server
hayStack.continuations.append(function () {
    hayStack.view.msg("Danke! Sie sind am Ende der Testung angekommen.");
    hayStack.view.setStyle("defaultStyle");
    hayStack.output.postTrials();
    hayStack.continuations.next();
});

/*  The co.routine is kicked off after all custom modules have loaded.
    The script line is at the end of the html file:
    hayStack.coRoutine.next();
*/