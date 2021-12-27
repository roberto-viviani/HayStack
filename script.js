module.exports = {
	
    /* Put here a list of tests that can be requested from the server. The property
    'frame' determined the arragnement of elements on the screen, which is stored
    in a separate object with dedicted code. This property is inherited from all 
    trials objects, but any trial instance can override it. The properties 'timout',
    'timeRefractory', and 'randomOrder' should be specified to avoid default values.

    Each trial object must contain a unique 'itemID' field, a 'type' descriptor (to
    be used in the statistical analysis), a 'data' field with the content of the 
    question or trial, a 'polarity' field with values 1, -1 , or 0, and any
    other custom fields. Fields that have the same value in all trials may be
    specified at the test level.
    */
	SSTDepr : {			
        frame: "SST",
		description: "SST socphob and depressed",	
        version: "1.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,  //randomize order of presentation (defauls to false if missing)

		trials: [	
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
        randomOrder: false,

        //common properties of all trials
        type: "BD",
        polarity: 1,
        trials: [
            { itemID: "BD01", data: ["I felt low for most of last week", "very true", "somewhat true", "somewhat false", "false"]},
            { itemID: "BD02", data: ["I have los all appetite", "very true", "somewhat true", "somewhat false", "false"]}
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
