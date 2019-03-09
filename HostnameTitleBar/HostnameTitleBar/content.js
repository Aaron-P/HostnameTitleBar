(async function () {
    "use strict";

    try {
        let results = await browser.storage.local.get({ injectTitle: false });
        if (results.injectTitle && document.title === "") {
            //This seems to trigger another bug.  If the title is made the same as it would be if the document had no title then the window title text is still not changed.
            // let url;
            // try {
            //     url = new URL(document.location.href);
            // } catch (error) { }

            // if (url) {
            //     document.title = url.href.replace(new RegExp("^" + url.protocol + "//"), "")
            // } else {
            //     document.title = document.location.href;
            // }

            //This only fixes the title on first load.  If a page deliberatly sets it's title to "" or deletes all the title tags later it will still cause the bug.
            //Do we want to actively monitor pages to make sure we keep a non-blank title?
            document.title = document.location.href;
        }
    } catch (error) {
        console.error(error);
    }
}());
