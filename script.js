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
            { frame : "infopage", itemID: "infoUltimatum", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Erkärtext zum Ultimatumgame", "Start"]},
            { itemID: "ultRound1", type: "goodOffer", data : [12]},
            { itemID: "ultRound2", type: "badOffer",  data : [2]},
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { frame : "SST", itemID: "O2p13", type: "AP", timeout: 7500, data: ["macht", "meine", "glücklich", "Arbeit", "müde", "mich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "ultRound3", type: "midOffer", data : [10]},
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
    },

    /////////////////////REAL SCRIPTS////////////////////////////////////////////////////
    ADS : {
        frame: "mchoice",//bleibt
        description: "Allgemeine Depressionsskala",
        version: "1.0",//bleibt
        timeout: 5000, //bleibt
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt

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
            { itemID: "ADS01", data: ["...haben mich Dinge beunruhigt die mir sonst nichts ausmachen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS02", data: ["...hatte ich kaum Appetiet", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS03", data: ["...konnte ich meine trübsinnige Laune nicht loswerden, obwohl meine Freunde oder Familie versuchten, mich aufzumuntern", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS04", data: ["...kam ich mir genauso gut vor wie andere", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS05", data: ["...hatte ich Mühe, mich zu konzentrieren", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS06", data: ["...war ich deprimiert/ niedergeschlagen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS07", data: ["...war alles anstrengend für mich", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS08", data: ["...dachte ich voller Hoffnung an die Zukunft", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS09", data: ["...dachte ich, mein Leben ist ein einziger Fehlschlag", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS10", data: ["...hatte ich Angst", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS11", data: ["...habe ich schlecht geschlafen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS12", data: ["...war ich fröhlich gestimmt", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS13", data: ["...habe ich weniger als sonst geredet", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS14", data: ["...fühlte ich mich einsam", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS15", data: ["...waren die Leute unfreundlich zu mir", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS16", data: ["...habe ich das Leben genossen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS17", data: ["...musste ich weinen", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS18", data: ["...war ich traurig", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS19", data: ["...hatte ich das Gefühl, dass mich die Leute nicht leiden können", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS20", data: ["...konnte ich mich zu nichts aufraffen", "selten", "manchmal", "öfters", "meistens"]}
        ]
    },
    PTED : {
        frame: "mchoice",//bleibt
        description: "Posttraumatische Verbitterungsstörung",
        version: "1.0",//bleibt
        timeout: 5000, //bleibt
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt

        //common properties of all trials
        type: "PTED",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoPTED", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte beantworten Sie die folgenden Aussagen und " + 
                "Feststelungen und kreuzen Sie die für Sie zutreffende Spalte an. " + 
                "Bitte lassen Sie keine Zeile aus!<br><br>In den vergangenen Jahren " + 
                "hatte ich ein einschneidendes Lebensereignis zu verkraften,...", "start"]},
            { itemID: "PTED01", data: ["das mich äußerst gekränkt oder verbittert hat", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED02", data: ["wodurch sich meine psychische Befindlichkeit deutlich und bis heute negativ verändert hat", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED03", data: ["das aus meiner Sicht äußerst ungerecht oder nicht fair war", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED04", data: ["an das ich immer wieder denken muss", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED05", data: ["das mich heftig aufregt, wenn ich daran erinnert werde", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED06", data: ["das in mir Gedanken an Rache auslöst", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED07", data: ["wegen dem ich mir Vorwürfe mache und ärgerlich auf mich selbst bin", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED08", data: ["weswegen ich häufiger das Gefühl habe, dass es keinen Sinn macht, Dinge anzupacken und sich anzustrengen", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED09", data: ["durch das meine Stimmung häufig niedergeschlagen und gedrückt ist", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED10", data: ["das dazu geführt hat, dass ich mich in allgemein schlechter körperlicher Verfassung fühle", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED11", data: ["weswegen ich bestimmte Orte oder Personen meide, um nicht daran erinnert zu werden", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED12", data: ["dem gegenüber ich mich ohnmächtig und hilflos ausgeliefert", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED13", data: ["das in mir Geühle der Genugtuung auslöst, beim Gedanken, der Verursacher würde einmal Ähnliches erleiden", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED14", data: ["das dazu geführt hat, dass meie raft und mein Antrieb reduziert und nich mehr wie früher sind", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED15", data: ["das dazu geführt hat, dass ich gereizter bin als früher", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED16", data: ["weshalb ich mich ablenken muss, wenn ich vorübergehend eine normale und ausgeglichene Stimmung erleben will", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED17", data: ["das dazu geführt hat, dass ich meinen beruflichen und/oder familiären Aktivitäten nicht mehr wie früher nachgehe", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED18", data: ["das dazu geführt hat, dass ich mich von Freunden und geselligen Aktiviäten zurücgezogen habe", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED19", data: ["zu dem sich mir immer wieder belastende Erinnerungen aufdrängen", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]}
        ]
    },
    PID5BF : {
        frame: "mchoice",//bleibt
        description: "PersönlichkeitsinventarfürDSM5",
        version: "1.0",//bleibt
        timeout: 5000, //bleibt
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt

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
                "möglich - wir werden Ihre Antworten vertraulich behandeln.<br>" + 
                "Nehmen Sie sich etwas Zeit, lesen Sie jede Aussage sorgfältig durch, " + 
                "und kreuzen Sie jeweils diejenig Antwort an, die Sie am besten beschreibt.", "start"]},
            { itemID: "PID5BF01", data: ["Andere würden mich als leichtsinnig beschreiben", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", data: ["Es kommt mir vor, as würde ich völlig impulsiv handeln", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
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
            { itemID: "PID5BF15", data: ["Ich bin shcnell von allen möglichen Dingen genervt", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", data: ["Zu viel Nähe zu anderen Menschen ist mir unangenehm", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", data: ["Es ist nichts dabei, wenn ich die Gefühle andere verletze", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", data: ["Ich bin selten von irgendetwas begeistert", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", data: ["Ich bin verrückt nach Aufmerksamkeit", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", data: ["Ich muss mich oft mit Leuten beschäftigen, die weniger wichtig sind als ich", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", data: ["Ich habe oft Gedanken, die für mich Sinn ergeben, aber anderen Leuten seltsam erscheinen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", data: ["Ich benutze Menschen, um zu beommen, was ich will", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", data: ["Ich vergesse häufig alles um mich herum, komme dann plötzlich zu mir, und stelle fest, dass viel Zeit vergangen ist", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", data: ["Die Dinge um mich herum fühlen sich oft unwirklich oder realer als sonst an", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", data: ["Es fällt mir leicht, andere ausznutzen", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },
    LPFSBF : {
        frame: "mchoice",//bleibt
        description: "LevelofPersonalityFunctioningScaleBriefForm",
        version: "1.0",//bleibt
        timeout: 5000, //bleibt
        timeRefractory: 1000,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt

        //common properties of all trials
        type: "LPFSBF",
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoLPFSBF", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte geben Sie für die folgenden Aussagen an,<br>inwieweit " + 
                "diese für Sie zutreffend sind", "start"]},
            { itemID: "LPFSBF01", data: ["Ich weiß oft nicht wer ich wirklich bin","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF02", data: ["Ich denke oft sehr schlecht über mich selbst", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF03", data: ["Meine Gefühle ändern sich, ohne dass ich sie im Griff habe","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF04", data: ["Ich habe keine Ahnung, wo ich im Leben hin will", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF05", data: ["Ich verstehe oft meine eigenen Gedanken und Gefühle nicht","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF06", data: ["Ich stelle oft unrealistische Anforderungen an mich selbst", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF07", data: ["Ich habe oft Schwierigkeiten, die Gedanen und Gefühle anderer zu verstehen","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF08", data: ["Ich kann es oft schwer aushalten, wenn andere eine andere Meinung haben", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF09", data: ["Ich verstehe oft nicht ganz warum mein Verhalten einen bestimmten Einfluss auf andere hat","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF10", data: ["Meine Beziehungen und Freundschaften halten nie lange", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF11", data: ["Ich fühle mich oft sehr verletzlich, wenn Beziehungen persönlicher werden","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF12", data: ["Es gelingt mir häufig nicht, mit anderen auf eine Weise zusammen zu arbeiten, die für beide Seiten zufriedenstellend sind", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    }

};
