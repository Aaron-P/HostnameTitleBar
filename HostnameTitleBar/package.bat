@echo off
cd .\HostnameTitleBar

rmdir /S /Q ..\Firefox
..\7za.exe a -tzip ..\Firefox\HostnameTitleBar.zip ^
	background.js^
	content.js^
	icon.svg^
	LICENSE.md^
	manifest.json^
	options.html^
	options.js^
	README.md
