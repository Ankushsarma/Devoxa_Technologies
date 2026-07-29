@echo off
setlocal

cd /d "%~dp0"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo This folder is not a Git repository.
    goto :failed
)

echo.
set "commit_message="
set /p "commit_message=What did you change? "
if not defined commit_message set "commit_message=Quick update"

echo.
echo Adding all changes...
git add -A
if errorlevel 1 goto :failed

git diff --cached --quiet
if not errorlevel 1 (
    echo No new changes were found.
    goto :done
)

echo Saving changes...
git commit -m "%commit_message%"
if errorlevel 1 goto :failed

echo Pushing to GitHub...
git push
if errorlevel 1 goto :failed

echo.
echo Success! All changes are now on GitHub.
goto :done

:failed
echo.
echo Something went wrong. Read the message above for details.
pause
exit /b 1

:done
echo.
pause
exit /b 0
