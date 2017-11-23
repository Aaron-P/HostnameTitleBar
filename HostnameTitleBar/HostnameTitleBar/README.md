This extension adds the hostname of the currently active tab to the front of the window's title.  For example, if you are viewing example.com the window title will be "example.com - {page title} - Mozilla Firefox".

This makes it possible to use the autotype feature of [KeePass](https://keepass.info/), [KeePassX](https://www.keepassx.org/), or [KeePassXC](https://keepassxc.org/).

Unlike similar extensions, the core behavior of this extension does not interfere with the title of a page or interact with a page's DOM, so it shouldn't break any websites.  There are currently two bugs that affect this extension:

* [1387425](https://bugzilla.mozilla.org/show_bug.cgi?id=1387425) causes the title of the window to not have the hostname in it if the active page of that window doesn't have a title.  There is an optional workaround for this bug in the extension's options, but even then it can still occur if a page deliberatly sets it's title to nothing later.
* [1396010](https://bugzilla.mozilla.org/show_bug.cgi?id=1396010) is related to the positioning of the text.  It is currently only possible to prepend text to a window's title, so the hostname cannot currently be put anywhere but the front.

Icon designed by [Freepik](https://www.flaticon.com/free-icon/domain-registration_268983) from Flaticon
