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
                data: ["Ihnen werden immer sechs K??stchen nebeneinander pr??sentiert, die " +
                "W??rter in einer durcheinandergew??rfelten Reihenfolge beinhalten. Aus diesen " + 
                "W??rtern k??nnen Sie verschiedene S??tze bilden. F??r die Bildung eines Satzes brauchen Sie " +
                "nicht alle W??rter.<br><br>" +
                "Bilden Sie schnell im Kopf aus den W??rtern einen Satz und <b>klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen w??rden</b>. " +
                "Zum Beispiel: die Reihenfolge der W??rter k??nnte die folgende sein:<br><br>" + 
                "warten   wir   lange  k??nnen  sitzen   nun<br><br>" +
                "Wenn Sie den Satz 'wir k??nnen nun lange warten' im Kopf bilden, klicken Sie auf 'warten'; " + 
                "wenn Sie den Satz 'wir k??nnen nun lange sitzen' bilden, klicken Sie auf 'sitzen'.<br>" + 
                "Es gibt keinen richtigen oder falschen Satz, solange der Satz nach der Grammatik aufgebaut ist. " + 
                "Verwenden Sie dabei den ersten Satz, den Sie bilden k??nnen. " +
                "Nachdem Sie ein Wort angetippt haben, kommen Sie automatisch zum n??chsten Satz oder zur??ck zum Spiel.<br><br>" + 
                "Bitte beachten Sie, dass Sie bei der L??sung der Aufgaben nur 7.5 Sek. Zeit pro Satz haben!<br><br>" +
                "Hinweis: Die nachfolgenden Durchl??ufe dienen ausschlie??lich der ??bung.<br><br>" +
                "Wenn Sie bereit sind, klicken Sie bitte hier:", "Start"]},
            //practice trials. Override timeout and remove it. Override skipOutput.
            { randomOrder: false, skipOutput: true, itemID: "Pr01", type: "AP", timeout: 0,
                data: ["warten", "wir", "lange", "k??nnen", "sitzen", "nun"], polarity: -1, pos: 1, neg: 5 },
            { randomOrder: false, skipOutput: true, itemID: "Pr02", type: "AP", timeout: 0,
                data: ["werde", "Ich", "Post", "Haltestelle", "zur", "gehen"], polarity: -1, pos: 3, neg: 4},
            { frame: "infopage", randomOrder: false, itemID: "instructtimeout", type: "info", timeout: 0,
                data: ["Man hat in dem Test 7.5 Sek. um zu antworten.<br>Ab jetzt auch in der ??bung.", "weiter"]},
            { randomOrder: false, skipOutput: true, itemID: "Pr03", type: "AP",
                data: ["Tisch", "Anna", "auf", "sitzt", "dem", "Stuhl"], polarity: -1, pos: 1, neg: 6 },
            { randomOrder: false, skipOutput: true, itemID: "Pr04", type: "AP",
                data: ["Hosen", "blau", "sind", "seine", "schwarz", "alle"], polarity: -1, pos: 2, neg: 4 },
            { frame: "infopage", randomOrder: false, itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die ??bung ist jetzt zu Ende.<br>Klicken Sie auf 'start' um mit dem Test anzufangen.", "start"]},
            //actual test, neutral sentences, not in any block (always included) but randomized with rest
            { itemID: "N1r_V2_2PN", type: "N", data: ["geh??rt", "habe", "ich", "es", "mehrmals", "gesehen"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "N4r_V2_3PN", type: "N", data: ["Kinder", "im", "die", "spielen", "Wasser", "Sand"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "N6_V2_4PN",  type: "N", data: ["Motorrad ", "Fahrrad", "fahre", "dem", "mit", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "N30_V2_7PN", type: "N", data: ["bin", "drau??en", "immer", "ich", "fast", "unterwegs"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "N10_V2_8PN", type: "N", data: ["Fr??hling ", "im", "Geburtstag", "mein", "Sommer", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            //actual test, mixed blocks, block 1
			{ itemID: "JC1A01", block: 1, type: "JUPNS", data: ["verstehen", "man", "kann", "Menschen", "leicht", "manipulieren"], pos: 1, neg: 6 },
			{ itemID: "JS1B02", block: 1, type: "JUPNS", data: ["ausbeuten", "schw??chere", "kann", "Menschen", "man", "ermutigen"], pos: 6, neg: 1 },
			{ itemID: "JN2A03", block: 1, type: "JUPNS", data: ["nutzen", "Anf??hrer", "Macht", "sollen", "ihre", "auskosten"], pos: 1, neg: 6 },
			{ itemID: "JC2B04", block: 1, type: "JUPNO", data: ["gesichert", "wird", "Macht", "am", "besten", "aufgeteilt"], pos: 6, neg: 1 },
			{ itemID: "JS3A05", block: 1, type: "JUPNS", data: ["andere", "der", "St??rkere", "kann", "aufheitern", "schikanieren"], pos: 5, neg: 6 },
			{ itemID: "JM3B06", block: 1, type: "JUPNS", data: ["sch??digen", "andere", "zu", "ist", "unvermeidlich", "verboten"], pos: 6, neg: 5 },
			{ itemID: "JM4A07", block: 1, type: "JUPNO", data: ["erforderlich", "hinderlich", "bestehende", "sind", "oft", "Vorschriften"], pos: 1, neg: 2 },
			{ itemID: "JM4B08", block: 1, type: "JUPNO", data: ["individuell", "universal", "moralische", "sind", "meistens", "Standards"], pos: 2, neg: 1 },
			{ itemID: "JT5A09", block: 1, type: "JUPNO", data: ["ist", "unentbehrlich", "Moral", "??berfl??ssig", "in", "Notzeiten"], pos: 2, neg: 4 },
			{ itemID: "JS5B10", block: 1, type: "JUPNS", data: ["die", "Verachtung", "Menschen", "Respekt", "meisten", "verdienen"], pos: 4, neg: 2 },
			{ itemID: "JS6A11", block: 1, type: "JUPNS", data: ["die", "sind", "besch??ftigt", "meisten", "Versager", "sowieso"], pos: 3, neg: 5 },
			{ itemID: "JS6B12", block: 1, type: "JUPNS", data: ["einige", "Gruppen", "??berlegen", "anderen", "ebenb??rtig", "sind"], pos: 5, neg: 3 },
			{ itemID: "JM7A13", block: 1, type: "JUPNO", data: ["Entscheidungen", "kulturell", "??ber", "Moral", "sind", "pers??nlich"], pos: 2, neg: 6 },
			{ itemID: "JA7B14", block: 1, type: "JUPNS", data: ["anderen", "einf??ltig", "zu", "folgen", "ist", "intelligent"], pos: 6, neg: 2 },
			{ itemID: "JC8A15", block: 1, type: "JUPNS", data: ["nett", "anderen", "helfen", "zu", "dumm", "ist"], pos: 1, neg: 5 },
			{ itemID: "JT8B16", block: 1, type: "JUPNO", data: ["erfunden", "Erz??hlungen", "Ehrlichkeit", "??ber", "inspirierend", "sind"], pos: 5, neg: 1 },
			{ itemID: "JT9A17", block: 1, type: "JUPNO", data: ["ethische", "Grenzen", "sind", "Erfindung", "eine", "Notwendigkeit"], pos: 6, neg: 4 },
			{ itemID: "JS9B18", block: 1, type: "JUPNS", data: ["Menschen", "schwache", "sind", "gemein", "weniger", "wert"], pos: 4, neg: 6 },
			{ itemID: "JC10A19", block: 1, type: "JUPNS", data: ["bl??dsinnig", "f??r", "bewundernswert", "Charities", "spenden", "ist"], pos: 3, neg: 1 },
			{ itemID: "JC10B20", block: 1, type: "JUPNS", data: ["andere", "Menschen", "sich", "meistens", "achten", "auf"], pos: 1, neg: 3 },
			{ itemID: "JC1A21", block: 1, type: "JUPNS", data: ["gro??z??gig", "an", "Hilfsorganisationen", "spenden", "ist", "blau??ugig"], pos: 1, neg: 6 },
			{ itemID: "H1B01", block: 1, type: "HUPNS", data: ["idiotisch", "Dinge", "zu", "teilen", "ist", "sch??n"], pos: 6, neg: 1 },
			{ itemID: "H2A02", block: 1, type: "HUPNS", data: ["lobenswert", "findet", "Hilfsorganisationen", "Tim", "heutzutage", "sinnlos"], pos: 1, neg: 6 },
			{ itemID: "H2B03", block: 1, type: "HUPNS", data: ["herablassend", "Tim", "behandelt", "andere", "immer", "freundlich"], pos: 6, neg: 1 },	
			{ itemID: "H3A04", block: 1, type: "HUPNO", data: ["Raub", "als", "Einkommensquelle", "ist", "ungerecht", "klug"], pos: 5, neg: 6 },
			{ itemID: "H3B05", block: 1, type: "HUPNS", data: ["Freund", "Tim", "wird", "seinen", "ausnutzen", "best??rken"], pos: 6, neg: 5 },
			{ itemID: "H4A06", block: 1, type: "HUPNS", data: ["armselig", "spannend", "andere", "zu", "ist", "??rgern"], pos: 1, neg: 2 },
			{ itemID: "H4B07", block: 1, type: "HUPNS", data: ["gepr??gelt", "getr??stet", "der", "kleine", "wird", "Tim"], pos: 2, neg: 1 },
			{ itemID: "H5A08", block: 1, type: "HUPNS", data: ["wurde", "gek??sst", "Tim", "geschlagen", "bereits", "mehrmals"], pos: 2, neg: 4 },
			{ itemID: "H5B09", block: 1, type: "HUPNS", data: ["anvertraute", "einsetzen", "Geheimnisse", "beh??ten", "kann", "man"], pos: 4, neg: 2 },
			{ itemID: "H6A10", block: 1, type: "HUPNS", data: ["der", "kleine", "gelobt", "Tim", "verhauen", "wird"], pos: 3, neg: 5 },
			{ itemID: "H6B11", block: 1, type: "HUPNO", data: ["im", "Sport", "spektakul??r", "Fouls", "ungerecht", "sind"], pos: 5, neg: 3 },
			{ itemID: "H7A12", block: 1, type: "HUPNS", data: ["absichtlich", "gestreichelt", "wird", "Hund", "der", "getreten"], pos: 2, neg: 6 },
			{ itemID: "H7B13", block: 1, type: "HUPNS", data: ["langsam", "gequ??lt", "wird", "Tier", "das", "gef??ttert"], pos: 6, neg: 2 },
			{ itemID: "H8A14", block: 1, type: "HUPNS", data: ["ekelhaft", "??ber", "Scherze", "andere", "spa??ig", "sind"], pos: 1, neg: 5 },	
			{ itemID: "H8B15", block: 1, type: "HUPNS", data: ["lustig", "andere", "verspotten", "zu", "unzul??nglich", "ist"], pos: 5, neg: 1 },
			{ itemID: "H9A16", block: 1, type: "HUPNS", data: ["im", "sieht", "Fernsehen", "Boxk??mpfe", "Tim", "Tennis"], pos: 6, neg: 4 },
			{ itemID: "H9B17", block: 1, type: "HUPNS", data: ["f??r", "spenden", "Waisen", "wichtig", "ist", "nutzlos"], pos: 4, neg: 6 },
			{ itemID: "H10A18", block: 1, type: "HUPNS", data: ["aufregend", "andere", "beunruhigend", "zu", "verletzen", "ist"], pos: 3, neg: 1 },
			{ itemID: "H10B19", block: 1, type: "HUPNS", data: ["b??se", "von", "schlau", "anderen", "profitieren", "ist"], pos: 1, neg: 3 },
			{ itemID: "H1A20", block: 1, type: "HUPNS", data: ["tr??sten", "Tim", "wird", "Menschen", "notleidende", "ignorieren"], pos: 1, neg: 6 },																			
			{ itemID: "H1B21", block: 1, type: "HUPNS", data: ["verletzen", "Tim", "m??chte", "Menschen", "andere", "unterst??tzen"], pos: 6, neg: 1 },
			{ itemID: "H2A22", block: 1, type: "HUPNS", data: ["lachen", "andere", "Menschen", "sollen", "oft", "leiden"], pos: 1, neg: 6 },
			{ itemID: "H2B23", block: 1, type: "HUPNO", data: ["hilfreich", "Anerkennung", "Unverdientes", "f??r", "ist", "falsch"], pos: 6, neg: 1 }	
			
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
                data: ["Bitte geben Sie f??r die folgenden Aussagen an,<br>inwieweit " + 
                    "diese f??r Sie zutreffend sind.", "start"],
                footerText: "Hinweis: Bevor Sie mit der n??chsten " + 
                    "Aufgabe beginnen, k??nnen Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "LPFSBF01", type: "self", data: ["Ich wei?? oft nicht wer ich wirklich bin.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF02", type: "self", data: ["Ich denke oft sehr schlecht ??ber mich selbst.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF03", type: "self", data: ["Meine Gef??hle ??ndern sich, ohne dass ich sie im Griff habe.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF04", type: "self", data: ["Ich habe keine Ahnung, wo ich im Leben hin will.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF05", type: "self", data: ["Ich verstehe oft meine eigenen Gedanken und Gef??hle nicht.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF06", type: "self", data: ["Ich stelle oft unrealistische Anforderungen an mich selbst.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF07", type: "interpersonal", data: ["Ich habe oft Schwierigkeiten, die Gedanken und Gef??hle anderer zu verstehen.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF08", type: "interpersonal", data: ["Ich kann es oft schwer aushalten, wenn andere eine andere Meinung haben.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF09", type: "interpersonal", data: ["Ich verstehe oft nicht ganz warum mein Verhalten einen bestimmten Einfluss auf andere hat.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF10", type: "interpersonal", data: ["Meine Beziehungen und Freundschaften halten nie lange.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF11", type: "interpersonal", data: ["Ich f??hle mich oft sehr verletzlich, wenn Beziehungen pers??nlicher werden.","trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "LPFSBF12", type: "interpersonal", data: ["Es gelingt mir h??ufig nicht, mit anderen auf eine Weise zusammen zu arbeiten, die f??r beide Seiten zufriedenstellend ist.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
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
                data: ["Im Folgenden geht es um Ihre Stimmung w??hrend der letzten Wochen. " + 
                "Bitte kreuzen Sie bei allen folgenden Aussagen jeweils die Antwort an, " + 
                "die Ihrem Befinden w??hrend der letzen Wochen am besten entspricht/entsprochen " + 
                "hat. Die m??glichen Antworten sind hierbei:<br><br>0 selten oder ??berhaupt nicht " + 
                "(weniger als 1 Tag)<br>1 manchmal (1 bis 2 Tage lang)<br>2 ??fters (3 bis 4 Tage " + 
                "lang)<br>3 meistens, die ganze Zeit (5 bis 7 Tage lang)", "start"]}, //anpassen Instruktionen
            { itemID: "ADS01", data: ["W??hrend der letzten Wochen...<br><br>...haben mich Dinge beunruhigt die mir sonst nichts ausmachen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS02", data: ["W??hrend der letzten Wochen...<br><br>...hatte ich kaum Appetit.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS03", data: ["W??hrend der letzten Wochen...<br><br>...konnte ich meine tr??bsinnige Laune nicht loswerden, obwohl meine Freunde oder Familie versuchten, mich aufzumuntern.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS04", polarity: -1, data: ["W??hrend der letzten Wochen...<br><br>...kam ich mir genauso gut vor wie andere.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS05", data: ["W??hrend der letzten Wochen...<br><br>...hatte ich M??he, mich zu konzentrieren.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS06", data: ["W??hrend der letzten Wochen...<br><br>...war ich deprimiert / niedergeschlagen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS07", data: ["W??hrend der letzten Wochen...<br><br>...war alles anstrengend f??r mich.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS08", polarity: -1, data: ["W??hrend der letzten Wochen...<br><br>...dachte ich voller Hoffnung an die Zukunft.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS09", data: ["W??hrend der letzten Wochen...<br><br>...dachte ich, mein Leben ist ein einziger Fehlschlag.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS10", data: ["W??hrend der letzten Wochen...<br><br>...hatte ich Angst.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS11", data: ["W??hrend der letzten Wochen...<br><br>...habe ich schlecht geschlafen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS12", polarity: -1, data: ["W??hrend der letzten Wochen...<br><br>...war ich fr??hlich gestimmt.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS13", data: ["W??hrend der letzten Wochen...<br><br>...habe ich weniger als sonst geredet.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS14", data: ["W??hrend der letzten Wochen...<br><br>...f??hlte ich mich einsam.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS15", data: ["W??hrend der letzten Wochen...<br><br>...waren die Leute unfreundlich zu mir.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS16", polarity: -1, data: ["W??hrend der letzten Wochen...<br><br>...habe ich das Leben genossen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS17", data: ["W??hrend der letzten Wochen...<br><br>...musste ich weinen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS18", data: ["W??hrend der letzten Wochen...<br><br>...war ich traurig.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS19", data: ["W??hrend der letzten Wochen...<br><br>...hatte ich das Gef??hl, dass mich die Leute nicht leiden k??nnen.", "selten", "manchmal", "??fters", "meistens"]},
            { itemID: "ADS20", data: ["W??hrend der letzten Wochen...<br><br>...konnte ich mich zu nichts aufraffen.", "selten", "manchmal", "??fters", "meistens"]}
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
                    "sich Menschen selbst beschreiben k??nnen. Wir interessieren uns " + 
                    "daf??r, wie Sie sich selbst beschreiben w??rden. Es gibt keine richtigen " + 
                    "oder falschen Antworten. Bitte beschreiben Sie sich so ehrlich wie " + 
                    "m??glich - wir werden Ihre Antworten vertraulich behandeln.<br><br>" + 
                    "Nehmen Sie sich etwas Zeit, lesen Sie jede Aussage sorgf??ltig durch, " + 
                    "und kreuzen Sie jeweils diejenige Antwort an, die Sie am besten beschreibt.", "start"],
                footerText: "Hinweis: Bevor Sie mit der n??chsten " + 
                    "Aufgabe beginnen, k??nnen Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PID5BF01", type: "negaffect",     data: ["Ich reagiere viel emotionaler als fast alle anderen Menschen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", type: "antagonism",    data: ["Ich bin gut darin, Leute reinzulegen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF03", type: "disinhibition", data: ["Ich gehe oft ziemlich nachl??ssig mit meinen Sachen und denen anderer um.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF04", type: "detachment",    data: ["Ich halte Abstand zu Menschen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF05", type: "psychoticism",  data: ["Ich sehe zwischen den Dingen oft ungew??hnliche Zusammenh??nge, die anderen Menschen entgehen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF06", type: "anancasm",      data: ["Ich gehe Dinge immer auf die gleiche Weise an, auch wenn es so nicht funktioniert.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF07", type: "negaffect",     data: ["Ich mache mir st??ndig ??ber irgendetwas Sorgen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF08", type: "antagonism",    data: ["Manchmal muss man vor anderen ??bertreiben, um weiterzukommen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF09", type: "disinhibition", data: ["Es kommt mir vor, als w??rde ich v??llig impulsiv handeln.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF10", type: "detachment",    data: ["Nichts scheint mich wirklich zu interessieren.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF11", type: "psychoticism",  data: ["Man hat mir gesagt, dass meine Art zu denken wirklich seltsam ist.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF12", type: "anancasm",      data: ["Auch wenn es andere zum Wahnsinn treibt, bestehe ich darauf, alles perfekt zu machen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF13", type: "negaffect",     data: ["Ich mache mir viele Sorgen dar??ber, allein zu sein.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF14", type: "antagonism",    data: ["Es steht mir zu, besonders behandelt zu werden.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF15", type: "disinhibition", data: ["Ich verliere in Gespr??chen den Faden, weil mich andere Dinge ablenken.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", type: "detachment",    data: ["Ich halte romantische Gef??hle lieber aus meinem Leben heraus.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", type: "psychoticism",  data: ["Es ist komisch, aber manchmal kommen mir allt??gliche Gegenst??nde anders vor als sonst.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", type: "anancasm",      data: ["Ich halte an einer bestimmten Herangehensweise fest, auch wenn klar ist, dass es so nicht funktionieren wird.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", type: "negaffect",     data: ["Ich werde schnell emotional, oft aus geringstem Anlass.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", type: "antagonism",    data: ["Es f??llt mir leicht, andere auszunutzen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", type: "disinhibition", data: ["Ich vergesse oft, meine Rechnungen zu bezahlen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", type: "detachment",    data: ["Ich mag es nicht, Zeit mit anderen zu verbringen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", type: "psychoticism",  data: ["Ich hatte einige wirklich seltsame Erlebnisse, die sehr schwer zu erkl??ren sind.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", type: "anancasm",      data: ["Ich versuche Dinge weiter zu perfektionieren, auch wenn ich sie wahrscheinlich schon so gut wie m??glich hinbekommen habe.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", type: "negaffect",     data: ["Ich mache mir ??ber fast alles Sorgen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF26", type: "antagonism",    data: ["Ich biege mir die Wahrheit zurecht, wenn es zu meinem Vorteil ist.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF27", type: "disinhibition", data: ["Obwohl ich es eigentlich besser wei??, treffe ich immer wieder ??berst??rzte Entscheidungen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF28", type: "detachment",    data: ["Ich bin selten von irgendetwas begeistert.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF29", type: "psychoticism",  data: ["Ich habe mehrere Angewohnheiten, die andere exzentrisch oder seltsam finden.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF30", type: "negaffect",     data: ["Ich ertrage es nicht, allein gelassen zu werden ??? nicht mal f??r ein paar Stunden.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF31", type: "antagonism",    data: ["Ich muss mich oft mit Leuten besch??ftigen, die weniger wichtig sind als ich.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF32", type: "disinhibition", data: ["Ich lasse mich leicht ablenken.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF33", type: "detachment",    data: ["Ich beende Beziehungen, wenn sie enger werden.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF34", type: "psychoticism",  data: ["Wenn ich einen vertrauten Gegenstand anschaue, ist es manchmal so, als w??rde ich ihn zum ersten Mal sehen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
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
                data: ["Bitte geben Sie f??r die folgenden Aussagen an,<br>inwieweit " + 
                    "diese f??r Sie zutreffend sind.", "start"],
                footerText: "Hinweis: Bevor Sie mit der n??chsten " + 
                    "Aufgabe beginnen, k??nnen Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "SD401", type: "Mach", data: ["Es ist nicht ratsam, seine Geheimnisse preiszugeben.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD402", type: "Mach", data: ["Man muss die wichtigen Personen auf seine Seite ziehen, koste es, was es wolle.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD403", type: "Mach", data: ["Vermeide direkte Konflikte mit Anderen, denn sie k??nnten in der Zukunft von Nutzen sein.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD404", type: "Mach", data: ["Verhalte dich unauff??llig, wenn du deinen Willen durchsetzen willst.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD405", type: "Mach", data: ["Die Situation zu manipulieren, erfordert Planung.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD406", type: "Mach", data: ["Schmeicheln ist ein gutes Mittel, um Leute auf deine Seite zu ziehen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD407", type: "Mach", data: ["Ich liebe es, wenn ein kniffliger Plan gelingt.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD408", type: "Narc", data: ["Andere sehen mich als geborene F??hrungsperson.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD409", type: "Narc", data: ["Ich habe eine einzigartige Begabung, andere zu ??berzeugen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD410", type: "Narc", data: ["Gruppenaktivit??ten sind ohne mich eher langweilig.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD411", type: "Narc", data: ["Ich wei??, dass ich etwas Besonderes bin, da mir andere das immer wieder sagen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD412", type: "Narc", data: ["Ich habe einige au??ergew??hnliche Qualit??ten.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD413", type: "Narc", data: ["Ich werde in der Zukunft wahrscheinlich ein Star in einem bestimmten Bereich sein.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD414", type: "Narc", data: ["Ich mag es, hin und wieder anzugeben.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD415", type: "Psyc", data: ["Menschen sagen oft, dass ich au??er Kontrolle bin.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD416", type: "Psyc", data: ["Ich neige dazu, gegen Autorit??ten und deren Regeln zu k??mpfen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD417", type: "Psyc", data: ["Ich war in mehr Auseinandersetzungen verwickelt als die meisten Menschen meines Alters und Geschlechts.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD418", type: "Psyc", data: ["Ich neige dazu, mich kopf??ber in etwas zu st??rzen ohne Fragen zu stellen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD419", type: "Psyc", data: ["Ich hatte schon Schwierigkeiten mit dem Gesetz.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD420", type: "Psyc", data: ["Ich gerate manchmal in gef??hrliche Situationen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD421", type: "Psyc", data: ["Leute, die sich mit mir anlegen, bereuen es immer","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD422", type: "Sad", data: ["Bei einem Faustkampf zuzuschauen begeistert mich.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD423", type: "Sad", data: ["Ich genie??e gewaltt??tige Filme und Computerspiele.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD424", type: "Sad", data: ["Es ist witzig, wenn Idioten auf die Nase fallen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD425", type: "Sad", data: ["Ich genie??e es, bei gewaltt??tigem Sport zuzuschauen.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD426", type: "Sad", data: ["Manche Menschen verdienen es zu leiden.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD427", type: "Sad", data: ["Rein zum Vergn??gen habe ich schonmal gemeine Dinge in sozialen Medien gesagt.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]},
            { itemID: "SD428", type: "Sad", data: ["Ich wei??, wie ich jemanden allein mit Worten verletzen kann.","stimme ??berhaupt nicht zu", "2", "3", "4", "stimme voll zu"]}
        ]
    }, 


    Ukraine : {
        frame: "mchoice",
        description: "Fragen zur Ersch??tterung durch das Weltgeschehen",
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
            { itemID: "weltgeschehen1", data: ["F??hlen Sie sich von der aktuellen Situation in der Ukraine bedroht?", "Ja", "Nein", "M??chte nicht antworten"]},
            { itemID: "weltgeschehen2", data: ["Sind Sie oder eine nahestehende Person betroffen?", "Ja", "Nein", "M??chte nicht antworten"]},
            { itemID: "weltgeschehen3", data: ["F??hlen Sie sich vom Klimawandel bedroht?", "Ja", "Nein", "M??chte nicht antworten"]},
            { itemID: "weltgeschehen4", data: ["Sind Sie oder eine nahestehende Person betroffen?", "Ja", "Nein", "M??chte nicht antworten"]},
            { itemID: "weltgeschehen5", data: ["F??hlen Sie sich von der Corona-Pandemie bedroht?", "Ja", "Nein", "M??chte nicht antworten"]},
            { itemID: "weltgeschehen6", data: ["Sind Sie oder eine nahestehende Person aktuell betroffen?", "Ja", "Nein", "M??chte nicht antworten"]}
        ]
    }

};
