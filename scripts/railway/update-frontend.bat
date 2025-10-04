@echo off
REM Update frontend configuration with Railway backend URL

echo.
echo ========================================
echo рџ”§ UPDATING FRONTEND CONFIG
echo ========================================
echo.

set /p RAILWAY_URL="Enter your Railway backend URL (e.g., https://dobalito-backend-production.up.railway.app): "

if "%RAILWAY_URL%"=="" (
    echo вќЊ URL cannot be empty!
    pause
    exit /b 1
)

echo рџ“ќ Updating frontend configuration...
powershell -Command "(Get-Content 'frontend/lib/core/config/env_config.dart') -replace 'http://localhost:8080', '%RAILWAY_URL%' | Set-Content 'frontend/lib/core/config/env_config.dart'"

echo вњ… Frontend configuration updated!
echo рџ"„ Now rebuild and redeploy frontend to Railway
echo.
pause
