(async function () {
    "use strict";

    const defaultTemplate = "{title} - {hostname}"

    function render(template, values) {
        return template.replace(/{([a-z]+?)}/ig, (match, key) => {
            return values.hasOwnProperty(key) ? values[key] : match;
        });
    }

    async function setTitle(windowId, tab) {
        try {
            let url = new URL(tab.url);
            let values = {
                title: tab.title,
                hash: url.hash,
                host: url.host,
                hostname: url.hostname,
                href: url.href,
                origin: url.origin,
                pathname: url.pathname,
                port: url.port ? ":" + url.port : "",
                portnumber: url.port,
                protocol: url.protocol.replace(":", ""),
                search: url.search
            }

            //A suffix would be nicer but that isn't currently supported.
            let results = await browser.storage.local.get({ template: defaultTemplate });
            let update = { titlePreface: " " }; //For some reason titlePreface = "", null, or undefined doesn't clear it, but spaces seem to get trimmed so this works.
            if (url && results.template !== "" && ["http:", "https:"].indexOf(url.protocol) !== -1) { //Other protocols?
                update.titlePreface = render(results.template, values) + " - ";
            }
            await browser.windows.update(windowId, update);
        } catch (error) {
            console.error(error);
        }
    }

    //Set the title for all current windows.
    try {
        let windows = await browser.windows.getAll({ windowTypes: ["normal", "popup"], populate: true });
        windows.forEach(async ($window) => {
            await setTitle($window.id, $window.tabs.find((tab) => tab.active));
        });
    } catch (error) {
        console.error(error);
    }

    //Set the title when the active tab changes.
    browser.tabs.onActivated.addListener(async (activeInfo) => {
        try {
            await setTitle(activeInfo.windowId, await browser.tabs.get(activeInfo.tabId));
        } catch (error) {
            console.error(error);
        }
    });

    //Set the title when the active tab's url changes.
    browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        if (tab.active) {
            await setTitle(tab.windowId, tab);
        }
    });
}());
