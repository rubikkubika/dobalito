@echo off
REM Dobalito - Railway Deployment Script for Windows

echo.
echo ========================================
echo рџљЂ DOBALITO - RAILWAY DEPLOYMENT
echo ========================================
echo.

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo вќЊ Railway CLI not found. Please install it first:
    echo    npm install -g @railway/cli
    echo    or visit: https://docs.railway.app/develop/cli
    pause
    exit /b 1
)

REM Login to Railway
echo рџ”ђ Logging into Railway...
railway login

REM Deploy backend
echo рџљЂ Deploying backend to Railway...
railway up --service backend

echo.
echo ========================================
echo вњ… DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo рџЊђ Your backend is now live on Railway!
echo рџ“Љ Check status: railway status
echo рџ“ќ View logs: railway logs
echo рџ”§ Open dashboard: railway open
echo.
pause
