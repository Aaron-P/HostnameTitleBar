(async function () {
    Services.obs.addObserver({
        observe: async function (aSubject) {
            let args = aSubject.args;
            if (["promptUserAndPass", "promptPassword"].indexOf(args.promptType) === -1)
                return;

            let openerUrlMatch = args.text.match(/^https?:\/\/[^ ]+/);
            if (openerUrlMatch.length === 0)
                return;

            try {
                let url = new URL(openerUrlMatch[0]);
                aSubject.document.title += " - " + url.hostname;
            } catch (e) { }

            //TODO: It would be nice to get the url from the opener.gBrowser.currentTab but
            //I'm not sure how to do that on initial load, all I can find is about:blank.
            
            //console.log(aSubject)
            //console.log(aSubject.opener);
            //console.log(aSubject.opener.gBrowser);
            //console.log(aSubject.opener.gBrowser.currentURI); //This isn't the url of the tab the auth is happening on.
        }
    }, "common-dialog-loaded", false);
}());