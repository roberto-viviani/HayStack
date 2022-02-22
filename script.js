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
        timeout : 0,  //no timeout
        version : "1.0",

        //the offers
        options : {
            xiang : [12, 12, 2],
            series : [12, 2, 10]
        },

        data : [],
        trials: [
            { frame : "infopage", itemID: "infoUltimatum", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Erkärtext zum Ultimatumgame", "Start"]},
            { itemID: "ultRound1", type: "goodOffer"},
            { itemID: "ultRound2", type: "badOffer"},
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "ultRound3", type: "midOffer"},
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

    /////////////////////REAL SCRIPTS////////////////////////////////////////////////////
    GHQ: {
        frame: "mchoice",
        description: "General Health Questionaire, version 12 items",
        version: "1.0",
        timeout: 0,
        timeRefractory: 300,
        randomOrder: false,
        skipOutput: false,

        //common property of all trials
        type: "GHQ",
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoGHQ", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Der Fragebogen soll erfassen, ob Sie in den vergangenen Wochen irgendwelche Krankheitsbeschwerden " + 
                    "hatten bzw. wie es ganz allgemein um Ihre Gesundheit in den letzten Wochen bestellt war. Bitte " + 
                    "beantworten Sie alle Fragen, indem Sie die zutreffende Antwort auswählen. Bitte denken Sie daran, " + 
                    "dass es um jetzige oder kürzliche Beschwerden geht und nicht um Ihre früheren. Es ist wichtig, dass " + 
                    "Sie alle Fragen beantworten.", "start"]},
            { itemID: "GHQ01", data: ["Haben Sie in den letzten Wochen wegen Sorgen weniger geschlafen?", "nein, gar nicht", "nicht schlechter als üblich", "schlechter als üblich", "viel schlechter als üblich"]},
            { itemID: "GHQ02", data: ["Haben Sie das Gefühl gehabt, dauernd unter Druck zu stehen?", "nein, gar nicht", "nicht mehr als üblich", "mehr als üblich", "viel mehr als üblich"]},
            { itemID: "GHQ03", data: ["Haben Sie sich in den letzten Wochen auf das, was Sie gemacht haben konzentrieren können?", "besser als üblich", "so wie üblich", "schlechter als üblich", "viel schlechter als üblich"]},
            { itemID: "GHQ04", data: ["Haben Sie in den letzten Wochen das Gefühl gehabt, für etwas nützlich zu sein?", "mehr als üblich", "so wie üblich", "weniger als üblich", "viel weniger als üblich"]},
            { itemID: "GHQ05", data: ["Haben Sie in den letzten Wochen das Gefühl gehabt, sich mit Ihren Problemen auseinander zu setzen?", "besser als üblich", "so wie üblich", "weniger als üblich", "viel weniger als üblich"]},
            { itemID: "GHQ06", data: ["Ist es Ihnen in den letzten Wochen schwer gefallen, Entscheidungen zu treffen?","nein, gar nicht", "so wie als üblich", "schwerer als üblich", "viel schwerer als üblich"]},
            { itemID: "GHQ07", data: ["Haben Sie in den letzten Wochen den Eindruck gehabt, dass Sie mit Ihren Schwierigkeiten nicht zu Rande gekommen sind?", "nein, gar nicht", "nicht schlechter als üblich", "schlechter als üblich", "viel schlechter als üblich"]},
            { itemID: "GHQ08", data: ["Alles in allem, haben Sie sich in den letzten Wochen einigermaßen zufrieden gefühlt?", "mehr als üblich", "so wie üblich", "weniger als üblich", "viel weniger als üblich"]},
            { itemID: "GHQ09", data: ["Konnten Sie in den letzten Wochen Ihren Alltagsverpflichtungen mit Freude nachgehen?", "mehr als üblich", "so wie üblich", "weniger als üblich", "viel weniger als üblich"]},
            { itemID: "GHQ10", data: ["Haben Sie sich in den letzten Wochen unglücklich und deprimiert gefühlt?", "nein, gar nicht", "nicht mehr als üblich", "mehr als üblich", "viel mehr als üblich"]},
            { itemID: "GHQ11", data: ["Haben Sie in den letzten Wochen einen Mangel an Selbstvertrauen gespürt?", "nein, gar nicht", "nicht mehr als üblich", "mehr als üblich", "viel mehr als üblich"]},
            { itemID: "GHQ12", data: ["Haben Sie sich in den letzten Wochen wertlos gefühlt?","nein, gar nicht", "nicht mehr als üblich", "mehr als üblich", "viel mehr als üblich"]}
        ]
    },

    ADS : {
        frame: "mchoice",//bleibt
        description: "Allgemeine Depressionsskala",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 0,

        //common properties of all trials
        type: "ADS",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoADS", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Im Folgenden geht es um Ihre Stimmung während der letzten Wochen. " + 
                "Bitte kreuzen Sie bei allen folgenden Aussagen jeweils die Antwort an, " + 
                "die Ihrem Befinden während der letzen Wochen am besten entspricht/entsprochen " + 
                "hat. Die möglichen Antworten sind hierbei:<br><br>0 selten oder überhaupt nicht " + 
                "(weniger als 1 Tag)<br>1 manchmal (1 bis 2 Tage lang)<br>2 öfters (3 bis 4 Tage " + 
                "lang)<br>3 meistens, die ganze Zeit (5 bis 7 Tage lang)", "start"]}, //anpassen Instruktionen
            { itemID: "ADS01", data: ["Während der letzten Wochen...<br><br>...haben mich Dinge beunruhigt die mir sonst nichts ausmachen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS02", data: ["Während der letzten Wochen...<br><br>...hatte ich kaum Appetiet", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS03", data: ["Während der letzten Wochen...<br><br>...konnte ich meine trübsinnige Laune nicht loswerden, obwohl meine Freunde oder Familie versuchten, mich aufzumuntern", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS04", data: ["Während der letzten Wochen...<br><br>...kam ich mir genauso gut vor wie andere", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS05", data: ["Während der letzten Wochen...<br><br>...hatte ich Mühe, mich zu konzentrieren", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS06", data: ["Während der letzten Wochen...<br><br>...war ich deprimiert/ niedergeschlagen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS07", data: ["Während der letzten Wochen...<br><br>...war alles anstrengend für mich", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS08", data: ["Während der letzten Wochen...<br><br>...dachte ich voller Hoffnung an die Zukunft", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS09", data: ["Während der letzten Wochen...<br><br>...dachte ich, mein Leben ist ein einziger Fehlschlag", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS10", data: ["Während der letzten Wochen...<br><br>...hatte ich Angst", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS11", data: ["Während der letzten Wochen...<br><br>...habe ich schlecht geschlafen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS12", data: ["Während der letzten Wochen...<br><br>...war ich fröhlich gestimmt", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS13", data: ["Während der letzten Wochen...<br><br>...habe ich weniger als sonst geredet", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS14", data: ["Während der letzten Wochen...<br><br>...fühlte ich mich einsam", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS15", data: ["Während der letzten Wochen...<br><br>...waren die Leute unfreundlich zu mir", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS16", data: ["Während der letzten Wochen...<br><br>...habe ich das Leben genossen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS17", data: ["Während der letzten Wochen...<br><br>...musste ich weinen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS18", data: ["Während der letzten Wochen...<br><br>...war ich traurig", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS19", data: ["Während der letzten Wochen...<br><br>...hatte ich das Gefühl, dass mich die Leute nicht leiden können", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS20", data: ["Während der letzten Wochen...<br><br>...konnte ich mich zu nichts aufraffen", "selten", "manchmal", "öfters", "meistens"]}
        ]
    },

    PTED : {
        frame: "mchoice",//bleibt
        description: "Posttraumatische Verbitterungsstörung",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 0,

        //common properties of all trials
        type: "PTED",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoPTED", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte beantworten Sie die folgenden Aussagen und " + 
                    "Feststellungen und kreuzen Sie die für Sie zutreffende Option an.<br>", "start"],
                footerText: "Hinweis: Bevor sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PTED01", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                    "...das mich äußerst gekränkt oder verbittert hat", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED02", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wodurch sich meine psychische Befindlichkeit deutlich und bis heute negativ verändert hat", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED03", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das aus meiner Sicht äußerst ungerecht oder nicht fair war", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED04", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...an das ich immer wieder denken muss", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED05", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das mich heftig aufregt, wenn ich daran erinnert werde", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED06", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Gedanken an Rache auslöst", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED07", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wegen dem ich mir Vorwürfe mache und ärgerlich auf mich selbst bin", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED08", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich häufiger das Gefühl habe, dass es keinen Sinn macht, Dinge anzupacken und sich anzustrengen", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED09", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...durch das meine Stimmung häufig niedergeschlagen und gedrückt ist", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED10", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich mich in allgemein schlechter körperlicher Verfassung fühle", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED11", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich bestimmte Orte oder Personen meide, um nicht daran erinnert zu werden", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED12", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...dem gegenüber ich mich ohnmächtig und hilflos ausgeliefert fühle", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED13", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Geühle der Genugtuung auslöst, beim Gedanken, der Verursacher würde einmal Ähnliches erleiden", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED14", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass meine Kraft und mein Antrieb reduziert und nich mehr wie früher sind", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED15", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich gereizter bin als früher", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED16", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weshalb ich mich ablenken muss, wenn ich vorübergehend eine normale und ausgeglichene Stimmung erleben will", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED17", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich meinen beruflichen und/oder familiären Aktivitäten nicht mehr wie früher nachgehe", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED18", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich mich von Freunden und geselligen Aktiviäten zurückgezogen habe", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED19", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...zu dem sich mir immer wieder belastende Erinnerungen aufdrängen", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]}
        ]
    },

    PID5BF25 : {
        frame: "mchoice",//bleibt
        description: "Personality inventory for DSM5, 25 items",
        version: "1.0",//bleibt
        timeout: 0, //No timeout
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 0,

        //common properties of all trials
        type: "PID5BF",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoPID5BF", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Im Folgenden finden Sie eine Liste von Aussagen, mit denen " + 
                    "sich Menschen selbst beschreiben können. Wir interessieren uns " + 
                    "dafür, wie Sie sich selbst beschreiben würden. Es gibt keine richtigen " + 
                    "oder falschen Antworten. Bitte beschreiben Sie sich so ehrlich wie " + 
                    "möglich - wir werden Ihre Antworten vertraulich behandeln.<br><br>" + 
                    "Nehmen Sie sich etwas Zeit, lesen Sie jede Aussage sorgfältig durch, " + 
                    "und kreuzen Sie jeweils diejenig Antwort an, die Sie am besten beschreibt.", "start"],
                footerText: "Hinweis: Bevor sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PID5BF01", data: ["Andere würden mich als leichtsinnig beschreiben", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", data: ["Es kommt mir vor, als würde ich völlig impulsiv handeln", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF03", data: ["Obwohl ich es eigentlich besser weiß, treffe ich immer weider unterstützte Entscheidungen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF04", data: ["Ich habe oft das Gefühl, dass nichts, was ich tue, wirklich wichtig ist", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF05", data: ["Andere halten mich für verantwortungslos", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF06", data: ["Ich kann nicht gut im Voraus planen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF07", data: ["Meine Gedankengänge ergeben für andere häufig keinen Sinn", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF08", data: ["Ich mache mir über fast alles Sorgen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF09", data: ["Ich werde schnell emotional, oft aus geringstem Anlass", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF10", data: ["Vor nichts im Leben fürchte ich mich so sehr wie vor dem Alleinsein", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF11", data: ["Ich halte an einer bestimmten Herangehensweise fest, auch wenn klar ist, dass es so nicht funktionieren wird", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF12", data: ["Ich habe schon mal Dinge gesehen, die nicht wirklich da waren", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF13", data: ["Ich gehe Liebesbeziehungen aus dem Weg", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF14", data: ["Ich habe kein Interesse daran, Freundschaften zu schließen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF15", data: ["Ich bin schnell von allen möglichen Dingen genervt", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", data: ["Zu viel Nähe zu anderen Menschen ist mir unangenehm", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", data: ["Es ist nichts dabei, wenn ich die Gefühle anderer verletze", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", data: ["Ich bin selten von irgendetwas begeistert", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", data: ["Ich bin verrückt nach Aufmerksamkeit", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", data: ["Ich muss mich oft mit Leuten beschäftigen, die weniger wichtig sind als ich", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", data: ["Ich habe oft Gedanken, die für mich Sinn ergeben, aber anderen Leuten seltsam erscheinen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", data: ["Ich benutze Menschen, um zu bekommen, was ich will", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", data: ["Ich vergesse häufig alles um mich herum, komme dann plötzlich zu mir, und stelle fest, dass viel Zeit vergangen ist", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", data: ["Die Dinge um mich herum fühlen sich oft unwirklich oder realer als sonst an", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", data: ["Es fällt mir leicht, andere auszunutzen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },
    PID5BF34 : {
        frame: "mchoice",//bleibt
        description: "Personality inventory for DSM5, 34 items",
        version: "1.0",//bleibt
        timeout: 0, //No timeout
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 0,

        //common properties of all trials
        type: "PID5BF",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoPID5BF", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Im Folgenden finden Sie eine Liste von Aussagen, mit denen " + 
                    "sich Menschen selbst beschreiben können. Wir interessieren uns " + 
                    "dafür, wie Sie sich selbst beschreiben würden. Es gibt keine richtigen " + 
                    "oder falschen Antworten. Bitte beschreiben Sie sich so ehrlich wie " + 
                    "möglich - wir werden Ihre Antworten vertraulich behandeln.<br><br>" + 
                    "Nehmen Sie sich etwas Zeit, lesen Sie jede Aussage sorgfältig durch, " + 
                    "und kreuzen Sie jeweils diejenig Antwort an, die Sie am besten beschreibt.", "start"],
                footerText: "Hinweis: Bevor sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PID5BF01", data: ["Ich reagiere viel emotionaler als fast alle anderen Menschen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", data: ["Ich bin gut darin, Leute reinzulegen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF03", data: ["Ich gehe oft ziemlich nachlässig mit meinen Sachen und denen anderer um.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF04", data: ["Ich halte Abstand zu Menschen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF05", data: ["Ich sehe zwischen den Dingen oft ungewöhnliche Zusammenhänge, die anderen Menschen entgehen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF06", data: ["Ich gehe Dinge immer auf die gleiche Weise an, auch wenn es so nicht funktioniert.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF07", data: ["Ich mache mir ständig über irgendetwas Sorgen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF08", data: ["Manchmal muss man vor anderen übertreiben, um weiterzukommen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF09", data: ["Es kommt mir vor, als würde ich völlig impulsiv handeln.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF10", data: ["Nichts scheint mich wirklich zu interessieren.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF11", data: ["Man hat mir gesagt, dass meine Art zu denken wirklich seltsam ist.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF12", data: ["Auch wenn es andere zum Wahnsinn treibt, bestehe ich darauf, alles perfekt zu machen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF13", data: ["Ich mache mir viele Sorgen darüber, allein zu sein.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF14", data: ["Es steht mir zu, besonders behandelt zu werden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF15", data: ["Ich verliere in Gesprächen den Faden, weil mich andere Dinge ablenken.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", data: ["Ich halte romantische Gefühle lieber aus meinem Leben heraus.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", data: ["Es ist komisch, aber manchmal kommen mir alltägliche Gegenstände anders vor als sonst.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", data: ["Ich halte an einer bestimmten Herangehensweise fest, auch wenn klar ist, dass es so nicht funktionieren wird.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", data: ["Ich werde schnell emotional, oft aus geringstem Anlass.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", data: ["Es fällt mir leicht, andere auszunutzen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", data: ["Ich vergesse oft, meine Rechnungen zu bezahlen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", data: ["Ich mag es nicht, Zeit mit anderen zu verbringen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", data: ["Ich hatte einige wirklich seltsame Erlebnisse, die sehr schwer zu erklären sind.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", data: ["Ich versuche Dinge weiter zu perfektionieren, auch wenn ich sie wahrscheinlich schon so gut wie möglich hinbekommen habe.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", data: ["Ich mache mir über fast alles Sorgen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF26", data: ["Ich biege mir die Wahrheit zurecht, wenn es zu meinem Vorteil ist.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF27", data: ["Obwohl ich es eigentlich besser weiß, treffe ich immer wieder überstürzte Entscheidungen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF28", data: ["Ich bin selten von irgendetwas begeistert.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF29", data: ["Ich habe mehrere Angewohnheiten, die andere exzentrisch oder seltsam finden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF30", data: ["Ich ertrage es nicht, allein gelassen zu werden – nicht mal für ein paar Stunden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF31", data: ["Ich muss mich oft mit Leuten beschäftigen, die weniger wichtig sind als ich.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF32", data: ["Ich lasse mich leicht ablenken.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF33", data: ["Ich beende Beziehungen, wenn sie enger werden", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF34", data: ["Wenn ich einen vertrauten Gegenstand anschaue, ist es manchmal so, als würde ich ihn zum ersten Mal sehen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },
    
    LPFSBF : {
        frame: "mchoice",//bleibt
        description: "LevelofPersonalityFunctioningScaleBriefForm",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 1,

        //common properties of all trials
        type: "LPFSBF",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoLPFSBF", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte geben Sie für die folgenden Aussagen an,<br>inwieweit " + 
                    "diese für Sie zutreffend sind.", "start"],
                footerText: "Hinweis: Bevor sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "LPFSBF01", data: ["Ich weiß oft nicht wer ich wirklich bin","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF02", data: ["Ich denke oft sehr schlecht über mich selbst", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF03", data: ["Meine Gefühle ändern sich, ohne dass ich sie im Griff habe","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF04", data: ["Ich habe keine Ahnung, wo ich im Leben hin will", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF05", data: ["Ich verstehe oft meine eigenen Gedanken und Gefühle nicht","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF06", data: ["Ich stelle oft unrealistische Anforderungen an mich selbst", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF07", data: ["Ich habe oft Schwierigkeiten, die Gedanken und Gefühle anderer zu verstehen","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF08", data: ["Ich kann es oft schwer aushalten, wenn andere eine andere Meinung haben", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF09", data: ["Ich verstehe oft nicht ganz warum mein Verhalten einen bestimmten Einfluss auf andere hat","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF10", data: ["Meine Beziehungen und Freundschaften halten nie lange", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF11", data: ["Ich fühle mich oft sehr verletzlich, wenn Beziehungen persönlicher werden","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF12", data: ["Es gelingt mir häufig nicht, mit anderen auf eine Weise zusammen zu arbeiten, die für beide Seiten zufriedenstellend sind", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },

    SSTValidationV2 : {			
        frame: "SST",
		description: "SST depression, validation set",	
        version: "2.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,  
        randomBlock: [1, 2, 3], //3 blocks to selecct at random.
        skipOutput: false,  

		trials: [
            //instruction
            { frame: "infopage", randomOrder: false, itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Ihnen werden in der nächsten Aufgabe immer sechs Kästchen nebeneinander präsentiert. Diese " +
                "Kästchen beinhalten Wörter in einer durcheinandergewürfelten Reihenfolge. Aus diesen " + 
                "Wörtern können Sie verschiedene Sätze bilden. Für die Bildung eines Satzes brauchen Sie " +
                "nicht alle Wörter.<br><br>" +
                "Bilden Sie  im Kopf aus den Wörtern einen Satz und klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen würden. " +
                "Nachdem Sie ein Wort angetippt haben kommen Sie automatisch zum nächsten Satz. " + 
                "Versuchen Sie bitte so intuitive wie möglich zu entscheiden.<br><br>" + 
                "Wenn Sie bei diese Studie Ihren Smartphone verwenden, legen Sie ihn am besten quer.<br><br>" + 
                "Sie bekommen nun eine Sequenz von Sätzen präsentiert, diese dienen zur Übung. Anschließend " + 
                "folgt die Sequenz, welche dann zur Auswertung der Daten verwendet wird.<br><br>" + 
                "Nehmen Sie sich bei der Übung so viel Zeit wie Sie brauchen. Nach der Übungsphase " + 
                "haben Sie 7.5 Sekunden Zeit, um eine Alternative zu wählen."]},
            //practice trials. Override timeout and remove it. Override skipOutput.
            { randomOrder: false, skipOutput: true, itemID: "Pr01", type: "AP", timeout: 0,
                data: ["warten", "wir", "lange", "können", "sitzen", "nun"], polarity: -1, pos: 1, neg: 5 },
            { randomOrder: false, skipOutput: true, itemID: "Pr02", type: "AP", timeout: 0,
                data: ["werde", "Ich", "Post", "Haltestelle", "zur", "gehen"], polarity: -1, pos: 3, neg: 4},
            { frame: "infopage", randomOrder: false, itemID: "instructtimeout", type: "info", timeout: 0,
                data: ["Man hat in dem Test 7.5 Sek. um zu antworten.<br>Ab jetzt auch in der Übung.", "weiter"]},
            { randomOrder: false, skipOutput: true, itemID: "Pr03", type: "AP",
                data: ["Tisch", "Anna", "auf", "sitzt", "dem", "Stuhl"], polarity: -1, pos: 1, neg: 6 },
            { randomOrder: false, skipOutput: true, itemID: "Pr04", type: "AP",
                data: ["Hosen", "blau", "sind", "seine", "schwarz", "alle"], polarity: -1, pos: 2, neg: 4 },
            { frame: "infopage", randomOrder: false, itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die Übung ist jetzt zu Ende.<br>Clicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
            //actual test, neutral sentences, not in any block (always included) but randomized with rest
            { itemID: "N1r_V2_2PN", type: "N", data: ["gehört", "habe", "ich", "es", "mehrmals", "gesehen"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "N4r_V2_3PN", type: "N", data: ["Kinder", "im", "die", "spielen", "Wasser", "Sand"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "N6_V2_4PN",  type: "N", data: ["Motorrad ", "Fahrrad", "fahre", "dem", "mit", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "N30_V2_7PN", type: "N", data: ["bin", "draußen", "immer", "ich", "fast", "unterwegs"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "N10_V2_8PN", type: "N", data: ["Frühling ", "im", "Geburtstag", "mein", "Sommer", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            //actual test, mixed blocks, block 1
            { itemID: "O1r_V2_1PN", block: 1, type: "PN", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E24_V2_1UN", block: 1, type: "NU", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Unterlagen"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "O4_V2_2PU", block: 1, type: "PU", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "zu tun"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "O6r_V2_2NP", block: 1, type: "PN", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "A2_V2_3NU", block: 1, type: "NU", data: ["bin", "einfach", "manchmal", "ich", "traurig", "bummeln"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E14_V2_3UP", block: 1, type: "PU", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "moderner"], polarity: 1, pos: 5, neg: 6 },
            { itemID: "E1_V2_4NP", block: 1, type: "PN", data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 },
            { itemID: "E2_V2_4UN", block: 1, type: "NU", data: ["gesehen", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E16_V2_5PU", block: 1, type: "PU", data: ["mal", "bewundert", "werde", "einkaufen", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 },
            { itemID: "R19_V2_5NP", block: 1, type: "PN", data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E22_V2_6NU", block: 1, type: "NU", data: ["noch", "wir", "Strafe", "bekommen", "Benachrichtigung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "O7_V2_6UP", block: 1, type: "PU", data: ["meine", "werde", "erreichen", "Ziele", "setzen", "ich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "E4_V2_7NP", block: 1, type: "PN", data: ["bin", "schuld", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2 },
            { itemID: "O11_V2_7UN", block: 1, type: "NU", data: ["meine", "angekommen", "sind", "Bewerbungen", "bestimmt", "aussichtlos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E10_V2_8PU", block: 1, type: "PU", data: ["erreichen", "ich", "Anschluss", "den", "suchen", "werde"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E11_V2_8PN", block: 1, type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E13_V2_9NU", block: 1, type: "NU", data: ["stehen", "Chancen", "echt", "schlecht", "die", "offen"], polarity: 1, pos: 6, neg: 4 },
            { itemID: "E23_V2_9PU", block: 1, type: "PU", data: ["wird", "Akku", "gleich", "voll", "der", "angezeigt"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "A6R_V2_10PN", block: 1, type: "PN", data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 },
            { itemID: "O5_V2_10NU", block: 1, type: "NU", data: ["verpasst", "die", "aufgezeigt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 },
            { itemID: "O10r_V2_1PU", block: 1, type: "PU", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "regelmäßig"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E15_V2_2NP", block: 1, type: "PN", data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "E20_V2_3NU", block: 1, type: "NU", data: ["Kinder", "viel", "die", "machen", "Kummer", "Unfug"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E18_V2_4PU", block: 1, type: "PU", data: ["froh", "unterwegs", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E8_V2_5NP", block: 1, type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E21_V2_6UN", block: 1, type: "NU", data: ["jetzt", "ist", "anders", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "56_V2_7UP", block: 1, type: "PU", data: ["man", "Notwendige", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 },
            { itemID: "O9r_V2_8PN", block: 1, type: "PN", data: ["rosig", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E12_V2_9UN", block: 1, type: "NU", data: ["das", "Projekt", "ich", "bearbeiten", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "E7_V2_10UP", block: 1, type: "PU", data: ["verwaltet", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 },
            //block 2
            { itemID: "O1r_V2_1UN", block: 2, type: "NU", data: ["ausmisten", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1PU", block: 2, type: "PU", data: ["Unterlagen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2PN", block: 2, type: "PN", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2NU", block: 2, type: "NU", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "notiert"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3UP", block: 2, type: "PU", data: ["bin", "einfach", "manchmal", "ich", "bummeln", "glücklich"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E14_V2_3NP", block: 2, type: "PN", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "schwerer"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "E1_V2_4NU", block: 2, type: "NU", data: ["Schuld", "Sachen", "mir", "sie", "die", "geben"], polarity: -1, pos:2, neg: 1 }, 
            { itemID: "E2_V2_4PU", block: 2, type: "PU", data: ["erwischt", "gesehen", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E16_V2_5PN", block: 2, type: "PN", data: ["mal", "bewundert", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 }, 
            { itemID: "R19_V2_5NU", block: 2, type: "NU", data: ["gibt", "Probleme", "neue", "Meinungen", "es", "viele"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E22_V2_6UP", block: 2, type: "PU", data: ["noch", "wir", "Benachrichtigung", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 }, 
            { itemID: "O7_V2_6NP", block: 2, type: "PN", data: ["meine", "werde", "erreichen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E4_V2_7NU", block: 2, type: "NU", data: ["bin", "schuld", "fast", "ich", "immer", "anwesend"], polarity: -1, pos: 6, neg: 2 }, 
            { itemID: "O11_V2_7PU", block: 2, type: "PU", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "angekommen"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "E10_V2_8PN", block: 2, type: "PN", data: ["erreichen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E11_V2_8UN", block: 2, type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unverändert", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9UP", block: 2, type: "PU", data: ["stehen", "Chancen", "echt", "offen", "die", "großartig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9PN", block: 2, type: "PN", data: ["wird", "Akku", "gleich", "voll", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10UN", block: 2, type: "NU", data: ["Termine", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10UP", block: 2, type: "PU", data: ["aufgezeigt", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1PN", block: 2, type: "PN", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2NU", block: 2, type: "NU", data: ["gescheitert", "bin", "immer", "ich", "fast", "erreichbar"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3UP", block: 2, type: "PU", data: ["Kinder", "viel", "die", "machen", "Unfug", "Vergnügen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4PN", block: 2, type: "PN", data: ["froh", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5NU", block: 2, type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E21_V2_6PU", block: 2, type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "56_V2_7NP", block: 2, type: "PN", data: ["man", "Falsche", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 }, 
            { itemID: "O9R_V2_8UN", block: 2, type: "NU", data: ["nah", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E12_V2_9PU", block: 2, type: "PU", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "bearbeiten"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "E7_V2_10NP", block: 2, type: "PN", data: ["verloren", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 }, 
            //block 3
            { itemID: "O1r_V2_1PU", block: 3, type: "PU", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "ausmisten"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1NP", block: 3, type: "PN", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2UN", block: 3, type: "NU", data: ["zu tun", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2UP", block: 3, type: "PU", data: ["notiert", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3NP", block: 3, type: "PN", data: ["bin ", "einfach", "manchmal", "ich", "traurig", "glücklich"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E14_V2_3NU", block: 3, type: "NU", data: ["Zukunft", "in", "alles", "wird", "moderner", "schwerer"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "E1_V2_4UP", block: 3, type: "PU", data: ["Sachen", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 }, 
            { itemID: "E2_V2_4PN", block: 3, type: "PN", data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E16_V2_5UN", block: 3, type: "NU", data: ["mal", "einkaufen", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 }, 
            { itemID: "R19_V2_5UP", block: 3, type: "PU", data: ["gibt", "Meinungen", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E22_V2_6NP", block: 3, type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 }, 
            { itemID: "O7_V2_6NU", block: 3, type: "NU", data: ["meine", "werde", "setzen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E4_V2_7UP", block: 3, type: "PU", data: ["bin", "anwesend", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2 }, 
            { itemID: "O11_V2_7PN", block: 3, type: "PN", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "E10_V2_8UN", block: 3, type: "NU", data: ["suchen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E11_V2_8PU", block: 3, type: "PU", data: ["unverändert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9NP", block: 3, type: "PN", data: ["stehen", "Chancen", "echt", "schlecht", "die", "großartig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9UN", block: 3, type: "NU", data: ["wird", "Akku", "gleich", "angezeigt", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10PU", block: 3, type: "PU", data: ["Zuversicht", "ist", "Termine", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10NP", block: 3, type: "PN", data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1UN", block: 3, type: "NU", data: ["regelmäßig", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2UP", block: 3, type: "PU", data: ["erreichbar", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3NP", block: 3, type: "PN", data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergnügen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4UN", block: 3, type: "NU", data: ["unterwegs", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5UP", block: 3, type: "PU", data: ["meine", "weitergehen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E21_V2_6PN", block: 3, type: "PN", data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "56_V2_7NU", block: 3, type: "NU", data: ["man", "Falsche", "das", "tut", "meist", "Notwendige"], polarity: 1, pos: 6, neg: 2 }, 
            { itemID: "O9R_V2_8PU", block: 3, type: "PU", data: ["rosig", "sehr", "Zukunft", "die", "nah", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E12_V2_9PN", block: 3, type: "PN", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "E7_V2_10NU", block: 3, type: "NU", data: ["verloren", "viel", "verwaltet", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 },                        
            //homogeneous blocks, block 4
            { itemID: "E24_V2_1UN", block: 4, type: "NU", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Unterlagen"], polarity: 1, pos: 6, neg: 1                       },
            { itemID: "A2_V2_3NU", block: 4, type: "NU", data: ["bin", "einfach", "manchmal", "ich", "traurig", "bummeln"], polarity: 1, pos: 6, neg: 5                     },
            { itemID: "E2_V2_4UN", block: 4, type: "NU", data: ["gesehen", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                           },
            { itemID: "E22_V2_6NU", block: 4, type: "NU", data: ["noch", "wir", "Strafe", "bekommen", "Benachrichtigung", "eine"], polarity: 1, pos: 5, neg: 3              },
            { itemID: "O11_V2_7UN", block: 4, type: "NU", data: ["meine", "angekommen", "sind", "Bewerbungen", "bestimmt", "aussichtlos"], polarity: -1, pos: 2, neg: 6     },
            { itemID: "E13_V2_9NU", block: 4, type: "NU", data: ["stehen", "Chancen", "echt", "schlecht", "die", "offen"], polarity: 1, pos: 6, neg: 4                      },
            { itemID: "O5_V2_10NU", block: 4, type: "NU", data: ["verpasst", "die", "aufgezeigt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1            },
            { itemID: "E20_V2_3NU", block: 4, type: "NU", data: ["Kinder", "viel", "die", "machen", "Kummer", "Unfug"], polarity: 1, pos: 6, neg: 5                         },
            { itemID: "E21_V2_6UN", block: 4, type: "NU", data: ["jetzt", "ist", "anders", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5                   },
            { itemID: "E12_V2_9UN", block: 4, type: "NU", data: ["das", "Projekt", "ich", "bearbeiten", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6                 },
            { itemID: "O1r_V2_1UN", block: 4, type: "NU", data: ["ausmisten", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6                  },
            { itemID: "O6r_V2_2NU", block: 4, type: "NU", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "notiert"], polarity: 1, pos: 6, neg: 1                  },
            { itemID: "E1_V2_4NU", block: 4, type: "NU", data: ["Schuld", "Sachen", "mir", "sie", "die", "geben"], polarity: -1, pos:2, neg: 1                              },
            { itemID: "R19_V2_5NU", block: 4, type: "NU", data: ["gibt", "Probleme", "neue", "Meinungen", "es", "viele"], polarity: 1, pos: 4, neg: 2                       },
            { itemID: "E4_V2_7NU", block: 4, type: "NU", data: ["bin", "schuld", "fast", "ich", "immer", "anwesend"], polarity: -1, pos: 6, neg: 2                          },
            { itemID: "E11_V2_8UN", block: 4, type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unverändert", "meine"], polarity: 1, pos: 5, neg: 1       },
            { itemID: "A6R_V2_10UN", block: 4, type: "NU", data: ["Termine", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                      },
            { itemID: "E15_V2_2NU", block: 4, type: "NU", data: ["gescheitert", "bin", "immer", "ich", "fast", "erreichbar"], polarity: 1, pos: 6, neg: 1                   },
            { itemID: "E8_V2_5NU", block: 4, type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2      },
            { itemID: "O9R_V2_8UN", block: 4, type: "NU", data: ["nah", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5                            },
            { itemID: "O4_V2_2UN", block: 4, type: "NU", data: ["zu tun", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6                  },
            { itemID: "E14_V2_3NU", block: 4, type: "NU", data: ["Zukunft", "in", "alles", "wird", "moderner", "schwerer"], polarity: 1, pos: 5, neg: 6                     },
            { itemID: "E16_V2_5UN", block: 4, type: "NU", data: ["mal", "einkaufen", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                 },
            { itemID: "O7_V2_6NU", block: 4, type: "NU", data: ["meine", "werde", "setzen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5                      },
            { itemID: "E10_V2_8UN", block: 4, type: "NU", data: ["suchen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5                  },
            { itemID: "E23_V2_9UN", block: 4, type: "NU", data: ["wird", "Akku", "gleich", "angezeigt", "der", "leer"], polarity: 1, pos: 4, neg: 6                         },
            { itemID: "O10r_V2_1UN", block: 4, type: "NU", data: ["regelmäßig", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6           },
            { itemID: "E18_V2_4UN", block: 4, type: "NU", data: ["unterwegs", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                      },
            { itemID: "56_V2_7NU", block: 4, type: "NU", data: ["man", "Falsche", "das", "tut", "meist", "Notwendige"], polarity: 1, pos: 6, neg: 2                         },
            { itemID: "E7_V2_10NU", block: 4, type: "NU", data: ["verloren", "viel", "verwaltet", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                      },
            //block 5
            { itemID: "O1r_V2_1PN", block: 5, type: "PN", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6                 },
            { itemID: "O6r_V2_2NP", block: 5, type: "PN", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1                  },
            { itemID: "E1_V2_4NP", block: 5, type: "PN", data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1                          },
            { itemID: "R19_V2_5NP", block: 5, type: "PN", data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2                         },
            { itemID: "E4_V2_7NP", block: 5, type: "PN", data: ["bin", "schuld", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2                           },
            { itemID: "E11_V2_8PN", block: 5, type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1           },
            { itemID: "A6R_V2_10PN", block: 5, type: "PN", data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                   },
            { itemID: "E15_V2_2NP", block: 5, type: "PN", data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1                    },
            { itemID: "E8_V2_5NP", block: 5, type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2        },
            { itemID: "O9r_V2_8PN", block: 5, type: "PN", data: ["rosig", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5                          },
            { itemID: "O4_V2_2PN", block: 5, type: "PN", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6                  },
            { itemID: "E14_V2_3NP", block: 5, type: "PN", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "schwerer"], polarity: 1, pos: 5, neg: 6                   },
            { itemID: "E16_V2_5PN", block: 5, type: "PN", data: ["mal", "bewundert", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                 },
            { itemID: "O7_V2_6NP", block: 5, type: "PN", data: ["meine", "werde", "erreichen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5                   },
            { itemID: "E10_V2_8PN", block: 5, type: "PN", data: ["erreichen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5               },
            { itemID: "E23_V2_9PN", block: 5, type: "PN", data: ["wird", "Akku", "gleich", "voll", "der", "leer"], polarity: 1, pos: 4, neg: 6                              },
            { itemID: "O10r_V2_1PN", block: 5, type: "PN", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6             },
            { itemID: "E18_V2_4PN", block: 5, type: "PN", data: ["froh", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                           },
            { itemID: "56_V2_7NP", block: 5, type: "PN", data: ["man", "Falsche", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2                           },
            { itemID: "E7_V2_10NP", block: 5, type: "PN", data: ["verloren", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                       },
            { itemID: "E24_V2_1NP", block: 5, type: "PN", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1                          },
            { itemID: "A2_V2_3NP", block: 5, type: "PN", data: ["bin ", "einfach", "manchmal", "ich", "traurig", "glücklich"], polarity: 1, pos: 6, neg: 5                  },
            { itemID: "E2_V2_4PN", block: 5, type: "PN", data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                          },
            { itemID: "E22_V2_6NP", block: 5, type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3                  },
            { itemID: "O11_V2_7PN", block: 5, type: "PN", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E13_V2_9NP", block: 5, type: "PN", data: ["stehen", "Chancen", "echt", "schlecht", "die", "großartig"], polarity: 1, pos: 6, neg: 4                  },
            { itemID: "O5_V2_10NP", block: 5, type: "PN", data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1               },
            { itemID: "E20_V2_3NP", block: 5, type: "PN", data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergnügen"], polarity: 1, pos: 6, neg: 5                     },
            { itemID: "E21_V2_6PN", block: 5, type: "PN", data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5         },
            { itemID: "E12_V2_9PN", block: 5, type: "PN", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6                 },
            //block 6
            { itemID: "O4_V2_2PU", block: 6, type: "PU", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "zu tun"], polarity: -1, pos: 1, neg: 6                      },
            { itemID: "E14_V2_3UP", block: 6, type: "PU", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "moderner"], polarity: 1, pos: 5, neg: 6                   },
            { itemID: "E16_V2_5PU", block: 6, type: "PU", data: ["mal", "bewundert", "werde", "einkaufen", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                   },
            { itemID: "O7_V2_6UP", block: 6, type: "PU", data: ["meine", "werde", "erreichen", "Ziele", "setzen", "ich"], polarity: -1, pos: 3, neg: 5                      },
            { itemID: "E10_V2_8PU", block: 6, type: "PU", data: ["erreichen", "ich", "Anschluss", "den", "suchen", "werde"], polarity: -1, pos: 1, neg: 5                  },
            { itemID: "E23_V2_9PU", block: 6, type: "PU", data: ["wird", "Akku", "gleich", "voll", "der", "angezeigt"], polarity: 1, pos: 4, neg: 6                         },
            { itemID: "O10r_V2_1PU", block: 6, type: "PU", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "regelmäßig"], polarity: -1, pos: 1, neg: 6          },
            { itemID: "E18_V2_4PU", block: 6, type: "PU", data: ["froh", "unterwegs", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                        },
            { itemID: "56_V2_7UP", block: 6, type: "PU", data: ["man", "Notwendige", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2                        },
            { itemID: "E7_V2_10UP", block: 6, type: "PU", data: ["verwaltet", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                      },
            { itemID: "E24_V2_1PU", block: 6, type: "PU", data: ["Unterlagen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1                      },
            { itemID: "A2_V2_3UP", block: 6, type: "PU", data: ["bin", "einfach", "manchmal", "ich", "bummeln", "glücklich"], polarity: 1, pos: 6, neg: 5                   },
            { itemID: "E2_V2_4PU", block: 6, type: "PU", data: ["erwischt", "gesehen", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                           },
            { itemID: "E22_V2_6UP", block: 6, type: "PU", data: ["noch", "wir", "Benachrichtigung", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3        },
            { itemID: "O11_V2_7PU", block: 6, type: "PU", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "angekommen"], polarity: -1, pos: 2, neg: 6   },
            { itemID: "E13_V2_9UP", block: 6, type: "PU", data: ["stehen", "Chancen", "echt", "offen", "die", "großartig"], polarity: 1, pos: 6, neg: 4                     },
            { itemID: "O5_V2_10UP", block: 6, type: "PU", data: ["aufgezeigt", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1             },
            { itemID: "E20_V2_3UP", block: 6, type: "PU", data: ["Kinder", "viel", "die", "machen", "Unfug", "Vergnügen"], polarity: 1, pos: 6, neg: 5                      },
            { itemID: "E21_V2_6PU", block: 6, type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5               },
            { itemID: "E12_V2_9PU", block: 6, type: "PU", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "bearbeiten"], polarity: 1, pos: 4, neg: 6                 },
            { itemID: "O1r_V2_1PU", block: 6, type: "PU", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "ausmisten"], polarity: -1, pos: 1, neg: 6               },
            { itemID: "O6r_V2_2UP", block: 6, type: "PU", data: ["notiert", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1                   },
            { itemID: "E1_V2_4UP", block: 6, type: "PU", data: ["Sachen", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1                          },
            { itemID: "R19_V2_5UP", block: 6, type: "PU", data: ["gibt", "Meinungen", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2                        },
            { itemID: "E4_V2_7UP", block: 6, type: "PU", data: ["bin", "anwesend", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2                         },
            { itemID: "E11_V2_8PU", block: 6, type: "PU", data: ["unverändert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1            },
            { itemID: "A6R_V2_10PU", block: 6, type: "PU", data: ["Zuversicht", "ist", "Termine", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                  },
            { itemID: "E15_V2_2UP", block: 6, type: "PU", data: ["erreichbar", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1                     },
            { itemID: "E8_V2_5UP", block: 6, type: "PU", data: ["meine", "weitergehen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2      },
            { itemID: "O9R_V2_8PU", block: 6, type: "PU", data: ["rosig", "sehr", "Zukunft", "die", "nah", "ist"], polarity: -1, pos: 1, neg: 5                             }
        ]
    },

    /////////////////TEST SST RUNS//////////////////////////

    SSTValidationV2Neutral : {			
        frame: "SST",
		description: "SST depression, validation set, individual runs",	
        version: "2.0",	
        timeout: 0,
        timeRefractory: 0,
        randomOrder: false,  
        skipOutput: false,  

		trials: [
            //actual test, neutral sentences
            { itemID: "N1r_V2_2PN", type: "N", data: ["gehört ", "habe", "ich", "es", "mehrmals", "gesehen"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "N4r_V2_3PN", type: "N", data: ["Kinder ", "im", "die", "spielen", "Wasser", "Sand"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "N6_V2_4PN",  type: "N", data: ["Motorrad ", "Fahrrad", "fahre", "dem", "mit", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "N30_V2_7PN", type: "N", data: ["bin ", "draußen", "immer", "ich", "fast", "unterwegs"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "N10_V2_8PN", type: "N", data: ["Frühling ", "im", "Geburtstag", "meine", "Sommer", "ist"], polarity: -1, pos: 1, neg: 5 }
        ]
    },

    SSTValidationV2Block1 : {			
        frame: "SST",
		description: "SST depression, validation set, individual runs",	
        version: "2.0",	
        timeout: 0,
        timeRefractory: 0,
        randomOrder: false,  
        skipOutput: false,  

		trials: [
            //actual test, block 1
            { itemID: "O1r_V2_1PN", block: 1, type: "PN", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E24_V2_1UN", block: 1, type: "NU", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Unterlagen"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "O4_V2_2PU", block: 1, type: "PU", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "zu tun"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "O6r_V2_2NP", block: 1, type: "PN", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "A2_V2_3NU", block: 1, type: "NU", data: ["bin", "einfach", "manchmal", "ich", "traurig", "bummeln"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E14_V2_3UP", block: 1, type: "PU", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "moderner"], polarity: 1, pos: 5, neg: 6 },
            { itemID: "E1_V2_4NP", block: 1, type: "PN", data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 },
            { itemID: "E2_V2_4UN", block: 1, type: "NU", data: ["gesehen", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E16_V2_5PU", block: 1, type: "PU", data: ["mal", "bewundert", "werde", "einkaufen", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 },
            { itemID: "R19_V2_5NP", block: 1, type: "PN", data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E22_V2_6NU", block: 1, type: "NU", data: ["noch", "wir", "Strafe", "bekommen", "Benachrichtigung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "O7_V2_6UP", block: 1, type: "PU", data: ["meine", "werde", "erreichen", "Ziele", "setzen", "ich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "E4_V2_7NP", block: 1, type: "PN", data: ["bin", "schuld", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2 },
            { itemID: "O11_V2_7UN", block: 1, type: "NU", data: ["meine", "angekommen", "sind", "Bewerbungen", "bestimmt", "aussichtlos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E10_V2_8PU", block: 1, type: "PU", data: ["erreichen", "ich", "Anschluss", "den", "suchen", "werden"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E11_V2_8PN", block: 1, type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E13_V2_9NU", block: 1, type: "NU", data: ["stehen", "Chancen", "echt", "schlecht", "die", "offen"], polarity: 1, pos: 6, neg: 4 },
            { itemID: "E23_V2_9PU", block: 1, type: "PU", data: ["wird", "Akku", "gleich", "voll", "der", "angezeigt"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "A6R_V2_10PN", block: 1, type: "PN", data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 },
            { itemID: "O5_V2_10NU", block: 1, type: "NU", data: ["verpasst", "die", "aufgezeigt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 },
            { itemID: "O10r_V2_1PU", block: 1, type: "PU", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "regelmäßig"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E15_V2_2NP", block: 1, type: "PN", data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "E20_V2_3NU", block: 1, type: "NU", data: ["Kinder", "viel", "die", "machen", "Kummer", "Unfug"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E18_V2_4PU", block: 1, type: "PU", data: ["froh", "unterwegs", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E8_V2_5NP", block: 1, type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E21_V2_6UN", block: 1, type: "NU", data: ["jetzt", "ist", "anders", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "56_V2_7UP", block: 1, type: "PU", data: ["man", "Notwendige", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 },
            { itemID: "O9r_V2_8PN", block: 1, type: "PN", data: ["rosig", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E12_V2_9UN", block: 1, type: "NU", data: ["das", "Projekt", "ich", "bearbeiten", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "E7_V2_10UP", block: 1, type: "PU", data: ["verwaltet", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 }
        ]
    },

    SSTValidationV2Block2 : {			
        frame: "SST",
		description: "SST depression, validation set, individual runs",	
        version: "2.0",	
        timeout: 0,
        timeRefractory: 0,
        randomOrder: false,  
        skipOutput: false,  

		trials: [
            //block 2
            { itemID: "O1r_V2_1UN", block: 2, type: "NU", data: ["ausmisten", "irgendwann", "mal", "werde", "ich", "sterbe"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1PU", block: 2, type: "PU", data: ["Unterlagen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2PN", block: 2, type: "PN", data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2NU", block: 2, type: "NU", data: ["zerstört", "große", "Wünsche", "werden", "sehr", "notiert"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3UP", block: 2, type: "PU", data: ["bin", "einfach", "manchmal", "ich", "bummeln", "glücklich"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E14_V2_3NP", block: 2, type: "PN", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "schwerer"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "E1_V2_4NU", block: 2, type: "NU", data: ["Schuld", "Sachen", "mir", "sie", "die", "geben"], polarity: -1, pos:2, neg: 1 }, 
            { itemID: "E2_V2_4PU", block: 2, type: "PU", data: ["erwischt", "gesehen", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E16_V2_5PN", block: 2, type: "PN", data: ["mal", "bewundert", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 }, 
            { itemID: "R19_V2_5NU", block: 2, type: "NU", data: ["gibt", "Probleme", "neue", "Meinungen", "es", "viele"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E22_V2_6UP", block: 2, type: "PU", data: ["noch", "wir", "Benachrichtigung", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 }, 
            { itemID: "O7_V2_6NP", block: 2, type: "PN", data: ["meine", "werde", "erreichen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E4_V2_7NU", block: 2, type: "NU", data: ["bin", "schuld", "fast", "ich", "immer", "anwesend"], polarity: -1, pos: 6, neg: 2 }, 
            { itemID: "O11_V2_7PU", block: 2, type: "PU", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "angekommen"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "E10_V2_8PN", block: 2, type: "PN", data: ["erreichen", "ich", "Anschluss", "den", "verpassen", "werden"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E11_V2_8UN", block: 2, type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unverändert", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9UP", block: 2, type: "PU", data: ["stehen", "Chancen", "echt", "offen", "die", "großartig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9PN", block: 2, type: "PN", data: ["wird", "Akku", "gleich", "voll", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10UN", block: 2, type: "2UN", data: ["Termine", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10UP", block: 2, type: "PU", data: ["aufgezeigt", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1PN", block: 2, type: "PN", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2NU", block: 2, type: "NU", data: ["gescheitert", "bin", "immer", "ich", "fast", "erreichbar"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3UP", block: 2, type: "PU", data: ["Kinder", "viel", "die", "machen", "Unfug", "Vergnügen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4PN", block: 2, type: "PN", data: ["froh", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5NU", block: 2, type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E21_V2_6PU", block: 2, type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "56_V2_7NP", block: 2, type: "PN", data: ["man", "Falsche", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 }, 
            { itemID: "O9R_V2_8UN", block: 2, type: "NU", data: ["nah", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E12_V2_9PU", block: 2, type: "PU", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "bearbeiten"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "E7_V2_10NP", block: 2, type: "PN", data: ["verloren", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 }
        ]
    },

    SSTValidationV2Block3 : {			
        frame: "SST",
		description: "SST depression, validation set, individual runs",	
        version: "2.0",	
        timeout: 0,
        timeRefractory: 0,
        randomOrder: false,  
        skipOutput: false,  

		trials: [
            //block 3
            { itemID: "O1r_V2_1PU", block: 3, type: "PU", data: ["glücklich", "irgendwann", "mal", "werde", "ich", "ausmisten"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1NP", block: 3, type: "PN", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2UN", block: 3, type: "NU", data: ["zu tun", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2UP", block: 3, type: "PU", data: ["notiert", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3NP", block: 3, type: "PN", data: ["bin ", "einfach", "manchmal", "ich", "traurig", "glücklich"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E14_V2_3NU", block: 3, type: "NU", data: ["Zukunft", "in", "alles", "wird", "moderner", "schwerer"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "E1_V2_4UP", block: 3, type: "PU", data: ["Sachen", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 }, 
            { itemID: "E2_V2_4PN", block: 3, type: "PN", data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E16_V2_5UN", block: 3, type: "NU", data: ["mal", "einkaufen", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 }, 
            { itemID: "R19_V2_5UP", block: 3, type: "PU", data: ["gibt", "Meinungen", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E22_V2_6NP", block: 3, type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 }, 
            { itemID: "O7_V2_6NU", block: 3, type: "NU", data: ["meine", "werde", "setzen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E4_V2_7UP", block: 3, type: "PU", data: ["bin", "anwesend", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2 }, 
            { itemID: "O11_V2_7PN", block: 3, type: "PN", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "E10_V2_8UN", block: 3, type: "NU", data: ["suchen", "ich", "Anschluss", "den", "verpassen", "werden"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E11_V2_8PU", block: 3, type: "PU", data: ["unverändert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9NP", block: 3, type: "PN", data: ["stehen", "Chancen", "echt", "schlecht", "die", "großartig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9UN", block: 3, type: "NU", data: ["wird", "Akku", "gleich", "angezeigt", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10PU", block: 3, type: "PU", data: ["Zuversicht", "ist", "Termine", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10NP", block: 3, type: "PN", data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1UN", block: 3, type: "NU", data: ["regelmäßig", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2UP", block: 3, type: "PU", data: ["erreichbar", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3NP", block: 3, type: "PN", data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergnügen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4UN", block: 3, type: "NU", data: ["unterwegs", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5UP", block: 3, type: "PU", data: ["meine", "weitergehen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E21_V2_6PN", block: 3, type: "PN", data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "56_V2_7NU", block: 3, type: "NU", data: ["man", "Falsche", "das", "tut", "meist", "Notwendige"], polarity: 1, pos: 6, neg: 2 }, 
            { itemID: "O9R_V2_8PU", block: 3, type: "PU", data: ["rosig", "sehr", "Zukunft", "die", "nah", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E12_V2_9PN", block: 3, type: "PN", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "E7_V2_10NU", block: 3, type: "NU", data: ["verloren", "viel", "verwaltet", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 }                        
        ]
    },

    SSTValidationV2Test : {			
        frame: "SST",
		description: "SST depression, validation set, individual runs",	
        version: "2.0",	
        timeout: 0,
        timeRefractory: 0,
        randomOrder: false,  
        skipOutput: false,  

		trials: [
            { itemID: "E22_V2_6NU", type: "NU", data: ["noch", "wir", "Strafe", "bekommen", "Benachrichtigung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "O11_V2_7UN", type: "NU", data: ["meine", "angekommen", "sind", "Bewerbungen", "bestimmt", "aussichtlos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E11_V2_8PN", type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E8_V2_5NP", type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E21_V2_6UN", type: "NU", data: ["jetzt", "ist", "anders", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E14_V2_3NP", type: "PN", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "schwerer"], polarity: 1, pos: 5, neg: 6 },
            { itemID: "E22_V2_6UP", type: "PU", data: ["noch", "wir", "Benachrichtigung", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "E11_V2_8UN", type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unverändert", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E8_V2_5NU", type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E21_V2_6PU", type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "E22_V2_6NP", type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "E11_V2_8PU", type: "PU", data: ["unverändert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E21_V2_6PN", type: "PN", data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 }                     
        ]
    }

};
