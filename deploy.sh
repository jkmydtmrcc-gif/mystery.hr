#!/bin/bash

# ===========================================
# MYSTERY.HR - VPS DEPLOYMENT SCRIPT
# ===========================================

echo "=========================================="
echo "  MYSTERY.HR - VPS DEPLOYMENT"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}Error: .env.local file not found!${NC}"
    echo "Please copy .env.production.example to .env.local and configure it"
    echo "  cp .env.production.example .env.local"
    exit 1
fi

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install --legacy-peer-deps

echo -e "${YELLOW}Step 2: Building the application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed! Please check the errors above.${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 3: Seeding the database...${NC}"
npm run seed:all

echo -e "${GREEN}=========================================="
echo "  BUILD COMPLETE!"
echo "==========================================${NC}"
echo ""
echo "To start the server, run:"
echo "  npm start"
echo ""
echo "Or for production with PM2:"
echo "  pm2 start ecosystem.config.js"
echo ""
echo "Your site will be available at:"
echo "  http://YOUR_VPS_IP:3000"
