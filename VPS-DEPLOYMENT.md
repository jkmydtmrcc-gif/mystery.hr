# Mystery.hr - VPS Deployment Guide

Complete guide to deploy Mystery.hr on your VPS with HTTP access.

## Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Root/sudo access to VPS

---

## Step 1: Server Setup

### Install Node.js (if not installed)

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Create logs directory

```bash
mkdir -p logs
```

---

## Step 2: Upload Project Files

Upload all project files to your VPS. You can use:

### Option A: Git Clone
```bash
git clone YOUR_REPO_URL /var/www/mystery-hr
cd /var/www/mystery-hr
```

### Option B: SCP/SFTP
```bash
# From your local machine
scp -r ./mystery-hr root@YOUR_VPS_IP:/var/www/
```

### Option C: FTP Client
Use FileZilla or similar to upload files to `/var/www/mystery-hr`

---

## Step 3: Configure Environment

```bash
cd /var/www/mystery-hr

# Copy the example environment file
cp .env.production.example .env.local

# Edit with your settings
nano .env.local
```

### Required Environment Variables

```env
# MongoDB - Get this from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mysteryhr

# JWT Secret - Generate a secure random string
JWT_SECRET=your-32-character-minimum-secret-key

# Admin credentials
ADMIN_EMAIL=admin@mystery.hr
ADMIN_PASSWORD=your-secure-password

# Site URL - Replace with your VPS IP
NEXT_PUBLIC_SITE_URL=http://YOUR_VPS_IP:3000
```

---

## Step 4: Deploy

### Option A: Using deploy script (Recommended)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option B: Manual deployment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the application
npm run build

# Seed the database
npm run seed:all

# Start the server
npm start
```

---

## Step 5: Run with PM2 (Production)

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### PM2 Commands

```bash
pm2 status          # Check status
pm2 logs mystery-hr # View logs
pm2 restart mystery-hr # Restart app
pm2 stop mystery-hr    # Stop app
pm2 delete mystery-hr  # Remove from PM2
```

---

## Step 6: Configure Firewall

```bash
# Allow port 3000
sudo ufw allow 3000

# Or if using iptables
sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
```

---

## Step 7: Access Your Site

Open in browser:
```
http://YOUR_VPS_IP:3000
```

Admin panel:
```
http://YOUR_VPS_IP:3000/admin
```

Default admin credentials (change after first login):
- Email: admin@mystery.hr
- Password: (what you set in .env.local)

---

## Optional: Use Port 80 (HTTP)

To run on port 80 without a domain:

### Option A: Run Next.js on port 80 (requires root)

```bash
# Edit ecosystem.config.js and change port to 80
# Then run:
sudo pm2 start ecosystem.config.js
```

### Option B: Use Nginx as reverse proxy

```bash
# Install Nginx
sudo apt install nginx

# Create configuration
sudo nano /etc/nginx/sites-available/mystery-hr
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/mystery-hr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Now access at: `http://YOUR_VPS_IP` (port 80)

---

## Troubleshooting

### MongoDB Connection Error

If you see "MongoParseError: mongodb+srv URI cannot have port number":
- Remove any port from your MongoDB URI
- Correct: `mongodb+srv://user:pass@cluster.mongodb.net/db`
- Wrong: `mongodb+srv://user:pass@cluster.mongodb.net:27017/db`

### Application Won't Start

```bash
# Check logs
pm2 logs mystery-hr

# Check if port is in use
sudo lsof -i :3000

# Kill process on port if needed
sudo kill -9 $(sudo lsof -t -i:3000)
```

### Permission Errors

```bash
# Fix ownership
sudo chown -R $USER:$USER /var/www/mystery-hr

# Fix npm permissions
sudo chown -R $USER:$USER ~/.npm
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

---

## Quick Commands Reference

```bash
# Start server
pm2 start ecosystem.config.js

# Stop server
pm2 stop mystery-hr

# Restart server
pm2 restart mystery-hr

# View logs
pm2 logs mystery-hr

# Monitor
pm2 monit

# Re-seed database
npm run seed:all
```

---

## Security Recommendations

1. **Change default admin password** immediately after deployment
2. **Use HTTPS** with Let's Encrypt for production
3. **Configure firewall** to only allow necessary ports
4. **Keep Node.js updated** for security patches
5. **Use strong JWT_SECRET** (minimum 32 characters)
6. **Regular backups** of MongoDB database

---

## Support

For issues, check:
1. PM2 logs: `pm2 logs mystery-hr`
2. Application logs: `./logs/` directory
3. MongoDB Atlas dashboard for database issues
