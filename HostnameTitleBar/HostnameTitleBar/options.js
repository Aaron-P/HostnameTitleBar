(async function () {
    "use strict";

    const defaultTemplate = "{title} - {hostname}"
    const exampleTitle = "Example Domain";
    const exampleUrl = new URL("https://www.example.com:8080/path?search=1#hash");
    const exampleValues = {
        title: exampleTitle,
        hash: exampleUrl.hash,
        host: exampleUrl.host,
        hostname: exampleUrl.hostname,
        href: exampleUrl.href,
        origin: exampleUrl.origin,
        pathname: exampleUrl.pathname,
        port: exampleUrl.port ? ":" + exampleUrl.port : "",
        portnumber: exampleUrl.port,
        protocol: exampleUrl.protocol.replace(":", ""),
        search: exampleUrl.search
    }

    function render(template, values) {
        return template.replace(/{([a-z]+?)}/ig, (match, key) => {
            return values.hasOwnProperty(key) ? values[key] : match;
        });
    }

    function preview(template) {
        document.getElementById("preview").value = render(template + (template !== "" ? " - " : "") + "{title} - Mozilla Firefox", exampleValues);
    }

    //TODO: Make these parts clickable and insert at cursor, not easy to do.
    document.querySelectorAll(".part-list li").forEach((li) => {
        li.addEventListener("mouseover", () => {
            document.getElementById(li.dataset.for).style.color = "#ff0000";
        });
        li.addEventListener("mouseout", () => {
            document.getElementById(li.dataset.for).style.color = "";
        });
    });

    let injectTitle = document.getElementById("inject-title");
    injectTitle.addEventListener("change", async (e) => {
        try {
            await browser.storage.local.set({ injectTitle: e.target.checked });
            //Do we want to send a message to already loaded tabs when the setting changes?  Probably not worth it.
        } catch (error) {
            console.error(error);
        }
    });

    let template = document.getElementById("template");
    template.addEventListener("keyup", async (e) => {
        try {
            await browser.storage.local.set({ template: e.target.value });
            preview(e.target.value);
        } catch (error) {
            console.error(error);
        }
    });

    document.getElementById("reset").addEventListener("click", () => {
        template.value = defaultTemplate;
        template.dispatchEvent(new Event("keyup"));
    });

    document.addEventListener("DOMContentLoaded", async () => {
        try {
            var results = await browser.storage.local.get({
                injectTitle: false,
                template: defaultTemplate
            });
            injectTitle.checked = results.injectTitle;
            template.value = results.template;
            preview(results.template);
        } catch (error) {
            console.error(error);
        }
    });
}());
