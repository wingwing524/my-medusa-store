@echo off
echo ========================================
echo Starting E-Commerce App
echo ========================================
echo.
echo Starting Backend (Medusa)...
echo Backend will run on: http://localhost:9000
echo Admin will run on: http://localhost:9000/app
echo.
echo Starting Storefront (Next.js)...
echo Storefront will run on: http://localhost:8000
echo.
echo ========================================
echo Both servers have hot reload enabled!
echo Press Ctrl+C to stop all servers
echo ========================================
echo.

REM Start backend in new window
start "Medusa Backend" cmd /k "cd /d %~dp0backend && npm run dev"

REM Wait 3 seconds for backend to initialize
timeout /t 3 /nobreak > nul

REM Start storefront in new window
start "Next.js Storefront" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo All servers are starting...
echo Check the new terminal windows!
echo ========================================
echo.
echo To stop: Close the terminal windows or press Ctrl+C in each
pause
