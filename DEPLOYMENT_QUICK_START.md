# 🚀 Quick Deployment Commands

## GitHub Push (One-Time Setup)
```bash
# 1. Initialize and commit
git init
git add .
git commit -m "MongoDB integration complete"

# 2. Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/mini-social-media.git
git branch -M main
git push -u origin main
```

## Future Updates
```bash
git add .
git commit -m "Your update message"
git push
```
Auto-deploys to Render & Vercel! 🎉

---

## 📋 Deployment Checklist

### Before Deployment
- [x] MongoDB Atlas cluster created
- [x] Database user created with password
- [x] Network access configured (0.0.0.0/0)
- [x] `.env` file has correct MONGODB_URI
- [ ] Code pushed to GitHub

### Backend (Render)
- [ ] Create Web Service on Render
- [ ] Set Root Directory: `backend`
- [ ] Add Environment Variables:
  - `MONGODB_URI`
  - `PORT=5000`
  - `NODE_ENV=production`
- [ ] Deploy and copy backend URL

### Frontend (Vercel)
- [ ] Import project on Vercel
- [ ] Set Root Directory: `frontend`
- [ ] Add Environment Variable:
  - `VITE_API_URL=https://your-backend.onrender.com`
- [ ] Deploy and copy frontend URL

### After Deployment
- [ ] Test: Create post
- [ ] Test: Add comment
- [ ] Test: Refresh page (data persists)
- [ ] Update README with live URLs

---

## 🔗 Important URLs

**Save these after deployment:**

```
Frontend: https://_________________________.vercel.app
Backend:  https://_________________________.onrender.com
GitHub:   https://github.com/____________/mini-social-media
```

---

## 💡 Common Issues

**Backend won't start:**
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)
- Verify MONGODB_URI is correct in Render environment variables

**Frontend can't connect:**
- Check VITE_API_URL has no trailing slash: ✅ `.../com` ❌ `.../com/`
- Must be HTTPS not HTTP

**First request slow:**
- Render free tier spins down after 15 min
- First request takes 30-50 seconds (normal!)

---

## 📦 Environment Variables Quick Reference

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.onrender.com
```

**Never commit .env files!** ✅ Already in .gitignore
