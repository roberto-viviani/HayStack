module.exports = {
	
    /* Put here the tests that can be requested from the server. The property
    'frame' determines the html elements on the screen. These elements are steered
    in a separate object with dedicated code. Each test will usually make use of one
    or more frames.
    
    Each test is defined by the fields of a JavaScript object. The field 'trials'
    contains an array defining individual items to be presented in the test, in turn
    defined as the fields of objects. Properties defined at test level can be
    overridden in individual items. For example, individual items may specify a
    frame that differs from that of the test to mix 

    Some properties must always be defined: 'frame' for tests, and for trials 
    a unique 'itemID' field and a 'data' field with the content of the question or 
    trial. Other fields if missing are set to default values: the 'polarity' field 
    with values 1, -1 , or 0 (defaults to 0), and 'skipOutput' (defaults to false). 
    Fields that have the same value in all trials may be specified at the test level. 
    Test or trials can have any additional property used to parametrize the test or 
    the frame display.

    A special property 'block' of trials allows to define blocks that are selected
    randomly. For this, include the property 'randomBlock' in the header of the test,
    specifying an array of the block numbers to be icluded in the test. For example,
    if there are three blocks to be randomly selected, set randomBlock = [1, 2, 3].
    You then specify a 'block' property in the trial set to the block number. Trials
    without 'block' property will be included irrespective of the selected block.

    The server listens at port 61543 and recognizes requests for tests when the 
    url starts with 'test:'. The required test or tests may be specified in the url 
    after this, e.g.
    http://safpsy186.psychiatrie3.uni-ulm.de:61543/test:SSTDepr
    Separate multiple tests with a comma. The tests are then given in order.
    */

    /* This is an SST test with two frames in the items. The continuation factory 
        must create continuations that understand the frames they have. */
	SSTDepr : {			
        frame: "SST",
		description: "SST socphob and depressed",	
        version: "1.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,   //randomize order of presentation (defaults to false if missing)
        randomBlock: [1, 2], //define blocks 1 and 2 to select at random
        skipOutput: false,   //record response to server (defaults to false if missing)

		trials: [
            //instruction
            { frame: "infopage", randomOrder: false, itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Bitte bilden Sie gedanklich aus den folgenden Wörtern<br>einen grammatikalisch " + 
                "korrekten Satz.<br>Klicken Sie dann auf das letzte Wort im Satz.<br><br>Zuerst kommt eine kurze Übung.<br>", "start"]},
            //practice trials. Override timeout and remove it. Override skipOutput.
            { randomOrder: false, skipOutput: true, itemID: "Pr01", type: "AP", timeout: 0,
                data: ["Kinder ", "die", "Sand", "im", "Schnee", "spielen"], polarity: -1, pos: 3, neg: 5 },
            { randomOrder: false, skipOutput: true, itemID: "Pr02", type: "AP", timeout: 0,
                data: ["ist", "Juni", "August", "mein", "Geburstag", "im"], polarity: -1, pos: 2, neg: 3 },
            { frame: "infopage", randomOrder: false, itemID: "instructtimeout", type: "info", timeout: 0,
                data: ["Man hat in dem Test 7.5 Sek. um zu antworten.<br>Ab jetzt auch in der Übung.", "weiter"]},
            { randomOrder: false, skipOutput: true, itemID: "Pr03", type: "AP",
                data: ["practice", "practice", "practice", "practice", "müde", "practice"], polarity: -1, pos: 3, neg: 5 },
            { frame: "infopage", randomOrder: false, itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die Übung ist jetzt zu Ende.<br>Clicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
            //actual test
			{ itemID: "O2p13", block: 1, type: "AP", data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
			{ itemID: "O2p7",  block: 1, type: "OP", data: ["verfehlen", "werde", "meine", "Ziele", "ich", "erreichen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p8",  block: 2, type: "OP", data: ["versagen", "werde", "mal", "ich", "wieder", "bestehen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p9",  block: 2, type: "OI", data: ["düster", "wird", "Zukunft", "eher", "rosig", "die"], polarity: 1, pos: 5, neg: 1 }
		]	
    },

    /* This is the same test, this time coded as four consecutive tests, each with its own
        unique frame. The infopage frame is a standard frame that provides its own continuation
        factory. The SST frame is only asked to handle SST trials. The hyperlink requires specifying
        all parts: localhost:61543/test:SSTInfopage,SSTPractice,SSTInfostart,SSTDeprTest*/
	SSTInfopage : {			
        frame: "infopage",
		description: "SST infopage explanation",	
        version: "1.0",	
        //no timeout, timeRefractory, etc. since the cont factory does not understand them

		trials: [
            //instruction
            { itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Mach den Satz im Kopf. Click auf das Wort, das am Ende kommt<br>Zuerst kommt eine kurze Übung.", "start"]},
		]	
    },
	SSTPractice : {			
        frame: "SST",
		description: "SST practice",	
        version: "1.0",	
        timeout: 0,
        timeRefractory: 400,
        randomOrder: false,  //randomize order of presentation (defaults to false if missing)
        skipOutput: true,   //record response to server (defaults to false if missing)

		trials: [
            //practice trials. Override timeout and remove it. Override skipOutput.
            { itemID: "Pr01", type: "AP",
                data: ["practice", "practice", "glücklich", "practice", "practice", "practice"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "Pr02", type: "AP",
                data: ["practice", "practice", "practice", "practice", "müde", "practice"], polarity: -1, pos: 3, neg: 5 },
		]	
    },
	SSTInfostart : {			
        frame: "infopage",
		description: "SST start notice",	
        version: "1.0",	

        trials: [
            //instruction
            { itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die Übung ist jetzt zu Ende.<br>Clicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
		]	
    }, 
	SSTDeprTest : {			
        frame: "SST",
		description: "SST socphob and depressed",	
        version: "1.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,  //randomize order of presentation (defaults to false if missing)
        skipOutput: false,  //record response to server (defaults to false if missing)

		trials: [
            //actual test
			{ itemID: "O2p13", type: "AP", data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { frame: "mchoice", itemID: "BD02", type: "BD", data: ["I have lost all appetite", "false", "somewhat false", "somewhat true", "true"], polarity: 1},
			{ itemID: "O2p7", type: "OP", data: ["verfehlen", "werde", "meine", "Ziele", "ich", "erreichen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p8", type: "OP", data: ["versagen", "werde", "mal", "ich", "wieder", "bestehen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p9", type: "OI", data: ["düster", "wird", "Zukunft", "eher", "rosig", "die"], polarity: 1, pos: 5, neg: 1 }
		]	
    },
    
    Ultimatum : {
        frame : "ultimatum",
        description : "ultimatum game, Stefanie Bernardin Jan 2022",
        timeout : 12000,
        version : "1.0",

        trials: [
            { frame : "infopage", itemID: "infoBeck", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Answer as best as you can", "start"]},
            { itemID: "ultRound1", type: "goodOffer", data : [12, 8]},
            { itemID: "ultRound2", type: "badOffer",  data : [2, 18]},
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "ultRound1", type: "ultimatum", data : [10, 10]},
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 }
        ]

    },

    /* These are not implemented yet but would look like this */
    Beck : {
        frame: "mchoice",
        description: "Beck's depression scale",
        version: "1.0",
        timeout: 5000, 
        timeRefractory: 1000,
        randomOrder: false,
        skipOutput: false,

        //common properties of all trials
        type: "BD",
        polarity: 1,
        trials: [
            { frame: "infopage", itemID: "infoBeck", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Answer as best as you can", "start"]},
            { itemID: "BD01", data: ["I felt low for most of last week", "false", "somewhat false", "somewhat true", "true"]},
            { itemID: "BD02", data: ["I have lost all appetite", "false", "somewhat false", "somewhat true", "true"]},
            { itemID: "BD03", data: ["I have a big burden to carry", "false", "somewhat false", "somewhat true", "true"]}
        ]
    },

    GHQ: {
        frame: "likert",
        description: "General Health Questionaire",
        version: "1.0",
        //timeout: 20000,
        //timeRefractory: 2500,
        randomOrder: true,
        skipOutput: false,

        //common property of all trials
        type: "GHQ",
        trials: [
            { itemID: "GHQ01", data: ["I normally fall asleep soon", "strongly agree", "strongly disagree"], polarity: 1 },
            { itemID: "GHQ01", data: ["I like my job", "strongly agree", "strongly disagree"], polarity: -1 }
        ]
    }
};
