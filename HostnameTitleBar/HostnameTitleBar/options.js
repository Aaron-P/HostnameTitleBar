(function () {
    "use strict";

    let checkbox = document.getElementById("inject-title");
    checkbox.addEventListener("change", function () {
        browser.storage.local.set({ injectTitle: this.checked }).then(null, error => console.error(error));
        //Do we want to send a message to already loaded tabs when the setting changes?  Probably not worth it.
    });

    document.addEventListener("DOMContentLoaded", () => {
        browser.storage.local.get({ injectTitle: false }).then(results => {
            checkbox.checked = results.injectTitle;
        }, error => console.error(error));
    });
}());
