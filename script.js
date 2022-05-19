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

    A special property 'options' contains an object that is attached as a property
    of the test, not of trials.

    The server listens at port 61666 and recognizes requests for tests when the 
    url starts with 'test:'. The required test or tests may be specified in the url 
    after this, e.g.
    http://safpsy186.psychiatrie3.uni-ulm.de:61666/test:SSTDepr
    Separate multiple tests with a comma. The tests are then given in order.

    This script files collects scales developed for HayStack so far.
    */


    SST_DarkPersonality_V1 : {			
        frame: "SST",
		description: "SST antisocial cognitions version 1",	
        version: "1.0",	
        timeout: 7500,
        timeRefractory: 400, 
        randomOrder: true,
        skipOutput: false,  

		trials: [
            //instruction
            { frame: "infopage", randomOrder: false, itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Ihnen werden immer sechs Kästchen nebeneinander präsentiert, die " +
                "Wörter in einer durcheinandergewürfelten Reihenfolge beinhalten. Aus diesen " + 
                "Wörtern können Sie verschiedene Sätze bilden. Für die Bildung eines Satzes brauchen Sie " +
                "nicht alle Wörter.<br><br>" +
                "Bilden Sie schnell im Kopf aus den Wörtern einen Satz und <b>klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen würden</b>. " +
                "Zum Beispiel: die Reihenfolge der Wörter könnte die folgende sein:<br><br>" + 
                "warten   wir   lange  können  sitzen   nun<br><br>" +
                "Wenn Sie den Satz 'wir können nun lange warten' im Kopf bilden, klicken Sie auf 'warten'; " + 
                "wenn Sie den Satz 'wir können nun lange sitzen' bilden, klicken Sie auf 'sitzen'.<br>" + 
                "Es gibt keinen richtigen oder falschen Satz, solange der Satz nach der Grammatik aufgebaut ist. " + 
                "Verwenden Sie dabei den ersten Satz, den Sie bilden können. " +
                "Nachdem Sie ein Wort angetippt haben, kommen Sie automatisch zum nächsten Satz oder zurück zum Spiel.<br><br>" + 
                "Bitte beachten Sie, dass Sie bei der Lösung der Aufgaben nur 7.5 Sek. Zeit pro Satz haben!<br><br>" +
                "Hinweis: Die nachfolgenden Durchläufe dienen ausschließlich der Übung.<br><br>" +
                "Wenn Sie bereit sind, klicken Sie bitte hier:", "Start"]},
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
                data: ["Die Übung ist jetzt zu Ende.<br>Klicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
            //actual test, neutral sentences, not in any block (always included) but randomized with rest
            { itemID: "N1r_V2_2PN", type: "N", data: ["gehört", "habe", "ich", "es", "mehrmals", "gesehen"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "N4r_V2_3PN", type: "N", data: ["Kinder", "im", "die", "spielen", "Wasser", "Sand"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "N6_V2_4PN",  type: "N", data: ["Motorrad ", "Fahrrad", "fahre", "dem", "mit", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "N30_V2_7PN", type: "N", data: ["bin", "draußen", "immer", "ich", "fast", "unterwegs"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "N10_V2_8PN", type: "N", data: ["Frühling ", "im", "Geburtstag", "mein", "Sommer", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            //actual test, mixed blocks, block 1
			{ itemID: "JC1A01", block: 1, type: "JUPNS", data: ["verstehen", "man", "kann", "Menschen", "leicht", "manipulieren"], pos: 1, neg: 6 },
			{ itemID: "JS1B02", block: 1, type: "JUPNS", data: ["ausbeuten", "schwächere", "kann", "Menschen", "man", "ermutigen"], pos: 6, neg: 1 },
			{ itemID: "JN2A03", block: 1, type: "JUPNS", data: ["nutzen", "Anführer", "Macht", "sollen", "ihre", "auskosten"], pos: 1, neg: 6 },
			{ itemID: "JC2B04", block: 1, type: "JUPNO", data: ["gesichert", "wird", "Macht", "am", "besten", "aufgeteilt"], pos: 6, neg: 1 },
			{ itemID: "JS3A05", block: 1, type: "JUPNS", data: ["andere", "der", "Stärkere", "kann", "aufheitern", "schikanieren"], pos: 5, neg: 6 },
			{ itemID: "JM3B06", block: 1, type: "JUPNS", data: ["schädigen", "andere", "zu", "ist", "unvermeidlich", "verboten"], pos: 6, neg: 5 },
			{ itemID: "JM4A07", block: 1, type: "JUPNO", data: ["erforderlich", "hinderlich", "bestehende", "sind", "oft", "Vorschriften"], pos: 1, neg: 2 },
			{ itemID: "JM4B08", block: 1, type: "JUPNO", data: ["individuell", "universal", "moralische", "sind", "meistens", "Standards"], pos: 2, neg: 1 },
			{ itemID: "JT5A09", block: 1, type: "JUPNO", data: ["ist", "unentbehrlich", "Moral", "überflüssig", "in", "Notzeiten"], pos: 2, neg: 4 },
			{ itemID: "JS5B10", block: 1, type: "JUPNS", data: ["die", "Verachtung", "Menschen", "Respekt", "meisten", "verdienen"], pos: 4, neg: 2 },
			{ itemID: "JS6A11", block: 1, type: "JUPNS", data: ["die", "sind", "beschäftigt", "meisten", "Versager", "sowieso"], pos: 3, neg: 5 },
			{ itemID: "JS6B12", block: 1, type: "JUPNS", data: ["einige", "Gruppen", "überlegen", "anderen", "ebenbürtig", "sind"], pos: 5, neg: 3 },
			{ itemID: "JM7A13", block: 1, type: "JUPNO", data: ["Entscheidungen", "kulturell", "über", "Moral", "sind", "persönlich"], pos: 2, neg: 6 },
			{ itemID: "JA7B14", block: 1, type: "JUPNS", data: ["anderen", "einfältig", "zu", "folgen", "ist", "intelligent"], pos: 6, neg: 2 },
			{ itemID: "JC8A15", block: 1, type: "JUPNS", data: ["nett", "anderen", "helfen", "zu", "dumm", "ist"], pos: 1, neg: 5 },
			{ itemID: "JT8B16", block: 1, type: "JUPNO", data: ["erfunden", "Erzählungen", "Ehrlichkeit", "über", "inspirierend", "sind"], pos: 5, neg: 1 },
			{ itemID: "JT9A17", block: 1, type: "JUPNO", data: ["ethische", "Grenzen", "sind", "Erfindung", "eine", "Notwendigkeit"], pos: 6, neg: 4 },
			{ itemID: "JS9B18", block: 1, type: "JUPNS", data: ["Menschen", "schwache", "sind", "gemein", "weniger", "wert"], pos: 4, neg: 6 },
			{ itemID: "JC10A19", block: 1, type: "JUPNS", data: ["blödsinnig", "für", "bewundernswert", "Charities", "spenden", "ist"], pos: 3, neg: 1 },
			{ itemID: "JC10B20", block: 1, type: "JUPNS", data: ["andere", "Menschen", "sich", "meistens", "achten", "auf"], pos: 1, neg: 3 },
			{ itemID: "JC1A21", block: 1, type: "JUPNS", data: ["großzügig", "an", "Hilfsorganisationen", "spenden", "ist", "blauäugig"], pos: 1, neg: 6 },
			{ itemID: "H1B01", block: 1, type: "HUPNS", data: ["idiotisch", "Dinge", "zu", "teilen", "ist", "schön"], pos: 6, neg: 1 },
			{ itemID: "H2A02", block: 1, type: "HUPNS", data: ["lobenswert", "findet", "Hilfsorganisationen", "Tim", "heutzutage", "sinnlos"], pos: 1, neg: 6 },
			{ itemID: "H2B03", block: 1, type: "HUPNS", data: ["herablassend", "Tim", "behandelt", "andere", "immer", "freundlich"], pos: 6, neg: 1 },	
			{ itemID: "H3A04", block: 1, type: "HUPNO", data: ["Raub", "als", "Einkommensquelle", "ist", "ungerecht", "klug"], pos: 5, neg: 6 },
			{ itemID: "H3B05", block: 1, type: "HUPNS", data: ["Freund", "Tim", "wird", "seinen", "ausnutzen", "bestärken"], pos: 6, neg: 5 },
			{ itemID: "H4A06", block: 1, type: "HUPNS", data: ["armselig", "spannend", "andere", "zu", "ist", "ärgern"], pos: 1, neg: 2 },
			{ itemID: "H4B07", block: 1, type: "HUPNS", data: ["geprügelt", "getröstet", "der", "kleine", "wird", "Tim"], pos: 2, neg: 1 },
			{ itemID: "H5A08", block: 1, type: "HUPNS", data: ["wurde", "geküsst", "Tim", "geschlagen", "bereits", "mehrmals"], pos: 2, neg: 4 },
			{ itemID: "H5B09", block: 1, type: "HUPNS", data: ["anvertraute", "einsetzen", "Geheimnisse", "behüten", "kann", "man"], pos: 4, neg: 2 },
			{ itemID: "H6A10", block: 1, type: "HUPNS", data: ["der", "kleine", "gelobt", "Tim", "verhauen", "wird"], pos: 3, neg: 5 },
			{ itemID: "H6B11", block: 1, type: "HUPNO", data: ["im", "Sport", "spektakulär", "Fouls", "ungerecht", "sind"], pos: 5, neg: 3 },
			{ itemID: "H7A12", block: 1, type: "HUPNS", data: ["absichtlich", "gestreichelt", "wird", "Hund", "der", "getreten"], pos: 2, neg: 6 },
			{ itemID: "H7B13", block: 1, type: "HUPNS", data: ["langsam", "gequält", "wird", "Tier", "das", "gefüttert"], pos: 6, neg: 2 },
			{ itemID: "H8A14", block: 1, type: "HUPNS", data: ["ekelhaft", "über", "Scherze", "andere", "spaßig", "sind"], pos: 1, neg: 5 },	
			{ itemID: "H8B15", block: 1, type: "HUPNS", data: ["lustig", "andere", "verspotten", "zu", "unzulänglich", "ist"], pos: 5, neg: 1 },
			{ itemID: "H9A16", block: 1, type: "HUPNS", data: ["im", "sieht", "Fernsehen", "Boxkämpfe", "Tim", "Tennis"], pos: 6, neg: 4 },
			{ itemID: "H9B17", block: 1, type: "HUPNS", data: ["für", "spenden", "Waisen", "wichtig", "ist", "nutzlos"], pos: 4, neg: 6 },
			{ itemID: "H10A18", block: 1, type: "HUPNS", data: ["aufregend", "andere", "beunruhigend", "zu", "verletzen", "ist"], pos: 3, neg: 1 },
			{ itemID: "H10B19", block: 1, type: "HUPNS", data: ["böse", "von", "schlau", "anderen", "profitieren", "ist"], pos: 1, neg: 3 },
			{ itemID: "H1A20", block: 1, type: "HUPNS", data: ["trösten", "Tim", "wird", "Menschen", "notleidende", "ignorieren"], pos: 1, neg: 6 },																			
			{ itemID: "H1B21", block: 1, type: "HUPNS", data: ["verletzen", "Tim", "möchte", "Menschen", "andere", "unterstützen"], pos: 6, neg: 1 },
			{ itemID: "H2A22", block: 1, type: "HUPNS", data: ["lachen", "andere", "Menschen", "sollen", "oft", "leiden"], pos: 1, neg: 6 },
			{ itemID: "H2B23", block: 1, type: "HUPNO", data: ["hilfreich", "Anerkennung", "Unverdientes", "für", "ist", "falsch"], pos: 6, neg: 1 }	
			
        ]
    },

    LPFSBF : {
        frame: "mchoice",//bleibt
        description: "LevelofPersonalityFunctioningScaleBriefForm",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 200,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 1,

        //common properties of all trials
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoLPFSBF", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte geben Sie für die folgenden Aussagen an,<br>inwieweit " + 
                    "diese für Sie zutreffend sind.", "start"],
                footerText: "Hinweis: Bevor Sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "LPFSBF01", type: "self", data: ["Ich weiß oft nicht wer ich wirklich bin.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF02", type: "self", data: ["Ich denke oft sehr schlecht über mich selbst.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF03", type: "self", data: ["Meine Gefühle ändern sich, ohne dass ich sie im Griff habe.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF04", type: "self", data: ["Ich habe keine Ahnung, wo ich im Leben hin will.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF05", type: "self", data: ["Ich verstehe oft meine eigenen Gedanken und Gefühle nicht.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF06", type: "self", data: ["Ich stelle oft unrealistische Anforderungen an mich selbst.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF07", type: "interpersonal", data: ["Ich habe oft Schwierigkeiten, die Gedanken und Gefühle anderer zu verstehen.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF08", type: "interpersonal", data: ["Ich kann es oft schwer aushalten, wenn andere eine andere Meinung haben.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF09", type: "interpersonal", data: ["Ich verstehe oft nicht ganz warum mein Verhalten einen bestimmten Einfluss auf andere hat.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF10", type: "interpersonal", data: ["Meine Beziehungen und Freundschaften halten nie lange.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF11", type: "interpersonal", data: ["Ich fühle mich oft sehr verletzlich, wenn Beziehungen persönlicher werden.","trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF12", type: "interpersonal", data: ["Es gelingt mir häufig nicht, mit anderen auf eine Weise zusammen zu arbeiten, die für beide Seiten zufriedenstellend ist.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },

    ADS : {
        frame: "mchoice",//bleibt
        description: "Allgemeine Depressionsskala",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 200,//bleibt
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
            { itemID: "ADS01", data: ["Während der letzten Wochen...<br><br>...haben mich Dinge beunruhigt die mir sonst nichts ausmachen.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS02", data: ["Während der letzten Wochen...<br><br>...hatte ich kaum Appetit.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS03", data: ["Während der letzten Wochen...<br><br>...konnte ich meine trübsinnige Laune nicht loswerden, obwohl meine Freunde oder Familie versuchten, mich aufzumuntern.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS04", polarity: -1, data: ["Während der letzten Wochen...<br><br>...kam ich mir genauso gut vor wie andere.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS05", data: ["Während der letzten Wochen...<br><br>...hatte ich Mühe, mich zu konzentrieren.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS06", data: ["Während der letzten Wochen...<br><br>...war ich deprimiert / niedergeschlagen.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS07", data: ["Während der letzten Wochen...<br><br>...war alles anstrengend für mich.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS08", polarity: -1, data: ["Während der letzten Wochen...<br><br>...dachte ich voller Hoffnung an die Zukunft.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS09", data: ["Während der letzten Wochen...<br><br>...dachte ich, mein Leben ist ein einziger Fehlschlag.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS10", data: ["Während der letzten Wochen...<br><br>...hatte ich Angst.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS11", data: ["Während der letzten Wochen...<br><br>...habe ich schlecht geschlafen.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS12", polarity: -1, data: ["Während der letzten Wochen...<br><br>...war ich fröhlich gestimmt.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS13", data: ["Während der letzten Wochen...<br><br>...habe ich weniger als sonst geredet.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS14", data: ["Während der letzten Wochen...<br><br>...fühlte ich mich einsam.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS15", data: ["Während der letzten Wochen...<br><br>...waren die Leute unfreundlich zu mir.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS16", polarity: -1, data: ["Während der letzten Wochen...<br><br>...habe ich das Leben genossen.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS17", data: ["Während der letzten Wochen...<br><br>...musste ich weinen.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS18", data: ["Während der letzten Wochen...<br><br>...war ich traurig.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS19", data: ["Während der letzten Wochen...<br><br>...hatte ich das Gefühl, dass mich die Leute nicht leiden können.", "selten", "manchmal", "öfters", "meistens"]},
            { itemID: "ADS20", data: ["Während der letzten Wochen...<br><br>...konnte ich mich zu nichts aufraffen.", "selten", "manchmal", "öfters", "meistens"]}
        ]
    },

    PID5BF34 : {
        frame: "mchoice",//bleibt
        description: "Personality inventory for DSM5, 34 items",
        version: "1.0",//bleibt
        timeout: 0, //No timeout
        timeRefractory: 200,//bleibt
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
                    "und kreuzen Sie jeweils diejenige Antwort an, die Sie am besten beschreibt.", "start"],
                footerText: "Hinweis: Bevor Sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PID5BF01", type: "negaffect",     data: ["Ich reagiere viel emotionaler als fast alle anderen Menschen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", type: "antagonism",    data: ["Ich bin gut darin, Leute reinzulegen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF03", type: "disinhibition", data: ["Ich gehe oft ziemlich nachlässig mit meinen Sachen und denen anderer um.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF04", type: "detachment",    data: ["Ich halte Abstand zu Menschen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF05", type: "psychoticism",  data: ["Ich sehe zwischen den Dingen oft ungewöhnliche Zusammenhänge, die anderen Menschen entgehen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF06", type: "anancasm",      data: ["Ich gehe Dinge immer auf die gleiche Weise an, auch wenn es so nicht funktioniert.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF07", type: "negaffect",     data: ["Ich mache mir ständig über irgendetwas Sorgen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF08", type: "antagonism",    data: ["Manchmal muss man vor anderen übertreiben, um weiterzukommen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF09", type: "disinhibition", data: ["Es kommt mir vor, als würde ich völlig impulsiv handeln.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF10", type: "detachment",    data: ["Nichts scheint mich wirklich zu interessieren.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF11", type: "psychoticism",  data: ["Man hat mir gesagt, dass meine Art zu denken wirklich seltsam ist.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF12", type: "anancasm",      data: ["Auch wenn es andere zum Wahnsinn treibt, bestehe ich darauf, alles perfekt zu machen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF13", type: "negaffect",     data: ["Ich mache mir viele Sorgen darüber, allein zu sein.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF14", type: "antagonism",    data: ["Es steht mir zu, besonders behandelt zu werden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF15", type: "disinhibition", data: ["Ich verliere in Gesprächen den Faden, weil mich andere Dinge ablenken.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", type: "detachment",    data: ["Ich halte romantische Gefühle lieber aus meinem Leben heraus.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", type: "psychoticism",  data: ["Es ist komisch, aber manchmal kommen mir alltägliche Gegenstände anders vor als sonst.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", type: "anancasm",      data: ["Ich halte an einer bestimmten Herangehensweise fest, auch wenn klar ist, dass es so nicht funktionieren wird.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", type: "negaffect",     data: ["Ich werde schnell emotional, oft aus geringstem Anlass.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", type: "antagonism",    data: ["Es fällt mir leicht, andere auszunutzen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", type: "disinhibition", data: ["Ich vergesse oft, meine Rechnungen zu bezahlen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", type: "detachment",    data: ["Ich mag es nicht, Zeit mit anderen zu verbringen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", type: "psychoticism",  data: ["Ich hatte einige wirklich seltsame Erlebnisse, die sehr schwer zu erklären sind.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", type: "anancasm",      data: ["Ich versuche Dinge weiter zu perfektionieren, auch wenn ich sie wahrscheinlich schon so gut wie möglich hinbekommen habe.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", type: "negaffect",     data: ["Ich mache mir über fast alles Sorgen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF26", type: "antagonism",    data: ["Ich biege mir die Wahrheit zurecht, wenn es zu meinem Vorteil ist.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF27", type: "disinhibition", data: ["Obwohl ich es eigentlich besser weiß, treffe ich immer wieder überstürzte Entscheidungen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF28", type: "detachment",    data: ["Ich bin selten von irgendetwas begeistert.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF29", type: "psychoticism",  data: ["Ich habe mehrere Angewohnheiten, die andere exzentrisch oder seltsam finden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF30", type: "negaffect",     data: ["Ich ertrage es nicht, allein gelassen zu werden – nicht mal für ein paar Stunden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF31", type: "antagonism",    data: ["Ich muss mich oft mit Leuten beschäftigen, die weniger wichtig sind als ich.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF32", type: "disinhibition", data: ["Ich lasse mich leicht ablenken.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF33", type: "detachment",    data: ["Ich beende Beziehungen, wenn sie enger werden.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF34", type: "psychoticism",  data: ["Wenn ich einen vertrauten Gegenstand anschaue, ist es manchmal so, als würde ich ihn zum ersten Mal sehen.", "trifft überhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
        ]
    },

   SD4 : {
        frame: "mchoice",//bleibt
        description: "Short Dark Tetrad Scale",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 200,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 1,

        //common properties of all trials
        polarity: 1,//bleibt
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoSD4", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Bitte geben Sie für die folgenden Aussagen an,<br>inwieweit " + 
                    "diese für Sie zutreffend sind.", "start"],
                footerText: "Hinweis: Bevor Sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "SD401", type: "Mach", data: ["Es ist nicht ratsam, seine Geheimnisse preiszugeben.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD402", type: "Mach", data: ["Man muss die wichtigen Personen auf seine Seite ziehen, koste es, was es wolle.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD403", type: "Mach", data: ["Vermeide direkte Konflikte mit Anderen, denn sie könnten in der Zukunft von Nutzen sein.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD404", type: "Mach", data: ["Verhalte dich unauffällig, wenn du deinen Willen durchsetzen willst.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD405", type: "Mach", data: ["Die Situation zu manipulieren, erfordert Planung.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD406", type: "Mach", data: ["Schmeicheln ist ein gutes Mittel, um Leute auf deine Seite zu ziehen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD407", type: "Mach", data: ["Ich liebe es, wenn ein kniffliger Plan gelingt.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD408", type: "Narc", data: ["Andere sehen mich als geborene Führungsperson.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD409", type: "Narc", data: ["Ich habe eine einzigartige Begabung, andere zu überzeugen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD410", type: "Narc", data: ["Gruppenaktivitäten sind ohne mich eher langweilig.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD411", type: "Narc", data: ["Ich weiß, dass ich etwas Besonderes bin, da mir andere das immer wieder sagen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD412", type: "Narc", data: ["Ich habe einige außergewöhnliche Qualitäten.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD413", type: "Narc", data: ["Ich werde in der Zukunft wahrscheinlich ein Star in einem bestimmten Bereich sein.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD414", type: "Narc", data: ["Ich mag es, hin und wieder anzugeben.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD415", type: "Psyc", data: ["Menschen sagen oft, dass ich außer Kontrolle bin.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD416", type: "Psyc", data: ["Ich neige dazu, gegen Autoritäten und deren Regeln zu kämpfen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD417", type: "Psyc", data: ["Ich war in mehr Auseinandersetzungen verwickelt als die meisten Menschen meines Alters und Geschlechts.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD418", type: "Psyc", data: ["Ich neige dazu, mich kopfüber in etwas zu stürzen ohne Fragen zu stellen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD419", type: "Psyc", data: ["Ich hatte schon Schwierigkeiten mit dem Gesetz.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD420", type: "Psyc", data: ["Ich gerate manchmal in gefährliche Situationen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD421", type: "Psyc", data: ["Leute, die sich mit mir anlegen, bereuen es immer","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD422", type: "Sad", data: ["Bei einem Faustkampf zuzuschauen begeistert mich.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD423", type: "Sad", data: ["Ich genieße gewalttätige Filme und Computerspiele.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD424", type: "Sad", data: ["Es ist witzig, wenn Idioten auf die Nase fallen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD425", type: "Sad", data: ["Ich genieße es, bei gewalttätigem Sport zuzuschauen.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD426", type: "Sad", data: ["Manche Menschen verdienen es zu leiden.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD427", type: "Sad", data: ["Rein zum Vergnügen habe ich schonmal gemeine Dinge in sozialen Medien gesagt.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD428", type: "Sad", data: ["Ich weiß, wie ich jemanden allein mit Worten verletzen kann.","stimme überhaupt nicht zu", "2", "3", "4", "stimme voll zu"]}
        ]
    }, 


    Ukraine : {
        frame: "mchoice",
        description: "Fragen zur Erschütterung durch das Weltgeschehen",
        version: "2.0",
        timeout: 0, 
        timeRefractory: 1000,
        randomOrder: false,
        skipOutput: false,
        baselineScore: -1,

        //common properties of all trials
        type: "worldevents",
        polarity: -1,
        trials: [
            { frame: "infopage", randomOrder: false, itemID: "instrUkraine", type: "info", timeout: 0,
                data: ["Fast geschafft.<br>Es folgen nun noch wenige Fragen zur aktuellen Situation in der Welt."]},
            { itemID: "weltgeschehen1", data: ["Fühlen Sie sich von der aktuellen Situation in der Ukraine bedroht?", "Ja", "Nein", "Möchte nicht antworten"]},
            { itemID: "weltgeschehen2", data: ["Sind Sie oder eine nahestehende Person betroffen?", "Ja", "Nein", "Möchte nicht antworten"]},
            { itemID: "weltgeschehen3", data: ["Fühlen Sie sich vom Klimawandel bedroht?", "Ja", "Nein", "Möchte nicht antworten"]},
            { itemID: "weltgeschehen4", data: ["Sind Sie oder eine nahestehende Person betroffen?", "Ja", "Nein", "Möchte nicht antworten"]},
            { itemID: "weltgeschehen5", data: ["Fühlen Sie sich von der Corona-Pandemie bedroht?", "Ja", "Nein", "Möchte nicht antworten"]},
            { itemID: "weltgeschehen6", data: ["Sind Sie oder eine nahestehende Person aktuell betroffen?", "Ja", "Nein", "Möchte nicht antworten"]}
        ]
    }

};
