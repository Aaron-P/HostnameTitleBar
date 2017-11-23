@echo off
cd .\HostnameTitleBar

rmdir /S /Q ..\Firefox
..\7za.exe a -tzip ..\Firefox\HostnameTitleBar.zip ^
	..\..\LICENSE.md^
	..\..\README.md^
	background.js^
	content.js^
	icon.svg^
	manifest.json^
	options.html^
	options.js
