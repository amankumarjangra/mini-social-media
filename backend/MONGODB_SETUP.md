# MongoDB Atlas Setup Guide

## Quick Start

### 1. Create MongoDB Atlas Account
- Visit: https://www.mongodb.com/cloud/atlas
- Sign up for free account

### 2. Create a Free Cluster (M0 Sandbox)
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox - 512 MB storage)
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Choose nearest region for better performance
5. Click "Create Cluster" (takes 3-5 minutes)

### 3. Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Select "Password" authentication
4. Create username and strong password
   - **IMPORTANT**: Save these credentials securely!
5. Database User Privileges: Select "Atlas Admin"
6. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. For development:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
4. For production:
   - Add specific IP addresses or CIDR blocks

### 5. Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" button on your cluster
3. Select "Connect your application"
4. Choose "Node.js" driver
5. Copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   

### 6. Configure Backend
1. Create `.env` file in backend directory:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and update:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/mini-social-media?retryWrites=true&w=majority
   ```
   
   Replace:
   - `your-username` with your MongoDB username
   - `your-password` with your MongoDB password
   - `cluster0.xxxxx` with your actual cluster address
   - Add database name after `.net/` (e.g., `mini-social-media`)

### 7. Test Connection
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
📊 Database Name: mini-social-media
🚀 Server is running on port 5000
```

## Viewing Your Data

### Option 1: MongoDB Atlas Web UI
1. Go to "Database" in Atlas dashboard
2. Click "Browse Collections"
3. View your `posts` collection

### Option 2: MongoDB Compass (Desktop App)
1. Download: https://www.mongodb.com/products/compass
2. Use same connection string from Step 5
3. GUI for browsing and managing data

## Troubleshooting

### Connection Issues
- ✅ Verify username/password in connection string
- ✅ Check network access allows your IP (0.0.0.0/0 for testing)
- ✅ Ensure cluster is fully deployed (not paused)
- ✅ Database name is added after `.net/` in URI

### Common Errors
- **Authentication failed**: Wrong username/password
- **Network timeout**: IP not whitelisted or cluster paused
- **Database not created**: Database auto-creates on first write

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use environment variables** for production deployment
3. **Restrict IP access** in production (don't use 0.0.0.0/0)
4. **Create separate database users** for different environments
5. **Use strong passwords** with special characters

## Free Tier Limits

MongoDB Atlas M0 (Free):
- 512 MB storage
- Shared RAM
- Shared vCPU
- No backups
- Perfect for development and small projects

**Note**: For production, consider upgrading to M10+ tiers for better performance and features.
