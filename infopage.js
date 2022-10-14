/* infopage module for the haystack system */

if (undefined === window.hayStack) window.hayStack = {}; 

//The infopage frame object
hayStack.infopage = {};

//continuation factory for single trial (for external use)
hayStack.infopage.simpleContinuationFactory = function(trial) {
    return function() {
        hayStack.view.setTemplate("infopage", "infopageStyle");
        var data = trial.data;
        if (data.length < 2) data.push("fortsetzen");
        hayStack.view.set(data[0], "infotext");
        hayStack.view.set(data[1], "infobtn");
        if (undefined !== trial.headerText) 
            hayStack.view.set(trial.headerText, "header");
        if (undefined !== trial.footerText) 
            hayStack.view.set(trial.footerText, "footer");
        document.getElementById("infobtn").onmousedown = hayStack.continuations.next;
    }
}

//a continuation to display a message
hayStack.infopage.messageContinuationFactory = function(errMsg) {
    return function() {
        hayStack.view.setTemplate("infopage", "infopageStyle");
        hayStack.view.set(errMsg, "infotext");
        hayStack.view.set("stopped", "infobtn");
        hayStack.view.set(trial.headerText, "ERROR");
        document.getElementById("infobtn").onmousedown = hayStack.continuations.next;
    }
}
