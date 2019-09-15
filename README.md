This extension allows you to configure the window title to include the hostname or other parts of the page url of the currently active tab.  For example, if you are viewing example.com the window title could be "Example Domain - example.com - Mozilla Firefox".

This makes it possible to use the autotype feature of [KeePass](https://keepass.info/), [KeePassX](https://www.keepassx.org/), or [KeePassXC](https://keepassxc.org/).

Unlike similar extensions, the core behavior of this extension does not interfere with the title of a page or interact with a page's DOM, so it shouldn't break any websites.  There are currently two bugs that affect this extension:

* [1387425](https://bugzilla.mozilla.org/show_bug.cgi?id=1387425) causes the title of the window to not be changed if the active page of that window doesn't have a title.  There is an optional workaround for this bug in the extension's options, but even then it can still occur if a page deliberatly sets it's title to nothing later.
* [1396010](https://bugzilla.mozilla.org/show_bug.cgi?id=1396010) is related to the positioning of the text.  It is currently only possible to prepend text to a window's title, so the hostname cannot currently be put anywhere but the front.  There is an optional workaround for this bug in the extension's options, but it only works on Windows and Linux.

Icon made by [Freepik](https://www.freepik.com/) from Flaticon is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
