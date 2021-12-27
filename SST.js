/* SST module for the haystack system */

if (undefined === window.hayStack) window.hayStack = {}; 

//The sst frame object
window.hayStack.SST = {};

//the view object--------------------------------------------------------------------------
window.hayStack.SST.view = {

// Interface with the HTML layout
    setData : function (data) {
        //data is a field of trialobject. displays scrambled words.
        btns = document.getElementsByClassName("btn");
        var maxLen = 0;
        for (var i = 0; i < btns.length; ++i) {
            if (data[i].length > maxLen) maxLen = data[i].length;
        }
        var fontSize;
        if (maxLen > 12) fontSize = 2.2632 + -0.0395 * maxLen;
        else fontSize = 2;
        //console.log("Max len word: " + maxLen + "; font size: " + fontSize);
        for (var i = 0; i < btns.length; ++i) {
            if (data[i] == "Gutenachtgeschichte") btns[i].style.fontSize = "1.42vw";
            else btns[i].style.fontSize = fontSize + "vw";
            btns[i].innerHTML = data[i];
        }
    }, 

    setHandlers : function (createHandler, trial) {
        btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].onmousedown = createHandler(i, trial);
        }
    },

    resetHandlers : function () {
        btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].onmousedown = function () { };
        }
    },

    msg : function (message) {
        var pp = document.getElementById("lblNext");
        pp.innerHTML = message;
    },

    setInput : function (boolFlag, text) {
        btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].style.visibility = boolFlag ? "hidden" : "visible";
        }
        var lbl = document.getElementById("lblInput");
        lbl.style.visibility = boolFlag ? "visible" : "hidden";
        lbl.innerHTML = boolFlag ? text : "Bitte tragen Sie Ihre Identifikationskode hier ein:";
        var txt = document.getElementById("subjId");
        txt.style.visibility = boolFlag ? "visible" : "hidden";
        if (boolFlag) txt.value = ""; 
        var btnNext = document.getElementById("btnNext");  //btnRecordID
        btnNext.style.visibility = boolFlag ? "visible" : "hidden";
        return btnNext;
    }

};

hayStack.SST.computeResponse = function(resp, trial, rt) {
    //response encoding. Needs streamlining/revision.
    if (rt <= 0) return "MISS";
    //if (/\d+:\d+-\d+:\d+/.test(resp)) return "MOUSE";
    switch (trial.type) {
        case 'N':   //neutral trials
            if ("number" === typeof (resp))
                return (resp == trial.pos || resp == trial.neg) ? "NEU" : "ERROR";
            else return "NEU";
            break;
        case "T":   //sentinel trials (for keyboard -- not supported at present)
            if (max(trial.pos, trial.neg) < 4)  //left response
                return resp === "N" ? "CORRECT" : "ERROR";
            else
                return resp === "M" ? "CORRECT" : "ERROR";
            break;
        default:
            if ("number" === typeof (resp)) {
                if (resp == trial.pos) return "POS"
                if (resp == trial.neg) return "NEG";
                return "ERROR";
            } else if (resp == "N")
                return trial.pos < trial.neg ? "POS" : "NEG";
            else if (resp == "M")
                return trial.pos > trial.neg ? "POS" : "NEG";
            else return resp;
            break;
    }
};

hayStack.SST.timestamp = function(timedata) {
    if (undefined === timedata) timedata = new Date(Date.now());
    else timedata = new Date(timedata);
    return timedata.getHours() + ':' + timedata.getMinutes() + ':' + timedata.getSeconds();
}

hayStack.SST.pushTrial = function(item, resp, rt) {
    var cf = function(data, deflt) { return (undefined === data) ? deflt : data; };

    trial = hayStack.output.emptyTrial();
    trial.testID = item.testID 
    trial.itemID = item.itemID;
    trial.type = item.type;
    trial.polarity = item.polarity;
    trial.response = hayStack.SST.computeResponse(resp, item, rt);
    trial.RT = rt;
    trial.respKey = resp; 
    trial.responseData = "pos:"  + item.pos + ",neg:" + item.neg;
    trial.trialData = item.data;
    trial.version = cf(item.version, "");
    trial.timestamp = item.timestamp
    trial.source = cf(item.source, "");

    hayStack.output.pushTrial(trial);
};

//given a test from the script, create an array of continuations.
hayStack.SST.continuationFactory = function(test) {

    var conts = [];
    var view = hayStack.SST.view;
    var coRoutine = hayStack.continuations;
    var output = {push : hayStack.SST.pushTrial };

    //definition of handlers here, to be available in the definition of the co-routine.
    //the handlers define an unfold acting on the output object as an accumulator
    var trialStart = undefined;
    var hTimeout = undefined;
    var onTimeoutFactory = function (trialobj) {
        return function () {
            //in case both a timeout and an onclick were in the queue, 
            //we only process the first
            if (hTimeout === undefined) return;
            hTimeout = undefined;
            trialobj.timestamp = hayStack.SST.timestamp(trialStart);
            output.push(trialobj, 0, 0);
            coRoutine.next();
        }
    };
    var onClickFactory = function (numelem, trialobj) {
        return function (event) {
            var rt = Date.now() - trialStart;
            trialobj.timestamp = hayStack.SST.timestamp(trialStart);
            if (rt < test.timeRefractory) return;
            //in case both a timeout and an onclick were in the queue, 
            //we only process the first
            if (hTimeout === undefined) return;
            clearTimeout(hTimeout);
            hTimeout = undefined;
            //record response
            output.push(trialobj, numelem + 1, rt);
            coRoutine.next();
        }
    };
    // The following is a function generator to get the right closure in the for loop below
    var loopContinuationFactory = function (trialobj) {
        return function () {
            view.resetHandlers();
            view.setData(trialobj.data);
            trialStart = Date.now();
            hTimeout = setTimeout(onTimeoutFactory(trialobj), trialobj.timeout);
            view.setHandlers(onClickFactory, trialobj);
        }
    }; 
    // The following is a function generator for simple displays without response
    var simpleContinuationFactory = function (msg, btnText, data) {
		return function () {
            var btnNext = document.getElementById("btnNext");
            var btntxt = btnNext.innerHTML;
            btnNext.onclick = function () {
                btnNext.style.visibility = "hidden";
                btnNext.innerHTML = btntxt;
				view.msg("");
                coRoutine.next();
            }
            if (undefined !== data) view.setData(data);
            view.msg(msg);
            btnNext.innerHTML = btnText;
            btnNext.style.visibility = "visible";
		}
    };
    
    //the first continuation sets the interface
    conts.push(function () {
        hayStack.view.setInterface("SST");
        hayStack.view.setStyle("SSTStyle");
        coRoutine.next();
    });
    /*
	//We now present the instruction for the test
    if (undefined !== SST.getInstruction())
		continuations.push(simpleContinuationFactory(SST.getInstruction(),
													 "weiter", SST.getInstructionExample()));
	// the practice sentences
	if (SST.isPracticeDefined()) {
		for (var i = 0; i < SST.getPracticeTrialCount(); ++i) {
			var trialobj = SST.getPracticeTrial(i);
			trialobj.trialID = 0;
			continuations.push(loopContinuationFactory(trialobj));
		}
		var txtStartMsg = "Die Übung ist jetzt zu Ende.<br>Clicken Sie auf 'start' und dann 'weiter' um mit dem Test anzufangen.";
		continuations.push(simpleContinuationFactory(txtStartMsg, "start",
													 ["*", "*", "*", "*", "*", "*"]));
		continuations.push(simpleContinuationFactory("", "weiter >>",
													 ["*", "*", "*", "*", "*", "*"]));
	} else {
		// we need this to start trials with a next button to record correct mouse position
		if (options.mouseMove) {
			var txtStartMsg = "Bevor Sie einen Satz bilden können, müssen sie auf 'weiter' clicken.<br>Clicken Sie auf 'start' und dann 'weiter' um mit dem Test anzufangen.";
			continuations.push(	simpleContinuationFactory(txtStartMsg, "start", ["*", "*", "*", "*", "*", "*"]));
			continuations.push(	simpleContinuationFactory("", "weiter >>", ["*", "*", "*", "*", "*", "*"]));
		}
	} */
    // the trials
    for (var i = 0; i < test.trials.length; ++i) {
        var trialobj = test.trials[i]
        trialobj.trialID = i + 1;
        conts.push(loopContinuationFactory(trialobj));
    }
    //last continuation sends over data to server
    conts.push(function () {
        hayStack.output.postTrials();
        coRoutine.next();
    });
    return conts;
}
