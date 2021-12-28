module.exports = {
	
    /* Put here a list of tests that can be requested from the server. The property
    'frame' determined the html elements on the screen, which is stored
    in a separate object with dedicted code. This property is inherited from all 
    trials objects, but any trial instance can override it. The properties 'timout',
    'timeRefractory', and 'randomOrder' should be specified to avoid default values.

    Each trial object must contain a unique 'itemID' field, a 'type' descriptor (to
    be used in the statistical analysis), a 'data' field with the content of the 
    question or trial, a 'polarity' field with values 1, -1 , or 0, and any
    other custom fields. Fields that have the same value in all trials may be
    specified at the test level.

    The required test or tests may be specified in the browser, e.g.
    http://safpsy186:61543/test:SSTDepr
    Separate multiple tests with a comma.
    */

    /* This is an SST test with two frames. The continuation factory must create continuations
        that understand the frames they have. */
	SSTDepr : {			
        frame: "SST",
		description: "SST socphob and depressed",	
        version: "1.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,  //randomize order of presentation (defaults to false if missing)
        skipOutput: false,  //record response to server (defaults to false if missing)

		trials: [
            //instruction
            { frame: "infopage", randomOrder: false, itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Mach den Satz im Kopf. Click auf das Wort, das am Ende kommt<br>Zuerst kommt eine kurze Übung.", "start"]},
            //practice trials. Override timeout and remove it. Override skipOutput.
            { randomOrder: false, skipOutput: true, itemID: "Pr01", type: "AP", timeout: 0,
                data: ["practice", "practice", "glücklich", "practice", "practice", "practice"], polarity: -1, pos: 3, neg: 5 },
            { randomOrder: false, skipOutput: true, itemID: "Pr02", type: "AP", timeout: 0,
                data: ["practice", "practice", "practice", "practice", "müde", "practice"], polarity: -1, pos: 3, neg: 5 },
            { frame: "infopage", randomOrder: false, itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die Übung ist jetzt zu Ende.<br>Clicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
            //actual test
			{ itemID: "O2p13", type: "AP", data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
			{ itemID: "O2p7", type: "OP", data: ["verfehlen", "werde", "meine", "Ziele", "ich", "erreichen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p8", type: "OP", data: ["versagen", "werde", "mal", "ich", "wieder", "bestehen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p9", type: "OI", data: ["düster", "wird", "Zukunft", "eher", "rosig", "die"], polarity: 1, pos: 5, neg: 1 }
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
			{ itemID: "O2p7", type: "OP", data: ["verfehlen", "werde", "meine", "Ziele", "ich", "erreichen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p8", type: "OP", data: ["versagen", "werde", "mal", "ich", "wieder", "bestehen"], polarity: 1, pos: 6, neg: 1 },
			{ itemID: "O2p9", type: "OI", data: ["düster", "wird", "Zukunft", "eher", "rosig", "die"], polarity: 1, pos: 5, neg: 1 }
		]	
    },
    
    
    Beck : {
        frame: "mchoice",
        description: "Beck's depression scale",
        version: "1.0",
        timeout: 15000, 
        timeRefractory: 3000,
        randomOrder: true,

        //common properties of all trials
        type: "BD",
        polarity: 1,
        trials: [
            { itemID: "BD01", data: ["I felt low for most of last week", "very true", "somewhat true", "somewhat false", "false"]},
            { itemID: "BD02", data: ["I have lost all appetite", "very true", "somewhat true", "somewhat false", "false"]},
            { itemID: "BD03", data: ["I have a big burden to carry", "very true", "somewhat true", "somewhat false", "false"]}
        ]
    },

    GHQ: {
        frame: "likert",
        description: "General Health Questionaire",
        version: "1.0",
        timeout: 20000,
        timeRefractory: 2500,
        randomOrder: false,

        //common property of all trials
        type: "GHQ",
        trials: [
            { itemID: "GHQ01", data: ["I normally fall asleep soon", "strongly agree", "strongly disagree"], polarity: 1 },
            { itemID: "GHQ01", data: ["I like my job", "strongly agree", "strongly disagree"], polarity: -1 }
        ]
    }
};
