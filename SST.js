/* SST module for the haystack system */

if (undefined === window.hayStack) window.hayStack = {}; 

//The sst frame object
hayStack.SST = {};

//the view object--------------------------------------------------------------------------
hayStack.SST.view = {

// Interface with the HTML layout
    setData : function (data) {
        //data is a field of trialobject. displays scrambled words.
        var btns = document.getElementsByClassName("btn");
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
        var btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].onmousedown = createHandler(i, trial);
        }
    },

    resetHandlers : function () {
        var btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].onmousedown = function () { };
        }
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

hayStack.SST.pushTrial = function(item, resp, rt) {
    var cf = function(data, deflt) { return (undefined === data) ? deflt : data; };

    var trial = hayStack.output.emptyTrial();
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

//the simple continuation factory
hayStack.SST.simpleContinuationFactory = function(trialobj) {
    var view = hayStack.SST.view;
    var coRoutine = hayStack.continuations;
    var output = {
        push : hayStack.SST.pushTrial, 
        timestamp : hayStack.output.timestamp
    };

    //definition of handlers here, to be available in the definition of the co-routine.
    //the handlers define an unfold acting on the output object as an accumulator
    var trialStart = undefined;
    var hTimeout = undefined;
    var timeoutCallback = function() {
            //in case both a timeout and an onclick were in the queue, 
            //we only process the first
            if (hTimeout === undefined) return;
            hTimeout = undefined;
            trialobj.timestamp = output.timestamp(trialStart);
            output.push(trialobj, 0, 0);
            //coRoutine.next(); create a small pause to alert to change
            hayStack.view.msg("");
            setTimeout(coRoutine.next, 600);
    };

    //a factory to get he click handler, as the view uses this function to set
    //the handlers to all word elements by numelem
    var onClickFactory = function (numelem, trialobj) {
        return function (event) {
            var rt = Date.now() - trialStart;
            trialobj.timestamp = output.timestamp(trialStart);
            if (rt < trialobj.timeRefractory) return;
            clearTimeout(hTimeout);
            hTimeout = undefined;
            //record response
            if (false === trialobj.skipOutput)
                output.push(trialobj, numelem + 1, rt);
            //coRoutine.next(); //generate instead interval of 300msec
            hayStack.view.msg("");
            setTimeout(coRoutine.next, 300);
        }
    };
    // The continuation
    return function () {
        hayStack.view.setTemplate("SST", "SSTStyle");
        view.resetHandlers();
        view.setData(trialobj.data);
        trialStart = Date.now();
        if (trialobj.timeout > 0)
            //hTimeout = setTimeout(onTimeoutFactory(trialobj), trialobj.timeout);
            hTimeout = setTimeout(timeoutCallback, trialobj.timeout);
        view.setHandlers(onClickFactory, trialobj);
    };
}
