@echo off
echo ========================================
echo Installing Additional Dependencies
echo ========================================
echo.

cd c:\Users\sim\Desktop\github\eshop\my-medusa-store-storefront

echo Installing js-cookie for language switcher...
npm install js-cookie @types/js-cookie

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Restart the development server
echo 2. Set up regions in Medusa admin
echo 3. Add language switcher to header
echo.
pause
