/*
stefanie bernardin, innsbruck, 2020-01
complementing javascript  for ultimatum_game.html 
containing bare necessities for running the ultimatum game

part 1, general functions, stores  general articulated
functions used by the program specific functions below

part 2, stores every variable used and associated descriptions

part 3, game, stores game-specific functions and onclick-events
*/

/* mchoice module for HayStack */

if (undefined === window.hayStack) window.hayStack = {}; 

//the ultimatum frame object
hayStack.ultimatum = {};

// ++++++++++++++++++++++++++++++++++++++++++++++++++
// VIEW OBJECT
// ++++++++++++++++++++++++++++++++++++++++++++++++++

hayStack.ultimatum.view = {
    show_screen : function(screen) {
        // displays a certain screen
        screen.style.display="block";
    },

    hide_screen : function(screen) {
        // hides a certain screen
        screen.style.display="none";
    },

    //utility function
    rand_int : function(min, max) {
        // returns a random number between (including) the 
        // parameters min and max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++
// CONTROLLER
// ++++++++++++++++++++++++++++++++++++++++++++++++++
hayStack.ultimatum.state = {
    // round-management: store here how many rounds the user completes
    // in total and write the value instantly into the html document
    // count the rounds in "current_round"
    total_rounds : 60,
    current_round : 0,

    // budget-management: store here the max budget, player 2 is able to
    // distribute among the players. have here variables for the offer and 
    // total budget for player 1 and player 2, initalized every refresh 
    // with zero
    max_budget : 20,
    v_offer_playerone : 0,
    v_offer_playertwo : 0,
    v_budget_playerone : 0,
    v_budget_playertwo : 0,

    // this array stores the responses, i.e. if the user accepted or
    // rejected the offer given by player 2
    responses : [],
    data : { itemID: "ultRound1", type: "goodOffer", data : [12, 8]}
};

hayStack.ultimatum.intializeGame = function() {
    var state = hayStack.ultimatum.state;
    state.total_rounds = 60;
    state.current_round = 0;
    document.getElementById("rounds_total").innerHTML = state.total_rounds;
    hayStack.ultimatum.intertrial();
};

hayStack.ultimatum.intertrial = function() {
    /*
    screen-management: just show the intertrial-screen, which is blank.
    as this is the starting point for every new round, increment counter
    for rounds and refresh the value in the html file. 
    after a random time between 2 and 4 sec, start the "real" game.
    */

    var view = hayStack.ultimatum.view;
    var state = hayStack.ultimatum.state;

    view.show_screen(intertrial_screen);
    view.hide_screen(partner_screen);
    view.hide_screen(offer_screen);

    state.current_round += 1;
    document.getElementById("round_no").innerHTML = state.current_round;

    setTimeout(hayStack.ultimatum.start_game, view.rand_int(2000, 4000));
};

hayStack.ultimatum.get_new_offer = function(data) {
    /*
    for now, the offer for player 1 is computed randomly as a number between 
    zero and the above defined maximum to distribute.
    player 2 simply gets offered what is left between the maximum to distribute
    and what is already offered to player 1.
    finally, both values get written to the html file.
    */
    var view = hayStack.ultimatum.view;
    var state = hayStack.ultimatum.state;

    state.v_offer_playerone = view.rand_int(0, 20); //TODO: real algorithm
    state.v_offer_playertwo = state.max_budget - state.v_offer_playerone;

    document.getElementById("offer_playerone").innerHTML = state.v_offer_playerone;
    document.getElementById("offer_playertwo").innerHTML = state.v_offer_playertwo;
};

hayStack.ultimatum.start_game = function() {
    /*
    screen-management: show partner-screen, the others vanish mysteriously.
    as the screen says "player 2 is thinking about the offer", the computer
    computes a new offer for the players. 
    it will be displayed after 4 sec and after another 4 sec the user will see
    buttons to decide, wheter to accept or reject the offer
    */

    var view = hayStack.ultimatum.view;
    var ctl = hayStack.ultimatum;

    view.hide_screen(intertrial_screen);
    view.show_screen(partner_screen);
    view.hide_screen(offer_screen);

    //to be replaced interactively
    ctl.get_new_offer(ctl.state.data);
    setTimeout(ctl.proposal, 4000);
    setTimeout(ctl.response, 8000);
};

hayStack.ultimatum.proposal = function() {
    /*
    with the first use of this function, the display will not show anymore that "it found a new partner"
    screen-management: show only the offer screen, but without the possiblity to answer the 
    offer yet.
    */

    document.getElementById("new_partner").innerHTML = "Spieler 2 überlegt sich ein Angebot.";

    var view = hayStack.ultimatum.view;
    view.hide_screen(partner_screen);
    view.show_screen(offer_screen);
    document.getElementById("buttons_ar").style.visibility = "hidden";
};

hayStack.ultimatum.response = function() {
    /*
    show the possiblity to answer the offer by player 2
    */ 
    document.getElementById("buttons_ar").style.visibility = "visible";

    var state = hayStack.ultimatum.state;
    document.getElementById("accept").onclick = function() {
        /*
        if user accepts the offer, write to the responses-array "accept"
        and add the offers to the respective budgets
        refresh the current budget in the html file.
        start new round with intertrial
        */
    
        //TO DO: to replace with call to frame
        state.responses.push("accept");
    
        state.v_budget_playerone += state.v_offer_playerone;
        state.v_budget_playertwo += state.v_offer_playertwo;
        document.getElementById("budget_playerone").innerHTML = state.v_budget_playerone;
        document.getElementById("budget_playertwo").innerHTML = state.v_budget_playertwo;
    };
    
    document.getElementById("reject").onclick = function() {
        /*
        if user rejects the offer, write to the responses-array "reject"
        start new round with intertrial
        */
    
        state.responses.push("reject");
    };
};

/*

function test() {
    // escape function for testing
    show_screen(intertrial_screen);
    hide_screen(partner_screen);
    hide_screen(offer_screen);
    if (confirm("current rounds = " + current_round + "\nanother round?") == 1) {
        intertrial();
    } else {
        alert("ok bye")
        console.log(responses);
    }
} */
