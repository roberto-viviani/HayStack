/* mchoice module for HayStack */

if (undefined === window.hayStack) window.hayStack = {}; 

//the mchoice frame object
hayStack.mchoice = {};

//the view object--------------------------------------------------------------------------
hayStack.mchoice.view = {

    // Interface with the HTML layout
    setData : function (data) {
        //data is a field of trialobject. displays scrambled words.
        var question = document.getElementById("question");
        question.innerHTML = data[0];
        var coll = document.getElementsByClassName("responseMchoice");
        var kks = Object.keys(coll);
        for (var i = 1; i < data.length; ++i) {
            var elem = coll[kks[i-1]];
            elem.innerHTML = data[i];
            elem.style.visibility = "visible";
        }
        for (var j = data.length; j < kks.length + 1; ++j) {
            var elem = coll[kks[j-1]];
            elem.innerHTML = "";
            elem.style.visibility = "hidden";
        }
    }, 

    setHandlers : function (createHandler, trial) {
        btns = document.getElementsByClassName("responseMchoice");
        for (var i = 0; i < btns.length; ++i) {
            //in the data array, the first element is the question.
            btns[i].onclick = createHandler(i, trial);
        }
    },

    resetHandlers : function () {
        btns = document.getElementsByClassName("responseMchoice");
        for (var i = 0; i < btns.length; ++i) {
            btns[i].onclick = function () { };
        }
    }
};
    
hayStack.mchoice.computeResponse = function(resp, trial, rt) {
    //response encoding.
    if (rt <= 0) return "NA";  //miss trial
    var baselineScore = (undefined === trial.baselineScore) ? 0 : trial.baselineScore;
    var score = resp - 1;  //resp is 1-based, we want a zero-based score
    if (-1 === trial.polarity)
        //trial.data.length is number of responses + question
        score = trial.data.length - resp - 1;
    return score + baselineScore;
};

hayStack.mchoice.pushTrial = function(item, resp, rt) {
    var cf = function(data, deflt) { return (undefined === data) ? deflt : data; };

    trial = hayStack.output.emptyTrial();
    trial.testID = item.testID 
    trial.itemID = item.itemID;
    trial.type = item.type;
    trial.polarity = item.polarity;
    //increment zero-based response to signal choice of nth response
    trial.response = hayStack.mchoice.computeResponse(resp+1, item, rt);
    trial.RT = rt;
    trial.respKey = resp; 
    //first element in data is question
    trial.responseData = item.data[resp+1];
    trial.trialData = item.data;
    trial.version = cf(item.version, "");
    trial.timestamp = item.timestamp
    trial.source = cf(item.source, "");

    hayStack.output.pushTrial(trial);
};
    
hayStack.mchoice.continuationFactory = function(test) {

    var conts = [];
    var view = hayStack.mchoice.view;
    var coRoutine = hayStack.continuations;
    var pushMCTrial = function(item, resp, rt) {
        hayStack.mchoice.pushTrial(item, resp, rt);
    }

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
            trialobj.timestamp = hayStack.output.timestamp(trialStart);
            view.resetHandlers();
            pushMCTrial(trialobj, 0, 0);
            //coRoutine.next(); create a small pause to alert to change
            hayStack.view.msg("");
            setTimeout(coRoutine.next, 600);
        };
    };
    var onClickFactory = function (numelem, trialobj) {
        return function (event) {
            var rt = Date.now() - trialStart;
            if (rt < test.timeRefractory) return;
            clearTimeout(hTimeout);
            hTimeout = undefined;
            view.resetHandlers();
            trialobj.timestamp = hayStack.output.timestamp(trialStart);
            //record response
            if (false === trialobj.skipOutput)
                pushMCTrial(trialobj, numelem, rt);
            //coRoutine.next(); //generate instead interval of 300msec
            hayStack.view.msg("");
            setTimeout(coRoutine.next, 300);
        };
    };
    // The following is a function generator to get the right closure in the for loop below
    var loopContinuationFactory = function (trialobj) {
        return function() {
            hayStack.view.setTemplate("mchoice", "mchoiceStyle");
            view.setData(trialobj.data);
            trialStart = Date.now();
            if (trialobj.timeout > 0)
                hTimeout = setTimeout(onTimeoutFactory(trialobj), trialobj.timeout);
            view.setHandlers(onClickFactory, trialobj);
        };
    }; 
        
    // the trials
    for (var i = 0; i < test.trials.length; ++i) {
        var trialobj = test.trials[i];
        //we have trials of two frames, so you need the right 
        //continuation factory. loop factories take one trial,
        //the other factories a test.
        if ("mchoice" === trialobj.frame) {
                trialobj.trialID = i + 1;
                conts.push(loopContinuationFactory(trialobj));
        }
        else if ("infopage" === trialobj.frame) {
            //ask simpleFactory of infopage to provide continuation
            conts.push(hayStack.infopage.simpleContinuationFactory(trialobj));
        }
        else {
            conts.clear();
            hayStack.view.msg("Invalid frame in test " + trialobj.testID + 
                ", trial " + trialobj.itemID + ": " + trialobj.frame);
            return [];
        }
    }
    return conts;
}; //continuation factory
    
//for export and mixing in other tests
hayStack.mchoice.simpleContinuationFactory = function (trial) {
    conts = hayStack.mchoice.continuationFactory({trials : [trial]});
    return conts[0];
};
    