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

    The server listens at port 61543 and recognizes requests for tests when the 
    url starts with 'test:'. The required test or tests may be specified in the url 
    after this, e.g.
    http://safpsy186.psychiatrie3.uni-ulm.de:61543/test:SSTDepr
    Separate multiple tests with a comma. The tests are then given in order.
    */

    //SCALES//////////////////////////////////////////////////////////////////////

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
                    "diese für Sie zutreffend sind.", "Start"],
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
                    "und kreuzen Sie jeweils diejenige Antwort an, die Sie am besten beschreibt.", "Start"],
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
                "lang)<br>3 meistens, die ganze Zeit (5 bis 7 Tage lang)", "Start"]}, //anpassen Instruktionen
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

    PTED : {
        frame: "mchoice",//bleibt
        description: "Posttraumatische Verbitterungsstörung",
        version: "1.0",//bleibt
        timeout: 0, //no timeout
        timeRefractory: 200,//bleibt
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
                    "Feststellungen und kreuzen Sie die für Sie zutreffende Option an.<br>", "Start"],
                footerText: "Hinweis: Bevor Sie mit der nächsten " + 
                    "Aufgabe beginnen, können Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PTED01", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                    "...das mich äußerst gekränkt oder verbittert hat.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED02", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wodurch sich meine psychische Befindlichkeit deutlich und bis heute negativ verändert hat.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED03", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das aus meiner Sicht äußerst ungerecht oder nicht fair war.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED04", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...an das ich immer wieder denken muss.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED05", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das mich heftig aufregt, wenn ich daran erinnert werde.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED06", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Gedanken an Rache auslöst.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED07", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wegen dem ich mir Vorwürfe mache und ärgerlich auf mich selbst bin.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED08", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich häufiger das Gefühl habe, dass es keinen Sinn macht, Dinge anzupacken und sich anzustrengen.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED09", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...durch das meine Stimmung häufig niedergeschlagen und gedrückt ist.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED10", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich mich in allgemein schlechter körperlicher Verfassung fühle.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED11", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich bestimmte Orte oder Personen meide, um nicht daran erinnert zu werden.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED12", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...dem gegenüber ich mich ohnmächtig und hilflos ausgeliefert fühle.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED13", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Geühle der Genugtuung auslöst, beim Gedanken, der Verursacher würde einmal Ähnliches erleiden.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED14", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass meine Kraft und mein Antrieb reduziert und nicht mehr wie früher sind.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED15", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich gereizter bin als früher.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED16", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weshalb ich mich ablenken muss, wenn ich vorübergehend eine normale und ausgeglichene Stimmung erleben will.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED17", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich meinen beruflichen und/oder familiären Aktivitäten nicht mehr wie früher nachgehe.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED18", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu geführt hat, dass ich mich von Freunden und geselligen Aktiviäten zurückgezogen habe.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED19", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...zu dem sich mir immer wieder belastende Erinnerungen aufdrängen.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]}
        ]
    },

    
    Ultimatum : {
        frame : "ultimatum",
        description : "ultimatum game, Stefanie Bernardin Jan 2022, Roberto Viviani March 2022",
        timeout : 0,  //no timeout
        timeRefractory : 300,
        timeWaitProposal : 2000,  //time to wait for the proposal
        skipOutput : false,
        randomOrder : false,
        version : "1.0",

        //the offers may be specified in the options section, unless given in the data
        //field of the rial object
        options : {
            //a first series of 30 offers N(12, 1.5), followed by 30 offers N(4, 1.5)
            //source: Xiang, Lohrenz, & Montague, J. Neurosci. 33:1099-1108
            xiang : [11,    10,    13,    13,    12,    11,    12,    14,    14,    11,    
                     12,    10,    13,    13,    13,    10,    13,    11,    11,    13,    
                     12,    12,    13,    14,    11,    10,    10,    11,    11,    13,     
                     -1,    -4,    -3,    -6,    -3,    -4,    -3,    -3,    -4,    -4,     
                     -3,    -6,    -5,    -7,    -4,    -6,    -1,    -5,    -5,    -3,     
                     -5,    -5,    -6,    -5,    -5,    -3,    -2,    -4,    -4,    -5],
            //Offers generated from a mixture of two Gaussians, proportion 60/40%,
            //having means 10 and 5.5, and variances 0.8 and 1.5. The first offers
            //establishes (realistic) expectations of mean offers. Further offers
            //generate prediction errors. Source: Kienhöfer, Sittenberger, Rabl, Labek, 
            //Viviani 2020, "Preliminary analysis of the 'ultimatum' paradigm in the
            //paracetamol study", Technical Report, May-September 2020. In that work,
            //offers had a mean of 9 and 5.5; they were modified here to increase 
            //comparability with the xiang series.
            mixture : [
                     11, 12, 10,    //1
                     11,  9,        //2
                     12, 12, 11,    //3
                     -3, -4, -4,    //4
                     12, 11, 10,    //5
                     -5, -2, -6,    //6
                     -8, -7,        //7
                     -5, -9, -4,    //8
                     9, 10,         //9
                     12, 11, 11,    //10
                     -4, -7, -4,    //11
                     11, 11,  9,    //12
                     10, 12, 10,    //13
                     -4, -2, -5,    //14
                     -8, -6,        //15
                     -4, -2, -6,    //16
                     10, 11,        //17
                     10, 10, 10,    //18
                     -7, -6, -6,    //19
                     10, 10, 12,    //20
                     -6, -5, -5,    //21
                     -7, -6         //22
                    ],
            //this, not used at present, is the same as xiang but in a mixed series
            series : [
                        11, 10, 13,    //1
                        13,  12,        //2
                        11, 12, 14,    //3
                        -1, -4, -3,    //4
                        14, 11, 12,    //5
                        -6, -3, -4,    //6
                        -3, -3,        //7
                        -4, -4, -3,    //8
                        10, 13,        //9
                        13, 13, 10,    //10
                        -6, -5, -7,    //11
                        13, 11,  11,    //12
                        13, 12, 12,    //13
                        -4, -6, -1,    //14
                        -5, -5,        //15
                        -3, -5, -5,    //16
                        13, 14,        //17
                        11, 10, 10,    //18
                        -6, -5, -5,    //19
                        11, 11, 13,    //20
                        -3, -2, -4,    //21
                        -4, -5         //22
                       ]
           },

        data : [],
        trials: [
            //instruction ultimatum
            { frame : "infopage", itemID: "infoUltimatum", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Kommen wir nun zum zweiten Teil der Studie.<br><br>Sie werden auf den nächsten " +
                "Seiten ein Spiel spielen, bei dem Geld zwischen Ihnen und " +
                "verschiedenen Mitspielern aufgeteilt wird. Sie starten in jeder Runde mit 20 €. " +
                "Ihr Mitspieler wird Ihnen ein Angebot machen, wie Sie die 20 € aufteilen. " +
                "Sie können sich in jeder Runde entscheiden, ob Sie das Angebot annehmen oder ablehnen wollen. " + 
                "Akzeptieren Sie das Angebot, so wird " +
                "Ihnen beiden der jeweilige Anteil der 20 € gutgeschrieben. Lehnen Sie das Angebot ab, so " +
                "erhalten beide Spieler nichts und gehen leer aus.<br><br>" +
                "Die Reaktionen der Mitspieler basiren auf dem Verhalten realer Menschen. Sie sind Spielern nachempfunden, " + 
                "deren Verhalten in vorherigen Experimenten erhoben wurde.<br><br>" +
                "Wenn Sie bei dieser Studie Ihr Smartphone verwenden, legen Sie es am besten quer.<br><br>" + 
                "Hinweis: Die nachfolgenden Durchläufe dienen ausschließlich der Übung.<br><br>" +
                "Wenn Sie bereit sind, klicken Sie bitte hier:",
                "Start"]},
            { itemID: "reset", data: [7]},  //set the number of practice rounds
            { itemID: "ultPractice", skipOutput: true, timeWaitProposal: 4000, data: [10], blockID: 0, blockPos: -1, type: "practice"},
            { itemID: "ultPractice", skipOutput: true, timeWaitProposal: 4000, data: [10], blockID: 0, blockPos: 0, type: "practice"},
            //instruction SST
            { frame: "infopage", itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Zwischen den Spielrunden sind Sie immer wieder gefragt, eine kleine Aufgabe zu erledigen. " + 
                "Ihnen werden immer sechs Kästchen nebeneinander präsentiert, die " +
                "Wörter in einer durcheinandergewürfelten Reihenfolge beinhalten. Aus diesen " + 
                "Wörtern können Sie verschiedene Sätze bilden. Für die Bildung eines Satzes brauchen Sie " +
                "nicht alle Wörter.<br><br>" +
                "Bilden Sie schnell im Kopf aus den Wörtern einen Satz und <b>klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen würden</b>. " +
                "Zum Beispiel: die Reihenfolge der Wörter könnte die folgende sein:<br><br>" + 
                "warten   wir   lange  können  sitzen   nun<br><br>" +
                "Wenn sie den Satz 'wir können nun lange warten' im Kopf bilden, klicken Sie auf 'warten'; " + 
                "wenn Sie den Satz 'wir können nun lange sitzen' bilden, klicken Sie auf 'sitzen'.<br>" + 
                "Es gibt keinen richtigen oder falschen Satz, solange der Satz nach der Grammatik aufgebaut ist. " + 
                "Verwenden Sie dabei den ersten Satz, den Sie bilden können. " +
                "Nachdem Sie ein Wort angetippt haben, kommen Sie automatisch zum nächsten Satz oder zurück zum Spiel.<br><br>" + 
                "Bitte beachten Sie, dass Sie bei der Lösung der Aufgaben nur 7.5 Sek. Zeit pro Satz haben!<br><br>" +
                "Hinweis: Die nachfolgenden Durchläufe dienen ausschließlich der Übung.<br><br>" +
                "Wenn Sie bereit sind, klicken Sie bitte hier:", "Start"]},
            //practice trials. Override timeout. Override skipOutput.
            { frame : "SST", skipOutput: true, itemID: "Pr01", type: "AP", timeout: 7500,
                data: ["warten", "wir", "lange", "können", "sitzen", "nun"], polarity: -1, pos: 1, neg: 5 },
            { frame : "SST", skipOutput: true, itemID: "Pr02", type: "AP", timeout: 7500,
                data: ["nun", "Ich", "Post", "Haltestelle", "zur", "gehe"], polarity: -1, pos: 3, neg: 4},
            { itemID: "resetBudget" },
            { itemID: "ultPractice", skipOutput: true, timeWaitProposal: 4000, data: [10], blockID: 0, blockPos: -1, type: "practice"},
            { itemID: "ultPractice", skipOutput: true, timeWaitProposal: 4000, data: [10], blockID: 0, blockPos: 0, type: "practice"},
            { frame : "SST", skipOutput: true, itemID: "Pr03", type: "AP", timeout: 7500,
                data: ["Tisch", "Anna", "auf", "sitzt", "dem", "Stuhl"], polarity: -1, pos: 1, neg: 6 },
            { frame : "SST", skipOutput: true, itemID: "Pr04", type: "AP", timeout: 7500,
                data: ["Hosen", "blau", "sind", "seine", "schwarz", "alle"], polarity: -1, pos: 2, neg: 4 },
            { itemID: "resetBudget" },
            { itemID: "ultPractice", skipOutput: true, data: [11], blockID: 0, blockPos: -1, type: "practice"},
            { itemID: "ultPractice", skipOutput: true, data: [9], blockID: 0, blockPos: 0, type: "practice"},
            { itemID: "ultPractice", skipOutput: true, data: [11], blockID: 0, blockPos: -1, type: "practice"},
                //the test starts here.
            { frame : "infopage", itemID: "infoUltimatum", type: "info", skipOutput: true,
                timeout: 0, timeRefractory: 0,
                data: ["Jetzt fängt das echte Spiel an. Hinweis: Sie können sich in jeder Runde entscheiden, ob "  + 
                "Sie die Angebote annehmen oder ablehnen wollen. Nehmen Sie das Angebot an, so wird " +
                "Ihnen und dem anderen Spieler der jeweilige Anteil der 20 € gutgeschrieben. Lehnen Sie das Angebot ab, " +
                "erhalten sowohl Sie als auch der andere Spieler nichts und beide gehen leer aus.<br><br>" + 
                "Wenn Sie bereit sind, klicken Sie bitte hier:",
                "Start"]},
            { itemID: "reset", data: [60]},  //reset the gains of the practice phase
            { itemID: "ultimatum", blockID: 1, blockPos: -2 },
            { itemID: "ultimatum", blockID: 1, blockPos: -1 },
            { itemID: "ultimatum", blockID: 1, blockPos: 0 },
            { frame : "SST", itemID: "N1r_V2_2PN", blockID: 2, blockPos: 1, type: "N", timeout: 7500, data: ["gehört", "habe", "ich", "es", "mehrmals", "gesehen"], polarity: -1, pos: 1, neg: 6 }, 

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 2, blockPos: -1 },
            { itemID: "ultimatum", blockID: 2, blockPos: 0 },
            { frame : "SST", itemID: "R19_V2_5NP", blockID: 2, blockPos: 2, type: "PN", timeout: 7500, data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2                         },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 3, blockPos: -2 },
            { itemID: "ultimatum", blockID: 3, blockPos: -1 },
            { itemID: "ultimatum", blockID: 3, blockPos: 0 },
            { frame : "SST", itemID: "A6R_V2_10PN", blockID: 3, blockPos: 1, type: "PN", timeout: 7500, data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                   },
            { frame : "SST", itemID: "E15_V2_2NP", blockID: 3, blockPos: 2, type: "PN", timeout: 7500, data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1                    },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 4, blockPos: -2 },
            { itemID: "ultimatum", blockID: 4, blockPos: -1 },
            { itemID: "ultimatum", blockID: 4, blockPos: 0 },
            { frame : "SST", itemID: "E8_V2_5NP", blockID: 4, blockPos: 1, type: "PN", timeout: 7500, data: ["meine", "verpuffen", "Anstrengungen", "geschätzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2        },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 5, blockPos: -2 },
            { itemID: "ultimatum", blockID: 5, blockPos: -1 },
            { itemID: "ultimatum", blockID: 5, blockPos: 0 },
            { frame : "SST", itemID: "E14_V2_3NP", blockID: 5, blockPos: 1, type: "PN", timeout: 7500, data: ["Zukunft", "in", "alles", "wird", "angenehmer", "schwerer"], polarity: 1, pos: 5, neg: 6                   },
            { frame : "SST", itemID: "N4r_V2_3PN", blockID: 5, blockPos: 2, type: "N", timeout: 7500, data: ["Kinder", "im", "die", "spielen", "Wasser", "Sand"], polarity: 1, pos: 5, neg: 6 }, 

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 6, blockPos: -2 },
            { itemID: "ultimatum", blockID: 6, blockPos: -1 },
            { itemID: "ultimatum", blockID: 6, blockPos: 0 },
            { frame : "SST", itemID: "E10_V2_8PN", blockID: 6, blockPos: 1, type: "PN", timeout: 7500, data: ["erreichen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5               },
            { frame : "SST", itemID: "N6_V2_4PN",  blockID: 6, blockPos: 2, type: "N", timeout: 7500, data: ["Motorrad ", "Fahrrad", "fahre", "dem", "mit", "ich"], polarity: -1, pos: 1, neg: 2 }, 

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 7, blockPos: -1 },
            { itemID: "ultimatum", blockID: 7, blockPos: 0 },
            { frame : "SST", itemID: "E18_V2_4PN", blockID: 7, blockPos: 1, type: "PN", timeout: 7500, data: ["froh", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                           },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 8, blockPos: -2 },
            { itemID: "ultimatum", blockID: 8, blockPos: -1 },
            { itemID: "ultimatum", blockID: 8, blockPos: 0 },
            { frame : "SST", itemID: "E24_V2_1NP", blockID: 8, blockPos: 1, type: "PN", timeout: 7500, data: ["Sorgen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1                          },
            { frame : "SST", itemID: "E13_V2_9NP", blockID: 8, blockPos: 2, type: "PN", timeout: 7500, data: ["stehen", "Chancen", "echt", "schlecht", "die", "großartig"], polarity: 1, pos: 6, neg: 4                  },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 9, blockPos: -1 },
            { itemID: "ultimatum", blockID: 9, blockPos: 0 },
            { frame : "SST", itemID: "E22_V2_6NP", blockID: 9, blockPos: 1, type: "PN", timeout: 7500, data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3                  },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 10, blockPos: -2 },
            { itemID: "ultimatum", blockID: 10, blockPos: -1 },
            { itemID: "ultimatum", blockID: 10, blockPos: 0 },
            { frame : "SST", itemID: "O5_V2_10NP", blockID: 10, blockPos: 1, type: "PN", timeout: 7500, data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1               },
            { frame : "SST", itemID: "O7_V2_6NP", blockID: 10, blockPos: 2, type: "PN", timeout: 7500, data: ["meine", "werde", "erreichen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5                   },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 11, blockPos: -2 },
            { itemID: "ultimatum", blockID: 11, blockPos: -1 },
            { itemID: "ultimatum", blockID: 11, blockPos: 0 },
            { frame : "SST", itemID: "E21_V2_6PN", blockID: 11, blockPos: 1, type: "PN", timeout: 7500, data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5         },
            { frame : "SST", itemID: "56_V2_7NP", blockID: 11, blockPos: 2, type: "PN", timeout: 7500, data: ["man", "Falsche", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2                           },

            //30

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 12, blockPos: -2 },
            { itemID: "ultimatum", blockID: 12, blockPos: -1 },
            { itemID: "ultimatum", blockID: 12, blockPos: 0 },
            { frame : "SST", itemID: "O11_V2_7PN", blockID: 12, blockPos: 1, type: "PN", timeout: 7500, data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 },
            { frame : "SST", itemID: "E1_V2_4NP", blockID: 12, blockPos: 2, type: "PN", timeout: 7500, data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1                          },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 13, blockPos: -2 },
            { itemID: "ultimatum", blockID: 13, blockPos: -1 },
            { itemID: "ultimatum", blockID: 13, blockPos: 0 },
            { frame : "SST", itemID: "E2_V2_4PN", blockID: 13, blockPos: 1, type: "PN", timeout: 7500, data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                          },
            { frame : "SST", itemID: "E12_V2_9PN", blockID: 13, blockPos: 2, type: "PN", timeout: 7500, data: ["das", "Projekt", "ich", "hinkriegen", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6                 },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 14, blockPos: -2 },
            { itemID: "ultimatum", blockID: 14, blockPos: -1 },
            { itemID: "ultimatum", blockID: 14, blockPos: 0 },
            { frame : "SST", itemID: "E16_V2_5PN", blockID: 14, blockPos: 1, type: "PN", timeout: 7500, data: ["mal", "bewundert", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                 },
            { frame : "SST", itemID: "O10r_V2_1PN", blockID: 14, blockPos: 2, type: "PN", timeout: 7500, data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6             },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 15, blockPos: -1 },
            { itemID: "ultimatum", blockID: 15, blockPos: 0 },
            { frame : "SST", itemID: "N30_V2_7PN", blockID: 15, blockPos: 1, type: "N", timeout: 7500, data: ["bin", "draußen", "immer", "ich", "fast", "unterwegs"], polarity: -1, pos: 2, neg: 6 }, 
            { frame : "SST", itemID: "E4_V2_7NP", blockID: 15, blockPos: 2, type: "PN", timeout: 7500, data: ["bin", "schuld", "fast", "ich", "immer", "fleißig"], polarity: -1, pos: 6, neg: 2                           },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 16, blockPos: -2 },
            { itemID: "ultimatum", blockID: 16, blockPos: -1 },
            { itemID: "ultimatum", blockID: 16, blockPos: 0 },
            { frame : "SST", itemID: "O4_V2_2PN", blockID: 16, blockPos: 1, type: "PN", timeout: 7500, data: ["Erfolg", "habe", "gewöhnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6                  },
            { frame : "SST", itemID: "A2_V2_3NP", blockID: 16, blockPos: 2, type: "PN", timeout: 7500, data: ["bin ", "einfach", "manchmal", "ich", "traurig", "glücklich"], polarity: 1, pos: 6, neg: 5                  },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 17, blockPos: -1 },
            { itemID: "ultimatum", blockID: 17, blockPos: 0 },
            { frame : "SST", itemID: "O9r_V2_8PN", blockID: 17, blockPos: 1, type: "PN", timeout: 7500, data: ["rosig", "sehr", "Zukunft", "die", "düster", "ist"], polarity: -1, pos: 1, neg: 5                          },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 18, blockPos: -2 },
            { itemID: "ultimatum", blockID: 18, blockPos: -1 },
            { itemID: "ultimatum", blockID: 18, blockPos: 0 },
            { frame : "SST", itemID: "E7_V2_10NP", blockID: 18, blockPos: 1, type: "PN", timeout: 7500, data: ["verloren", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                       },
            { frame : "SST", itemID: "O6r_V2_2NP", blockID: 18, blockPos: 1, type: "PN", timeout: 7500, data: ["zerstört", "große", "Wünsche", "werden", "sehr", "erfüllt"], polarity: 1, pos: 6, neg: 1                  },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 19, blockPos: -2 },
            { itemID: "ultimatum", blockID: 19, blockPos: -1 },
            { itemID: "ultimatum", blockID: 19, blockPos: 0 },
            { frame : "SST", itemID: "O1r_V2_1PN", blockID: 19, blockPos: 1, type: "PN", timeout: 7500, data: ["glücklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6                 },
            { frame : "SST", itemID: "N10_V2_8PN", blockID: 19, blockPos: 2, type: "N", timeout: 7500, data: ["Frühling ", "im", "Geburtstag", "mein", "Sommer", "ist"], polarity: -1, pos: 1, neg: 5 }, 

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 20, blockPos: -2 },
            { itemID: "ultimatum", blockID: 20, blockPos: -1 },
            { itemID: "ultimatum", blockID: 20, blockPos: 0 },
            { frame : "SST", itemID: "E23_V2_9PN", blockID: 20, blockPos: 1, type: "PN", timeout: 7500, data: ["wird", "Akku", "gleich", "voll", "der", "leer"], polarity: 1, pos: 4, neg: 6                              },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 21, blockPos: -2 },
            { itemID: "ultimatum", blockID: 21, blockPos: -1 },
            { itemID: "ultimatum", blockID: 21, blockPos: 0 },
            { frame : "SST", itemID: "E20_V2_3NP", blockID: 21, blockPos: 1, type: "PN", timeout: 7500, data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergnügen"], polarity: 1, pos: 6, neg: 5                     },

            { itemID: "resetBudget" },
            { itemID: "ultimatum", blockID: 22, blockPos: -1 },
            { itemID: "ultimatum", blockID: 22, blockPos: 0 },
            { frame : "SST", itemID: "E11_V2_8PN", blockID: 22, blockPos: 1, type: "PN", timeout: 7500, data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1           }
        ]

    },

    //final scale
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
