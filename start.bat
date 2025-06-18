@echo off
REM filepath: c:\Projects\New folder\L1\blog\start.bat

REM Open terminal for the React app (client)
start "React App" cmd /k "cd /d %~dp0client && npm run dev"

REM Open terminal for the Posts app
start "Posts App" cmd /k "cd /d %~dp0posts && npm start"

REM Open terminal for the Comments app
start "Comments App" cmd /k "cd /d %~dp0comments && npm start"

REM Open terminal for the Comments app
start "EventBus App" cmd /k "cd /d %~dp0event-bus && npm start"

REM Open terminal for the Comments app
start "Query App" cmd /k "cd /d %~dp0query && npm start"

REM Open terminal for the Moderation app
start "Moderation App" cmd /k "cd /d %~dp0moderation && npm start"