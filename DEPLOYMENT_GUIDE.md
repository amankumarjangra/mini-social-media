# 🚀 GitHub Push & Deployment Guide

## 📦 Part 1: Push to GitHub

### Step 1: Check Git Status
```bash
# Navigate to project root
cd C:\Users\DELL\OneDrive\Documents\Desktop\Assignment

# Check if git is initialized
git status
```

### Step 2: Initialize Git (if needed)
```bash
# If not initialized, run:
git init

# Check status
git status
```

### Step 3: Add All Files
```bash
# Add all files to staging
git add .

# Verify what will be committed
git status
```

**Important:** `.env` files ko push NAHI karna - already `.gitignore` mein hai ✅

### Step 4: Create First Commit
```bash
git commit -m "MongoDB integration complete - mini social media app"
```

### Step 5: Create GitHub Repository

1. Go to https://github.com
2. Click **"New"** (green button) ya **"+"** icon → **"New repository"**
3. Repository details:
   - **Repository name**: `mini-social-media` (ya koi bhi naam)
   - **Description**: "Full-stack social media app with MongoDB"
   - **Visibility**: Public ya Private (your choice)
   - **DON'T** check "Initialize with README" (already hai tumhare paas)
4. Click **"Create repository"**

### Step 6: Link Remote Repository
```bash
# Copy the URL from GitHub (will look like this)
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/mini-social-media.git

# Verify remote
git remote -v
```

### Step 7: Push to GitHub
```bash
# Push to main branch
git branch -M main
git push -u origin main
```

**Done!** ✅ Code is now on GitHub!

---

## 🌐 Part 2: Backend Deployment (Render)

### Prerequisites
- GitHub repository (completed above)
- MongoDB Atlas URI (already have it)

### Step 1: Sign Up on Render
1. Go to https://render.com
2. Sign up with GitHub account (recommended)
3. Allow Render to access your repositories

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `mini-social-media`
3. Render will detect it

### Step 3: Configure Web Service

**Basic Settings:**
- **Name**: `mini-social-media-backend`
- **Region**: Choose closest to you (e.g., Singapore)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced Settings:**
- **Auto-Deploy**: Yes (recommended)

### Step 4: Add Environment Variables

Click **"Environment"** tab, add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://chhichhrana:chhichhrana_2002@cluster0.n2uauqx.mongodb.net/mini-social-media?retryWrites=true&w=majority&appName=Cluster0` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

**Important:** Use your actual MongoDB URI!

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Check logs - should see:
   ```
   ✅ MongoDB Connected: cluster0-shard-00-00.n2uauqx.mongodb.net
   🚀 Server is running on port 5000
   ```

### Step 6: Get Backend URL
- After deployment, you'll get a URL like:
  ```
  https://mini-social-media-backend.onrender.com
  ```
- **Save this URL** - frontend mein lagega!

### Step 7: Test Backend API
Visit in browser:
```
https://your-backend-url.onrender.com/api/posts
```

Should show: `{"message": "Posts retrieved successfully", "posts": [], "total": 0}`

---

## 🎨 Part 3: Frontend Deployment (Vercel)

### Step 1: Sign Up on Vercel
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Allow Vercel to access repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select your repository: `mini-social-media`
3. Click **"Import"**

### Step 3: Configure Build Settings

**Project Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install`

### Step 4: Add Environment Variable

Click **"Environment Variables"**, add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL (from Part 2, Step 6) |

**Example:**
```
VITE_API_URL=https://mini-social-media-backend.onrender.com
```

**Important:** NO trailing slash `/` at the end!

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Vercel will build and deploy

### Step 6: Get Frontend URL
- After deployment, you'll get a URL like:
  ```
  https://mini-social-media-xyz.vercel.app
  ```

### Step 7: Test Application
1. Open your Vercel URL in browser
2. Create a post with image
3. Add comment
4. Verify everything works!

---

## ✅ Part 4: Verification Checklist

After deployment, test these:

- [ ] **Backend Health Check**
  - Visit: `https://your-backend.onrender.com`
  - Should show API info

- [ ] **Frontend Loads**
  - Visit: `https://your-frontend.vercel.app`
  - Should show the app

- [ ] **Create Post**
  - Upload image and caption
  - Should appear in feed

- [ ] **Add Comment**
  - Comment on a post
  - Should show immediately

- [ ] **Data Persistence**
  - Create posts
  - Refresh page
  - Posts should still be there (from MongoDB!)

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Backend deployment failed
- **Check logs** in Render dashboard
- **Verify MongoDB URI** is correct in environment variables
- **Check build logs** for errors

**Problem:** "Application error"
- Check if MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify environment variables are set correctly

### Frontend Issues

**Problem:** Can't fetch posts
- **Check VITE_API_URL** is correct
- **Must start with https://** not http://
- **No trailing slash** at end

**Problem:** CORS errors
- Backend already has CORS enabled
- Make sure backend is deployed and running

---

## 📝 Important Notes

### Free Tier Limitations

**Render (Backend):**
- Free tier spins down after 15 min of inactivity
- First request after spin-down takes 30-50 seconds
- 750 hours/month free

**Vercel (Frontend):**
- Unlimited bandwidth
- 100 deployments/day
- Perfect for frontends!

**MongoDB Atlas:**
- 512 MB storage (M0 free tier)
- Good for small projects

### Future Updates

When you make code changes:

**Option 1: Auto Deploy (Recommended)**
```bash
git add .
git commit -m "Your update message"
git push origin main
```
- Render and Vercel will **auto-deploy** from GitHub!

**Option 2: Manual Redeploy**
- Go to Render/Vercel dashboard
- Click "Manual Deploy" → "Deploy latest commit"

---

## 🎯 Your Deployed URLs

After deployment, update these in your README:

```markdown
## 🚀 Live Demo

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
```

---

## 🔒 Security Checklist

- [x] `.env` file in `.gitignore`
- [x] MongoDB password not in code
- [x] Environment variables used
- [x] HTTPS enabled (automatic on Render/Vercel)
- [ ] Restrict MongoDB IP access for production (optional)

---

## 🆘 Need Help?

1. **Render Logs**: Dashboard → Your Service → Logs
2. **Vercel Logs**: Dashboard → Your Project → Deployments → View Logs
3. **MongoDB Atlas**: Check Network Access and Database Access settings

---

**Congratulations! 🎉** Your full-stack app with MongoDB is now live on the internet!
