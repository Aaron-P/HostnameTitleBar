(function () {
    "use strict";

    function setTitle(windowId, tab) {
        let url;
        try {
            url = new URL(tab.url);
        } catch (error) { }

        let title = tab.title;

        //A suffix would be nicer but that isn't currently supported.
        browser.storage.local.get({ prependTitle: false }).then(results => {
            let update = { titlePreface: " " }; //For some reason titlePreface = "", null, or undefined doesn't clear it, but spaces seem to get trimmed so this works.
            if (url && ["http:", "https:"].indexOf(url.protocol) !== -1) { //Other protocols?
                update.titlePreface = (results.prependTitle && title ? title + " - " : "") + url.hostname + " - "; //Customize?
            }
            browser.windows.update(windowId, update).then(null, error => console.error(error));
        });
    }

    //Set the title for all current windows.
    browser.windows.getAll({ windowTypes: ["normal", "popup"], populate: true }).then(windows => {
        windows.forEach($window => {
            setTitle($window.id, $window.tabs.find(tab => tab.active));
        });
    }, error => console.error(error));

    //Set the title when the active tab changes.
    browser.tabs.onActivated.addListener(activeInfo => {
        browser.tabs.get(activeInfo.tabId).then(tab => {
            setTitle(activeInfo.windowId, tab);
        }, error => console.error(error));
    });

    //Set the title when the active tab's url changes.
    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.active) {
            setTitle(tab.windowId, tab);
        }
    });
}());
