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

    This script collects the SST revision 2 sentences.
    */

    SSTValidationV2 : {			
        frame: "SST",
		description: "SST depression, validation set",	
        version: "2.0",	
        timeout: 7500,
        timeRefractory: 400,
        randomOrder: true,  
        randomBlock: [1, 2, 3, 4, 5, 6], //6 blocks to select at random.
        skipOutput: false,  

		trials: [
            //instruction
            { frame: "infopage", randomOrder: false, itemID: "startinstruct", type: "info", timeout: 0,
                data: ["Ihnen werden in der nächsten Aufgabe immer sechs Kästchen nebeneinander präsentiert. Diese " +
                "Kästchen beinhalten Wörter in einer durcheinandergewürfelten Reihenfolge. Aus diesen " + 
                "Wörtern können Sie verschiedene Sätze bilden. Für die Bildung eines Satzes brauchen Sie " +
                "nicht alle Wörter.<br><br>" +
                "Bilden Sie im Kopf aus den Wörtern einen Satz und klicken Sie auf " +
                "das eine Wort, das Sie an das Ende des Satzes setzen würden. " +
                "Nachdem Sie ein Wort angetippt haben kommen Sie automatisch zum nächsten Satz. " + 
                "Versuchen Sie bitte so intuitiv wie möglich zu entscheiden.<br><br>" + 
                "Wenn Sie bei dieser Studie Ihr Smartphone verwenden, legen Sie es am besten quer.<br><br>" + 
                "Sie bekommen nun eine Sequenz von Sätzen präsentiert, diese dienen zur Übung. Anschließend " + 
                "folgt die Sequenz, welche dann zur Auswertung der Daten verwendet wird.<br><br>" + 
                "Nehmen Sie sich bei der Übung so viel Zeit wie Sie brauchen. Nach der Übungsphase " + 
                "haben Sie 7.5 Sekunden Zeit, um eine Alternative zu wählen."]},
            //practice trials. Override timeout and remove it. Override skipOutput.
            { randomOrder: false, skipOutput: true, itemID: "Pr01", type: "AP", timeout: 0,
                data: ["warten", "wir", "lange", "können", "sitzen", "nun"], polarity: -1, pos: 1, neg: 5 },
            { randomOrder: false, skipOutput: true, itemID: "Pr02", type: "AP", timeout: 0,
                data: ["werde", "Ich", "Post", "fahren", "zur", "gehen"], polarity: -1, pos: 4, neg: 6},
            { frame: "infopage", randomOrder: false, itemID: "instructtimeout", type: "info", timeout: 0,
                data: ["Man hat in dem Test 7.5 Sek. um zu antworten.<br>Ab jetzt auch in der Übung.", "weiter"]},
            { randomOrder: false, skipOutput: true, itemID: "Pr03", type: "AP",
                data: ["Tisch", "Anna", "auf", "sitzt", "dem", "Stuhl"], polarity: -1, pos: 1, neg: 6 },
            { randomOrder: false, skipOutput: true, itemID: "Pr04", type: "AP",
                data: ["Hosen", "blau", "sind", "seine", "schwarz", "alle"], polarity: -1, pos: 2, neg: 4 },
            { frame: "infopage", randomOrder: false, itemID: "endinstruct", type: "info", timeout: 0,
                data: ["Die Übung ist jetzt zu Ende.<br>Klicken Sie auf 'start' um mit dem Test anzufangen.<br><br>" + 
                "Sollten Sie bei der Übung Probleme gehabt haben lesen Sie sich bitte nochmal die Anleitung durch:<br>" + 
                "Ihnen werden nun immer sechs Kästchen nebeneinander präsentiert. Diese Kästchen beinhalten " + 
                "Wörter in einer durcheinandergewürfelten Reihenfolge. Aus diesen Wörtern können Sie " +
                "verschiedene Sätze bilden. Für die Bildung eines Satzes brauchen Sie nicht alle Wörter. " + 
                "Bilden Sie im Kopf aus den Wörtern einen Satz und klicken Sie auf das eine Wort, das Sie " + 
                "an das Ende des Satzes setzen würden. Nachdem Sie ein Wort angetippt haben kommen Sie " +
                "automatisch zum nächsten Satz. Versuchen Sie bitte so intuitive wie möglich zu entscheiden.", 
                "start"]},
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
    }

};
