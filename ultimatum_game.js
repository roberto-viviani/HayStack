/*
stefanie bernardin, innsbruck, 2020-01
complementing script for running the ultimatum game
*/

if (undefined === window.hayStack) window.hayStack = {}; 

// the ultimatum frame object
hayStack.ultimatum = {};

// view object
hayStack.ultimatum.view = {

    // show a html-defined "screen"
    show_screen : function(screen) {
        screen.style.display="block";
    },

    // hide a html-defined "screen"
    hide_screen : function(screen) {
        screen.style.display="none";
    },

    // utility function
    rand_int : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};



// controller
hayStack.ultimatum.state = {
    total_rounds : 60, //TODO
    current_round : 0,

    max_budget : 20,
    v_offer_playerone : 0,
    v_offer_playertwo : 0,
    v_budget_playerone : 0,
    v_budget_playertwo : 0,

    responses : [],
    data : { itemID: "ultRound1", type: "goodOffer", data : [12, 8]}, //TODO: delete?

    clickedTime : new Date(),
    startTime : new Date(),
    reactionTime : new Date(),
};


// function for top and bottom bar information
hayStack.ultimatum.handle_information = function() {
    var state = hayStack.ultimatum.state;

    // increment round
    state.current_round += 1;

    // display correct budget
    document.getElementById("budget_playerone").innerHTML = state.v_budget_playerone;
    
    // display correct round information
    document.getElementById("rounds_total").innerHTML = state.total_rounds;
    document.getElementById("round_no").innerHTML = state.current_round;
}



hayStack.ultimatum.start_trial = function(trial) {
    var view = hayStack.ultimatum.view;
    var ctl = hayStack.ultimatum;
    var state = hayStack.ultimatum.state;
    var data = trial.data;

    // show correct screen: partner screen
    view.hide_screen(intertrial_screen);
    view.show_screen(partner_screen);
    view.hide_screen(offer_screen);

    // set top and bottom bar to correct information on round and budget
    ctl.handle_information();

    // set offers
    state.v_offer_playerone = data[0];
    state.v_offer_playertwo = state.max_budget - data[0];
    document.getElementById("offer_playerone").innerHTML = state.v_offer_playerone;
    document.getElementById("offer_playertwo").innerHTML = state.v_offer_playertwo;

    // timeout for displaying proposal and respond-buttons
    setTimeout(ctl.proposal, 4000);
    setTimeout(ctl.response, 8000, trial);
};



hayStack.ultimatum.proposal = function() {
    var view = hayStack.ultimatum.view;

    // show correct screen: offer screen
    view.hide_screen(partner_screen);
    view.show_screen(offer_screen);

    // hide buttons for responding
    document.getElementById("buttons_ar").style.visibility = "hidden";
};



hayStack.ultimatum.response = function(trialsrc) {
    var state = hayStack.ultimatum.state;
    var output = hayStack.output;

    // show buttons for responding
    document.getElementById("buttons_ar").style.visibility = "visible";

    // set starttime for reaction time
    var startTime = new Date();

    var trial = output.emptyTrial();
    trial.testID = trialsrc.testID;
    trial.itemID = trialsrc.itemID;
    trial.type = trialsrc.type;
    trial.polarity = "";
    trial.response = [];
    //trial.respKey = resp; 
    trial.responseData = "blockID:"  + trialsrc.blockID + ",blockPos:" + trialsrc.blockPos;
    trial.trialData = trialsrc.data;
    trial.version = trialsrc.version;
    trial.timestamp = output.timestamp(startTime);
    trial.source = trialsrc.source;

    // if clicked "accept"
    document.getElementById("accept").onclick = function() {
        // compute reaction time
        trial.RT = new Date() - startTime;

        // save reaction
        trial.response = "accept";
        output.pushTrial(trial);

        // update budget of p1 and p2
        state.v_budget_playerone += state.v_offer_playerone;
        state.v_budget_playertwo += state.v_offer_playertwo;

        // goto intertrial
        hayStack.ultimatum.intertrial();
    };
    
    // if clicked "reject"
    document.getElementById("reject").onclick = function() {
        // compute reaction time
        trial.RT = new Date() - startTime;

        // save reaction
        trial.response = "reject";
        output.pushTrial(trial);

        // goto intertrial
        hayStack.ultimatum.intertrial();
    };
};



hayStack.ultimatum.intertrial = function() {
    // TODO: if intertrial after every trial there is no intertrial before first trial?
    var view = hayStack.ultimatum.view;
    var state = hayStack.ultimatum.state;

    // show correct screen: intertrial screen
    view.show_screen(intertrial_screen);
    view.hide_screen(partner_screen);
    view.hide_screen(offer_screen);

    // after intertrial continue with next trial
    setTimeout(hayStack.continuations.next, view.rand_int(2000, 4000));
};



//given a test from the script, create an array of continuations.
hayStack.ultimatum.continuationFactory = function(test) {

    var conts = [];

    //get the offers from test
    var trialType = '';
    var sessionID = hayStack.output.emptyTrial().sessionID; //del?
    var newRandInt = hayStack.ultimatum.view.rand_int(0,50);
    if (newRandInt % 2  === 0) {
        offers = test.options.xiang;
        trialType = "xiang";
    } else {
        offers = test.options.series;
        trialType = "series";
    }

    //override SST's output to record blockID and blockPos
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
        //custom response data
        trial.responseData = "blockID:"  + item.blockID + ",blockPos:" + item.blockPos;
        trial.trialData = item.data;
        if (undefined !== item.block) trial.trialData += (",block:" + item.block);
        trial.version = cf(item.version, "");
        trial.timestamp = item.timestamp
        trial.source = cf(item.source, "");
    
        hayStack.output.pushTrial(trial);
    };    

    // the trials
    var j=0;
    for (var i = 0; i < test.trials.length; ++i) {
        var trialobj = test.trials[i];
        //we have trials of two frames, so you need the right 
        //continuation factory. loop factories take one trial,
        //the other factories a test.
        if ("SST" === trialobj.frame) {
            trialobj.trialID = i + 1;
            conts.push(hayStack.SST.simpleContinuationFactory(trialobj));
        }
        else if ("infopage" === trialobj.frame) {
            //ask simpleFactory of infopage to provide continuation
            conts.push(hayStack.infopage.simpleContinuationFactory(trialobj));
        }
        else if ("ultimatum" === trialobj.frame) {
            //the continuations of ultimatum itself
            trialobj.trialID = i + 1;
            trialobj.data[0] = offers[j];
            j++;
            trialobj.type = trialType;
            conts.push(hayStack.ultimatum.simpleContinuationFactory(trialobj));
        } 
        else {
            conts.clear();
            hayStack.view.msg("Invalid frame in test " + trialobj.testID + 
                ", trial " + trialobj.itemID + ": " + trialobj.frame);
            return [];
        }
    }
    return conts;
};


//for export
hayStack.ultimatum.simpleContinuationFactory = function(trial) {
    return function() {
        hayStack.view.setTemplate("ultimatum", "ultimatumStyle");
        
        lib = hayStack.ultimatum;
        lib.start_trial(trial);
    }
}
