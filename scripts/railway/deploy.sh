#!/bin/bash

# Dobalito - Railway Deployment Script

echo ""
echo "========================================"
echo "рџљЂ DOBALITO - RAILWAY DEPLOYMENT"
echo "========================================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "вќЊ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    echo "   or visit: https://docs.railway.app/develop/cli"
    exit 1
fi

# Login to Railway
echo "рџ”ђ Logging into Railway..."
railway login

# Deploy backend
echo "рџљЂ Deploying backend to Railway..."
railway up --service backend

echo ""
echo "========================================"
echo "вњ… DEPLOYMENT COMPLETE!"
echo "========================================"
echo ""
echo "рџЊђ Your backend is now live on Railway!"
echo "рџ“Љ Check status: railway status"
echo "рџ“ќ View logs: railway logs"
echo "рџ”§ Open dashboard: railway open"
echo ""
