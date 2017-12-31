(function () {
    "use strict";

    let injectTitle = document.getElementById("inject-title");
    injectTitle.addEventListener("change", function () {
        browser.storage.local.set({ injectTitle: this.checked }).then(null, error => console.error(error));
        //Do we want to send a message to already loaded tabs when the setting changes?  Probably not worth it.
    });

    let prependTitle = document.getElementById("prepend-title");
    prependTitle.addEventListener("change", function () {
        browser.storage.local.set({ prependTitle: this.checked }).then(null, error => console.error(error));
    });

    document.addEventListener("DOMContentLoaded", () => {
        browser.storage.local.get({
            injectTitle: false,
            prependTitle: false
        }).then(results => {
            injectTitle.checked = results.injectTitle;
            prependTitle.checked = results.prependTitle;
        }, error => console.error(error));
    });
}());
