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

    This script files collects scales developed for HayStack so far.
    */

    GHQ: {
        frame: "mchoice",
        description: "General Health Questionaire, version 12 items",
        version: "1.0",
        timeout: 0,
        timeRefractory: 200,
        randomOrder: false,
        skipOutput: false,
        polarity: 1,
        baselineScore: 0,

        //common property of all trials
        type: "GHQ",
        trials: [
            { frame: "infopage"/*bleibt*/ , itemID: "infoGHQ", type: "info"/*bleibt*/, skipOutput: true/*bleibt*/,
                timeout: 0, timeRefractory: 0,
                data: ["Der Fragebogen soll erfassen, ob Sie in den vergangenen Wochen irgendwelche Krankheitsbeschwerden " + 
                    "hatten bzw. wie es ganz allgemein um Ihre Gesundheit in den letzten Wochen bestellt war. Bitte " + 
                    "beantworten Sie alle Fragen, indem Sie die zutreffende Antwort ausw??hlen. Bitte denken Sie daran, " + 
                    "dass es um jetzige oder k??rzliche Beschwerden geht und nicht um Ihre fr??heren. Es ist wichtig, dass " + 
                    "Sie alle Fragen beantworten.", "start"]},
            { itemID: "GHQ01", data: ["Haben Sie in den letzten Wochen wegen Sorgen weniger geschlafen?", 
                "nein, gar nicht", "nicht schlechter als ??blich", "schlechter als ??blich", "viel schlechter als ??blich"]},
            { itemID: "GHQ02", data: ["Haben Sie das Gef??hl gehabt, dauernd unter Druck zu stehen?", 
                "nein, gar nicht", "nicht mehr als ??blich", "mehr als ??blich", "viel mehr als ??blich"]},
            { itemID: "GHQ03", data: ["Haben Sie sich in den letzten Wochen auf das, was Sie gemacht haben, konzentrieren k??nnen?", 
                "besser als ??blich", "so wie ??blich", "schlechter als ??blich", "viel schlechter als ??blich"]},
            { itemID: "GHQ04", data: ["Haben Sie in den letzten Wochen das Gef??hl gehabt, f??r etwas n??tzlich zu sein?", 
                "mehr als ??blich", "so wie ??blich", "weniger als ??blich", "viel weniger als ??blich"]},
            { itemID: "GHQ05", data: ["Haben Sie in den letzten Wochen das Gef??hl gehabt, sich mit Ihren Problemen auseinander zu setzen?", 
                "besser als ??blich", "so wie ??blich", "weniger als ??blich", "viel weniger als ??blich"]},
            { itemID: "GHQ06", data: ["Ist es Ihnen in den letzten Wochen schwer gefallen, Entscheidungen zu treffen?",
                "nein, gar nicht", "so wie als ??blich", "schwerer als ??blich", "viel schwerer als ??blich"]},
            { itemID: "GHQ07", data: ["Haben Sie in den letzten Wochen den Eindruck gehabt, dass Sie mit Ihren Schwierigkeiten nicht zu Rande gekommen sind?", 
                "nein, gar nicht", "nicht schlechter als ??blich", "schlechter als ??blich", "viel schlechter als ??blich"]},
            { itemID: "GHQ08", data: ["Alles in allem, haben Sie sich in den letzten Wochen einigerma??en zufrieden gef??hlt?", 
                "mehr als ??blich", "so wie ??blich", "weniger als ??blich", "viel weniger als ??blich"]},
            { itemID: "GHQ09", data: ["Konnten Sie in den letzten Wochen Ihren Alltagsverpflichtungen mit Freude nachgehen?", 
                "mehr als ??blich", "so wie ??blich", "weniger als ??blich", "viel weniger als ??blich"]},
            { itemID: "GHQ10", data: ["Haben Sie sich in den letzten Wochen ungl??cklich und deprimiert gef??hlt?", 
                "nein, gar nicht", "nicht mehr als ??blich", "mehr als ??blich", "viel mehr als ??blich"]},
            { itemID: "GHQ11", data: ["Haben Sie in den letzten Wochen einen Mangel an Selbstvertrauen gesp??rt?", 
                "nein, gar nicht", "nicht mehr als ??blich", "mehr als ??blich", "viel mehr als ??blich"]},
            { itemID: "GHQ12", data: ["Haben Sie sich in den letzten Wochen wertlos gef??hlt?",
                "nein, gar nicht", "nicht mehr als ??blich", "mehr als ??blich", "viel mehr als ??blich"]}
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

    PTED : {
        frame: "mchoice",//bleibt
        description: "Posttraumatische Verbitterungsst??rung",
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
                    "Feststellungen und kreuzen Sie die f??r Sie zutreffende Option an.<br>", "start"],
                footerText: "Hinweis: Bevor Sie mit der n??chsten " + 
                    "Aufgabe beginnen, k??nnen Sie an dieser Stelle gerne noch eine kurze Verschnaufpause " +
                    "machen.<br>Klicken Sie auf Start, wenn Sie bereit sind."
            },
            { itemID: "PTED01", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                    "...das mich ??u??erst gekr??nkt oder verbittert hat.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED02", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wodurch sich meine psychische Befindlichkeit deutlich und bis heute negativ ver??ndert hat.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED03", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das aus meiner Sicht ??u??erst ungerecht oder nicht fair war.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED04", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...an das ich immer wieder denken muss.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED05", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das mich heftig aufregt, wenn ich daran erinnert werde.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED06", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Gedanken an Rache ausl??st.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED07", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...wegen dem ich mir Vorw??rfe mache und ??rgerlich auf mich selbst bin.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED08", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich h??ufiger das Gef??hl habe, dass es keinen Sinn macht, Dinge anzupacken und sich anzustrengen.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED09", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...durch das meine Stimmung h??ufig niedergeschlagen und gedr??ckt ist.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED10", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu gef??hrt hat, dass ich mich in allgemein schlechter k??rperlicher Verfassung f??hle.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED11", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weswegen ich bestimmte Orte oder Personen meide, um nicht daran erinnert zu werden.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED12", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...dem gegen??ber ich mich ohnm??chtig und hilflos ausgeliefert f??hle.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED13", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das in mir Ge??hle der Genugtuung ausl??st, beim Gedanken, der Verursacher w??rde einmal ??hnliches erleiden.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED14", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu gef??hrt hat, dass meine Kraft und mein Antrieb reduziert und nicht mehr wie fr??her sind.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED15", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu gef??hrt hat, dass ich gereizter bin als fr??her.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED16", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...weshalb ich mich ablenken muss, wenn ich vor??bergehend eine normale und ausgeglichene Stimmung erleben will.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED17", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu gef??hrt hat, dass ich meinen beruflichen und/oder famili??ren Aktivit??ten nicht mehr wie fr??her nachgehe.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED18", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...das dazu gef??hrt hat, dass ich mich von Freunden und geselligen Aktivi??ten zur??ckgezogen habe.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]},
            { itemID: "PTED19", data: ["In den vergangenen Jahren hatte ich ein einschneidendes Lebensereignis zu verkraften,...<br><br>" +
                "...zu dem sich mir immer wieder belastende Erinnerungen aufdr??ngen.", "trifft nicht zu", "trifft kaum zu", "trifft teilweise zu", "trifft zu", "trifft voll zu"]}
        ]
    },

    PID5BF25 : {
        frame: "mchoice",//bleibt
        description: "Personality inventory for DSM5, 25 items",
        version: "1.0",//bleibt
        timeout: 0, //No timeout
        timeRefractory: 200,//bleibt
        randomOrder: false,//bleibt
        skipOutput: false,//bleibt
        baselineScore: 0,

        //common properties of all trials
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
            { itemID: "PID5BF01", type: "disinhibition", data: ["Andere w??rden mich als leichtsinnig beschreiben.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF02", type: "disinhibition", data: ["Es kommt mir vor, als w??rde ich v??llig impulsiv handeln.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF03", type: "disinhibition", data: ["Obwohl ich es eigentlich besser wei??, treffe ich immer wieder ??berst??rzte Entscheidungen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF04", type: "detachment",    data: ["Ich habe oft das Gef??hl, dass nichts, was ich tue, wirklich wichtig ist.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF05", type: "disinhibition", data: ["Andere halten mich f??r verantwortungslos.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF06", type: "disinhibition", data: ["Ich kann nicht gut im Voraus planen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF07", type: "psychoticism",  data: ["Meine Gedankeng??nge ergeben f??r andere h??ufig keinen Sinn.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF08", type: "negaffect",     data: ["Ich mache mir ??ber fast alles Sorgen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF09", type: "negaffect",     data: ["Ich werde schnell emotional, oft aus geringstem Anlass.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF10", type: "negaffect",     data: ["Vor nichts im Leben f??rchte ich mich so sehr wie vor dem Alleinsein.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF11", type: "negaffect",     data: ["Ich halte an einer bestimmten Herangehensweise fest, auch wenn klar ist, dass es so nicht funktionieren wird.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF12", type: "psychoticism",  data: ["Ich habe schon mal Dinge gesehen, die nicht wirklich da waren.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF13", type: "detachment",    data: ["Ich gehe Liebesbeziehungen aus dem Weg.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF14", type: "detachment",    data: ["Ich habe kein Interesse daran, Freundschaften zu schlie??en.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF15", type: "negaffect",     data: ["Ich bin schnell von allen m??glichen Dingen genervt.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF16", type: "detachment",    data: ["Zu viel N??he zu anderen Menschen ist mir unangenehm.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF17", type: "antagonism",    data: ["Es ist nichts dabei, wenn ich die Gef??hle anderer verletze.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF18", type: "detachment",    data: ["Ich bin selten von irgendetwas begeistert.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF19", type: "antagonism",    data: ["Ich bin verr??ckt nach Aufmerksamkeit.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF20", type: "antagonism",    data: ["Ich muss mich oft mit Leuten besch??ftigen, die weniger wichtig sind als ich.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF21", type: "psychoticism",  data: ["Ich habe oft Gedanken, die f??r mich Sinn ergeben, aber anderen Leuten seltsam erscheinen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF22", type: "antagonism",    data: ["Ich benutze Menschen, um zu bekommen, was ich will.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF23", type: "psychoticism",  data: ["Ich vergesse h??ufig alles um mich herum, komme dann pl??tzlich zu mir, und stelle fest, dass viel Zeit vergangen ist.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF24", type: "psychoticism",  data: ["Die Dinge um mich herum f??hlen sich oft unwirklich oder realer als sonst an.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]},
            { itemID: "PID5BF25", type: "antagonism",    data: ["Es f??llt mir leicht, andere auszunutzen.", "trifft ??berhaupt nicht zu", "trifft eher nicht zu", "trifft eher zu", "trifft genau zu"]}
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
                data: ["Ihnen werden in der n??chsten Aufgabe immer sechs K??stchen nebeneinander pr??sentiert. Diese " +
                "K??stchen beinhalten W??rter in einer durcheinandergew??rfelten Reihenfolge. Aus diesen " + 
                "W??rtern k??nnen Sie verschiedene S??tze bilden. F??r die Bildung eines Satzes brauchen Sie " +
                "nicht alle W??rter.<br><br>" +
                "Bilden Sie im Kopf aus den W??rtern einen Satz und klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen w??rden. " +
                "Nachdem Sie ein Wort angetippt haben kommen Sie automatisch zum n??chsten Satz. " + 
                "Versuchen Sie bitte so intuitiv wie m??glich zu entscheiden.<br><br>" + 
                "Wenn Sie bei dieser Studie Ihr Smartphone verwenden, legen Sie es am besten quer.<br><br>" + 
                "Sie bekommen nun eine Sequenz von S??tzen pr??sentiert, diese dienen zur ??bung. Anschlie??end " + 
                "folgt die Sequenz, welche dann zur Auswertung der Daten verwendet wird.<br><br>" + 
                "Nehmen Sie sich bei der ??bung so viel Zeit wie Sie brauchen. Nach der ??bungsphase " + 
                "haben Sie 7.5 Sekunden Zeit, um eine Alternative zu w??hlen."]},
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
            { itemID: "O1r_V2_1PN", block: 1, type: "PN", data: ["gl??cklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E24_V2_1UN", block: 1, type: "NU", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Unterlagen"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "O4_V2_2PU", block: 1, type: "PU", data: ["Erfolg", "habe", "gew??hnlich", "ich", "viel", "zu tun"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "O6r_V2_2NP", block: 1, type: "PN", data: ["zerst??rt", "gro??e", "W??nsche", "werden", "sehr", "erf??llt"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "A2_V2_3NU", block: 1, type: "NU", data: ["bin", "einfach", "manchmal", "ich", "traurig", "bummeln"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E14_V2_3UP", block: 1, type: "PU", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "moderner"], polarity: 1, pos: 5, neg: 6 },
            { itemID: "E1_V2_4NP", block: 1, type: "PN", data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 },
            { itemID: "E2_V2_4UN", block: 1, type: "NU", data: ["gesehen", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E16_V2_5PU", block: 1, type: "PU", data: ["mal", "bewundert", "werde", "einkaufen", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 },
            { itemID: "R19_V2_5NP", block: 1, type: "PN", data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E22_V2_6NU", block: 1, type: "NU", data: ["noch", "wir", "Strafe", "bekommen", "Benachrichtigung", "eine"], polarity: 1, pos: 5, neg: 3 },
            { itemID: "O7_V2_6UP", block: 1, type: "PU", data: ["meine", "werde", "erreichen", "Ziele", "setzen", "ich"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "E4_V2_7NP", block: 1, type: "PN", data: ["bin", "schuld", "fast", "ich", "immer", "flei??ig"], polarity: -1, pos: 6, neg: 2 },
            { itemID: "O11_V2_7UN", block: 1, type: "NU", data: ["meine", "angekommen", "sind", "Bewerbungen", "bestimmt", "aussichtlos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E10_V2_8PU", block: 1, type: "PU", data: ["erreichen", "ich", "Anschluss", "den", "suchen", "werde"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E11_V2_8PN", block: 1, type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 },
            { itemID: "E13_V2_9NU", block: 1, type: "NU", data: ["stehen", "Chancen", "echt", "schlecht", "die", "offen"], polarity: 1, pos: 6, neg: 4 },
            { itemID: "E23_V2_9PU", block: 1, type: "PU", data: ["wird", "Akku", "gleich", "voll", "der", "angezeigt"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "A6R_V2_10PN", block: 1, type: "PN", data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 },
            { itemID: "O5_V2_10NU", block: 1, type: "NU", data: ["verpasst", "die", "aufgezeigt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 },
            { itemID: "O10r_V2_1PU", block: 1, type: "PU", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "regelm????ig"], polarity: -1, pos: 1, neg: 6 },
            { itemID: "E15_V2_2NP", block: 1, type: "PN", data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 },
            { itemID: "E20_V2_3NU", block: 1, type: "NU", data: ["Kinder", "viel", "die", "machen", "Kummer", "Unfug"], polarity: 1, pos: 6, neg: 5 },
            { itemID: "E18_V2_4PU", block: 1, type: "PU", data: ["froh", "unterwegs", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 },
            { itemID: "E8_V2_5NP", block: 1, type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "gesch??tzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 },
            { itemID: "E21_V2_6UN", block: 1, type: "NU", data: ["jetzt", "ist", "anders", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5 },
            { itemID: "56_V2_7UP", block: 1, type: "PU", data: ["man", "Notwendige", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 },
            { itemID: "O9r_V2_8PN", block: 1, type: "PN", data: ["rosig", "sehr", "Zukunft", "die", "d??ster", "ist"], polarity: -1, pos: 1, neg: 5 },
            { itemID: "E12_V2_9UN", block: 1, type: "NU", data: ["das", "Projekt", "ich", "bearbeiten", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6 },
            { itemID: "E7_V2_10UP", block: 1, type: "PU", data: ["verwaltet", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 },
            //block 2
            { itemID: "O1r_V2_1UN", block: 2, type: "NU", data: ["ausmisten", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1PU", block: 2, type: "PU", data: ["Unterlagen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2PN", block: 2, type: "PN", data: ["Erfolg", "habe", "gew??hnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2NU", block: 2, type: "NU", data: ["zerst??rt", "gro??e", "W??nsche", "werden", "sehr", "notiert"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3UP", block: 2, type: "PU", data: ["bin", "einfach", "manchmal", "ich", "bummeln", "gl??cklich"], polarity: 1, pos: 6, neg: 5 }, 
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
            { itemID: "E11_V2_8UN", block: 2, type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unver??ndert", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9UP", block: 2, type: "PU", data: ["stehen", "Chancen", "echt", "offen", "die", "gro??artig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9PN", block: 2, type: "PN", data: ["wird", "Akku", "gleich", "voll", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10UN", block: 2, type: "NU", data: ["Termine", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10UP", block: 2, type: "PU", data: ["aufgezeigt", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1PN", block: 2, type: "PN", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2NU", block: 2, type: "NU", data: ["gescheitert", "bin", "immer", "ich", "fast", "erreichbar"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3UP", block: 2, type: "PU", data: ["Kinder", "viel", "die", "machen", "Unfug", "Vergn??gen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4PN", block: 2, type: "PN", data: ["froh", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5NU", block: 2, type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E21_V2_6PU", block: 2, type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "56_V2_7NP", block: 2, type: "PN", data: ["man", "Falsche", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2 }, 
            { itemID: "O9R_V2_8UN", block: 2, type: "NU", data: ["nah", "sehr", "Zukunft", "die", "d??ster", "ist"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E12_V2_9PU", block: 2, type: "PU", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "bearbeiten"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "E7_V2_10NP", block: 2, type: "PN", data: ["verloren", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1 }, 
            //block 3
            { itemID: "O1r_V2_1PU", block: 3, type: "PU", data: ["gl??cklich", "irgendwann", "mal", "werde", "ich", "ausmisten"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E24_V2_1NP", block: 3, type: "PN", data: ["Sorgen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "O4_V2_2UN", block: 3, type: "NU", data: ["zu tun", "habe", "gew??hnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "O6r_V2_2UP", block: 3, type: "PU", data: ["notiert", "gro??e", "W??nsche", "werden", "sehr", "erf??llt"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "A2_V2_3NP", block: 3, type: "PN", data: ["bin ", "einfach", "manchmal", "ich", "traurig", "gl??cklich"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E14_V2_3NU", block: 3, type: "NU", data: ["Zukunft", "in", "alles", "wird", "moderner", "schwerer"], polarity: 1, pos: 5, neg: 6 }, 
            { itemID: "E1_V2_4UP", block: 3, type: "PU", data: ["Sachen", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1 }, 
            { itemID: "E2_V2_4PN", block: 3, type: "PN", data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E16_V2_5UN", block: 3, type: "NU", data: ["mal", "einkaufen", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4 }, 
            { itemID: "R19_V2_5UP", block: 3, type: "PU", data: ["gibt", "Meinungen", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2 }, 
            { itemID: "E22_V2_6NP", block: 3, type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3 }, 
            { itemID: "O7_V2_6NU", block: 3, type: "NU", data: ["meine", "werde", "setzen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5 }, 
            { itemID: "E4_V2_7UP", block: 3, type: "PU", data: ["bin", "anwesend", "fast", "ich", "immer", "flei??ig"], polarity: -1, pos: 6, neg: 2 }, 
            { itemID: "O11_V2_7PN", block: 3, type: "PN", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 }, 
            { itemID: "E10_V2_8UN", block: 3, type: "NU", data: ["suchen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5 }, 
            { itemID: "E11_V2_8PU", block: 3, type: "PU", data: ["unver??ndert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1 }, 
            { itemID: "E13_V2_9NP", block: 3, type: "PN", data: ["stehen", "Chancen", "echt", "schlecht", "die", "gro??artig"], polarity: 1, pos: 6, neg: 4 }, 
            { itemID: "E23_V2_9UN", block: 3, type: "NU", data: ["wird", "Akku", "gleich", "angezeigt", "der", "leer"], polarity: 1, pos: 4, neg: 6 }, 
            { itemID: "A6R_V2_10PU", block: 3, type: "PU", data: ["Zuversicht", "ist", "Termine", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3 }, 
            { itemID: "O5_V2_10NP", block: 3, type: "PN", data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1 }, 
            { itemID: "O10r_V2_1UN", block: 3, type: "NU", data: ["regelm????ig", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6 }, 
            { itemID: "E15_V2_2UP", block: 3, type: "PU", data: ["erreichbar", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1 }, 
            { itemID: "E20_V2_3NP", block: 3, type: "PN", data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergn??gen"], polarity: 1, pos: 6, neg: 5 }, 
            { itemID: "E18_V2_4UN", block: 3, type: "NU", data: ["unterwegs", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2 }, 
            { itemID: "E8_V2_5UP", block: 3, type: "PU", data: ["meine", "weitergehen", "Anstrengungen", "gesch??tzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2 }, 
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
            { itemID: "O6r_V2_2NU", block: 4, type: "NU", data: ["zerst??rt", "gro??e", "W??nsche", "werden", "sehr", "notiert"], polarity: 1, pos: 6, neg: 1                  },
            { itemID: "E1_V2_4NU", block: 4, type: "NU", data: ["Schuld", "Sachen", "mir", "sie", "die", "geben"], polarity: -1, pos:2, neg: 1                              },
            { itemID: "R19_V2_5NU", block: 4, type: "NU", data: ["gibt", "Probleme", "neue", "Meinungen", "es", "viele"], polarity: 1, pos: 4, neg: 2                       },
            { itemID: "E4_V2_7NU", block: 4, type: "NU", data: ["bin", "schuld", "fast", "ich", "immer", "anwesend"], polarity: -1, pos: 6, neg: 2                          },
            { itemID: "E11_V2_8UN", block: 4, type: "NU", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "unver??ndert", "meine"], polarity: 1, pos: 5, neg: 1       },
            { itemID: "A6R_V2_10UN", block: 4, type: "NU", data: ["Termine", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                      },
            { itemID: "E15_V2_2NU", block: 4, type: "NU", data: ["gescheitert", "bin", "immer", "ich", "fast", "erreichbar"], polarity: 1, pos: 6, neg: 1                   },
            { itemID: "E8_V2_5NU", block: 4, type: "NU", data: ["meine", "verpuffen", "Anstrengungen", "weitergehen", "sicher", "werden"], polarity: 1, pos: 4, neg: 2      },
            { itemID: "O9R_V2_8UN", block: 4, type: "NU", data: ["nah", "sehr", "Zukunft", "die", "d??ster", "ist"], polarity: -1, pos: 1, neg: 5                            },
            { itemID: "O4_V2_2UN", block: 4, type: "NU", data: ["zu tun", "habe", "gew??hnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6                  },
            { itemID: "E14_V2_3NU", block: 4, type: "NU", data: ["Zukunft", "in", "alles", "wird", "moderner", "schwerer"], polarity: 1, pos: 5, neg: 6                     },
            { itemID: "E16_V2_5UN", block: 4, type: "NU", data: ["mal", "einkaufen", "werde", "beschuldigt", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                 },
            { itemID: "O7_V2_6NU", block: 4, type: "NU", data: ["meine", "werde", "setzen", "Ziele", "verfehlen", "ich"], polarity: -1, pos: 3, neg: 5                      },
            { itemID: "E10_V2_8UN", block: 4, type: "NU", data: ["suchen", "ich", "Anschluss", "den", "verpassen", "werde"], polarity: -1, pos: 1, neg: 5                  },
            { itemID: "E23_V2_9UN", block: 4, type: "NU", data: ["wird", "Akku", "gleich", "angezeigt", "der", "leer"], polarity: 1, pos: 4, neg: 6                         },
            { itemID: "O10r_V2_1UN", block: 4, type: "NU", data: ["regelm????ig", "meistens", "sind", "Seminare", "meine", "sinnlos"], polarity: -1, pos: 1, neg: 6           },
            { itemID: "E18_V2_4UN", block: 4, type: "NU", data: ["unterwegs", "schuld", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                      },
            { itemID: "56_V2_7NU", block: 4, type: "NU", data: ["man", "Falsche", "das", "tut", "meist", "Notwendige"], polarity: 1, pos: 6, neg: 2                         },
            { itemID: "E7_V2_10NU", block: 4, type: "NU", data: ["verloren", "viel", "verwaltet", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                      },
            //block 5
            { itemID: "O1r_V2_1PN", block: 5, type: "PN", data: ["gl??cklich", "irgendwann", "mal", "werde", "ich", "sterben"], polarity: -1, pos: 1, neg: 6                 },
            { itemID: "O6r_V2_2NP", block: 5, type: "PN", data: ["zerst??rt", "gro??e", "W??nsche", "werden", "sehr", "erf??llt"], polarity: 1, pos: 6, neg: 1                  },
            { itemID: "E1_V2_4NP", block: 5, type: "PN", data: ["Schuld", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1                          },
            { itemID: "R19_V2_5NP", block: 5, type: "PN", data: ["gibt", "Probleme", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2                         },
            { itemID: "E4_V2_7NP", block: 5, type: "PN", data: ["bin", "schuld", "fast", "ich", "immer", "flei??ig"], polarity: -1, pos: 6, neg: 2                           },
            { itemID: "E11_V2_8PN", block: 5, type: "PN", data: ["hoffnungslos", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1           },
            { itemID: "A6R_V2_10PN", block: 5, type: "PN", data: ["Zuversicht", "ist", "Trauer", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                   },
            { itemID: "E15_V2_2NP", block: 5, type: "PN", data: ["gescheitert", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1                    },
            { itemID: "E8_V2_5NP", block: 5, type: "PN", data: ["meine", "verpuffen", "Anstrengungen", "gesch??tzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2        },
            { itemID: "O9r_V2_8PN", block: 5, type: "PN", data: ["rosig", "sehr", "Zukunft", "die", "d??ster", "ist"], polarity: -1, pos: 1, neg: 5                          },
            { itemID: "O4_V2_2PN", block: 5, type: "PN", data: ["Erfolg", "habe", "gew??hnlich", "ich", "viel", "Misserfolg"], polarity: -1, pos: 1, neg: 6                  },
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
            { itemID: "A2_V2_3NP", block: 5, type: "PN", data: ["bin ", "einfach", "manchmal", "ich", "traurig", "gl??cklich"], polarity: 1, pos: 6, neg: 5                  },
            { itemID: "E2_V2_4PN", block: 5, type: "PN", data: ["erwischt", "verpasst", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                          },
            { itemID: "E22_V2_6NP", block: 5, type: "PN", data: ["noch", "wir", "Strafe", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3                  },
            { itemID: "O11_V2_7PN", block: 5, type: "PN", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "aussichtslos"], polarity: -1, pos: 2, neg: 6 },
            { itemID: "E13_V2_9NP", block: 5, type: "PN", data: ["stehen", "Chancen", "echt", "schlecht", "die", "gro??artig"], polarity: 1, pos: 6, neg: 4                  },
            { itemID: "O5_V2_10NP", block: 5, type: "PN", data: ["verpasst", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1               },
            { itemID: "E20_V2_3NP", block: 5, type: "PN", data: ["Kinder", "viel", "die", "machen", "Kummer", "Vergn??gen"], polarity: 1, pos: 6, neg: 5                     },
            { itemID: "E21_V2_6PN", block: 5, type: "PN", data: ["jetzt", "ist", "vielversprechend", "Lage", "aussichtslos", "meine"], polarity: -1, pos: 3, neg: 5         },
            { itemID: "E12_V2_9PN", block: 5, type: "PN", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "vermasseln"], polarity: 1, pos: 4, neg: 6                 },
            //block 6
            { itemID: "O4_V2_2PU", block: 6, type: "PU", data: ["Erfolg", "habe", "gew??hnlich", "ich", "viel", "zu tun"], polarity: -1, pos: 1, neg: 6                      },
            { itemID: "E14_V2_3UP", block: 6, type: "PU", data: ["Zukunft", "in", "alles", "wird", "angenehmer", "moderner"], polarity: 1, pos: 5, neg: 6                   },
            { itemID: "E16_V2_5PU", block: 6, type: "PU", data: ["mal", "bewundert", "werde", "einkaufen", "ich", "wieder"], polarity: -1, pos: 2, neg: 4                   },
            { itemID: "O7_V2_6UP", block: 6, type: "PU", data: ["meine", "werde", "erreichen", "Ziele", "setzen", "ich"], polarity: -1, pos: 3, neg: 5                      },
            { itemID: "E10_V2_8PU", block: 6, type: "PU", data: ["erreichen", "ich", "Anschluss", "den", "suchen", "werde"], polarity: -1, pos: 1, neg: 5                  },
            { itemID: "E23_V2_9PU", block: 6, type: "PU", data: ["wird", "Akku", "gleich", "voll", "der", "angezeigt"], polarity: 1, pos: 4, neg: 6                         },
            { itemID: "O10r_V2_1PU", block: 6, type: "PU", data: ["sinnvoll", "meistens", "sind", "Seminare", "meine", "regelm????ig"], polarity: -1, pos: 1, neg: 6          },
            { itemID: "E18_V2_4PU", block: 6, type: "PU", data: ["froh", "unterwegs", "bin", "immer", "wieder", "ich"], polarity: -1, pos: 1, neg: 2                        },
            { itemID: "56_V2_7UP", block: 6, type: "PU", data: ["man", "Notwendige", "das", "tut", "meist", "Richtige"], polarity: 1, pos: 6, neg: 2                        },
            { itemID: "E7_V2_10UP", block: 6, type: "PU", data: ["verwaltet", "viel", "verdient", "ich", "Geld", "habe"], polarity: -1, pos: 3, neg: 1                      },
            { itemID: "E24_V2_1PU", block: 6, type: "PU", data: ["Unterlagen", "viele", "habe", "sehr", "ich", "Chancen"], polarity: 1, pos: 6, neg: 1                      },
            { itemID: "A2_V2_3UP", block: 6, type: "PU", data: ["bin", "einfach", "manchmal", "ich", "bummeln", "gl??cklich"], polarity: 1, pos: 6, neg: 5                   },
            { itemID: "E2_V2_4PU", block: 6, type: "PU", data: ["erwischt", "gesehen", "den", "habe", "ich", "Zug"], polarity: -1, pos: 1, neg: 2                           },
            { itemID: "E22_V2_6UP", block: 6, type: "PU", data: ["noch", "wir", "Benachrichtigung", "bekommen", "Auszeichnung", "eine"], polarity: 1, pos: 5, neg: 3        },
            { itemID: "O11_V2_7PU", block: 6, type: "PU", data: ["meine", "professionell", "sind", "Bewerbungen", "bestimmt", "angekommen"], polarity: -1, pos: 2, neg: 6   },
            { itemID: "E13_V2_9UP", block: 6, type: "PU", data: ["stehen", "Chancen", "echt", "offen", "die", "gro??artig"], polarity: 1, pos: 6, neg: 4                     },
            { itemID: "O5_V2_10UP", block: 6, type: "PU", data: ["aufgezeigt", "die", "genutzt", "meistens", "Chancen", "werden"], polarity: -1, pos: 3, neg: 1             },
            { itemID: "E20_V2_3UP", block: 6, type: "PU", data: ["Kinder", "viel", "die", "machen", "Unfug", "Vergn??gen"], polarity: 1, pos: 6, neg: 5                      },
            { itemID: "E21_V2_6PU", block: 6, type: "PU", data: ["jetzt", "ist", "vielversprechend", "Lage", "anders", "meine"], polarity: -1, pos: 3, neg: 5               },
            { itemID: "E12_V2_9PU", block: 6, type: "PU", data: ["das", "Projekt", "ich", "hinkriegen", "werde", "bearbeiten"], polarity: 1, pos: 4, neg: 6                 },
            { itemID: "O1r_V2_1PU", block: 6, type: "PU", data: ["gl??cklich", "irgendwann", "mal", "werde", "ich", "ausmisten"], polarity: -1, pos: 1, neg: 6               },
            { itemID: "O6r_V2_2UP", block: 6, type: "PU", data: ["notiert", "gro??e", "W??nsche", "werden", "sehr", "erf??llt"], polarity: 1, pos: 6, neg: 1                   },
            { itemID: "E1_V2_4UP", block: 6, type: "PU", data: ["Sachen", "Geschenke", "mir", "sie", "die", "geben"], polarity: -1, pos: 2, neg: 1                          },
            { itemID: "R19_V2_5UP", block: 6, type: "PU", data: ["gibt", "Meinungen", "neue", "Chancen", "es", "viele"], polarity: 1, pos: 4, neg: 2                        },
            { itemID: "E4_V2_7UP", block: 6, type: "PU", data: ["bin", "anwesend", "fast", "ich", "immer", "flei??ig"], polarity: -1, pos: 6, neg: 2                         },
            { itemID: "E11_V2_8PU", block: 6, type: "PU", data: ["unver??ndert", "aktuelle", "Situation", "ist", "optimal", "meine"], polarity: 1, pos: 5, neg: 1            },
            { itemID: "A6R_V2_10PU", block: 6, type: "PU", data: ["Zuversicht", "ist", "Termine", "voller", "Leben", "mein"], polarity: -1, pos: 1, neg: 3                  },
            { itemID: "E15_V2_2UP", block: 6, type: "PU", data: ["erreichbar", "bin", "immer", "ich", "fast", "siegreich"], polarity: 1, pos: 6, neg: 1                     },
            { itemID: "E8_V2_5UP", block: 6, type: "PU", data: ["meine", "weitergehen", "Anstrengungen", "gesch??tzt", "sicher", "werden"], polarity: 1, pos: 4, neg: 2      },
            { itemID: "O9R_V2_8PU", block: 6, type: "PU", data: ["rosig", "sehr", "Zukunft", "die", "nah", "ist"], polarity: -1, pos: 1, neg: 5                             }
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
