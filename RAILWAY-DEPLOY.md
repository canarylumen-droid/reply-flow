# Railway Deployment Guide

## Overview
Railway is the **recommended** platform for the backend because:
- No timeout limits (supports long-running startup syncs)
- Simple Node.js app deployment (auto-detects from `Procfile` or `package.json`)
- Free tier available for testing
- Easy environment variable management
- Better monitoring and logs

---

## Prerequisites
- Railway account: [railway.app](https://railway.app)
- Railway CLI: `npm install -g @railway/cli`
- Logged in: `railway login`
- MongoDB Atlas credentials
- Backend source in git (GitHub, GitLab, etc.)

---

## Deployment Steps

### Step 1: Create a Railway Project
```bash
cd c:\Users\USER\.local\reply-flow\blog-backend
railway init
```

When prompted:
- **Project name**: `reply-flow-api`
- **Service name**: `blog-backend`
- **Framework**: Node.js

Or use the Railway Dashboard:
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "GitHub" or "Deploy from Git"
4. Choose your repo and `blog-backend/` directory

### Step 2: Add Environment Variables
In Railway Dashboard → Project → Services → `blog-backend` → Variables

Add:
```
NODE_ENV = production
MONGO_URI = mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0
PORT = 4000
SITE_HOST = https://replyflow.pro
```

### Step 3: Configure Build & Start Commands (if needed)
Railway auto-detects from `Procfile` or `package.json`.

Current `Procfile` (located in `blog-backend/`):
```
web: npm run build && node dist/app.js
```

If Railway doesn't auto-detect:
1. Go to Settings → Build
2. **Build Command**: `npm run build`
3. **Start Command**: `node dist/app.js`
4. **Node Version**: `24.12.0` (or latest stable)

### Step 4: Deploy
Option A: From Git (Recommended)
```bash
git add .
git commit -m "Add Railway config"
git push origin main
```
Railway auto-deploys on push.

Option B: Via CLI
```bash
railway up
```

### Step 5: Get Backend URL
After deployment:
1. Go to Railway Dashboard → Deployments
2. Click the latest deployment
3. Copy the service URL (e.g., `https://reply-flow-api-production.up.railway.app`)

Or via CLI:
```bash
railway link
railway status
```

---

## Part 2: Configure Frontend to Use Backend

Update `VITE_BLOG_API_URL` in root `.env` or Vercel:

```env
VITE_BLOG_API_URL=https://reply-flow-api-production.up.railway.app
```

Then rebuild and deploy frontend to Vercel:
```bash
npm run build
vercel --prod
```

Or set it in Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add: `VITE_BLOG_API_URL = https://reply-flow-api-production.up.railway.app`

---

## Part 3: MongoDB Atlas Network Access

Railway IPs are dynamic, so use one of these options:

### Option A: Allow All IPs (Development Only)
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address" → `0.0.0.0/0`
3. ⚠️ **Not recommended for production**

### Option B: Use MongoDB Atlas Cloud Integration
1. In Railway, add a "MongoDB Atlas" plugin
2. Enter your Atlas credentials
3. Railway automatically manages the IP whitelist

### Option C: Whitelist Railway's IP Range
1. Get Railway's IP range from support
2. Add to MongoDB Atlas Network Access
3. (Current Railway public IPs: Check [Railway Docs](https://docs.railway.app))

**Simplest for now**: Use Option A temporarily, then move to Option B for production.

---

## Testing Production Deployment

### Test Backend
```bash
# Health check
curl https://reply-flow-api-production.up.railway.app/api/health

# Get posts
curl https://reply-flow-api-production.up.railway.app/api/posts

# Get single post
curl https://reply-flow-api-production.up.railway.app/api/post/ai-appointment-setting-book-more-calls-2026
```

Expected responses:
- `/api/health`: `{"status":"ok","readyState":1,"uptime":...}`
- `/api/posts`: `{"items":[...],"total":8,"page":1,"perPage":10}`

### Test Frontend Integration
1. Deploy frontend to Vercel with `VITE_BLOG_API_URL` set
2. Visit `https://replyflow.pro/blog`
3. Posts should load from the Railway backend

---

## Monitoring & Logs

View live logs:
```bash
railway logs
```

Or in Dashboard:
1. Go to Deployments → Click a deployment
2. Scroll to "Logs"
3. Watch for errors or connection issues

Expected logs on startup:
```
Attempting MongoDB connect to cluster0.tnwwwj5.mongodb.net
MongoDB connected
Initial sync done (or failed with reason)
Blog server running on http://localhost:4000
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `503 Service Unavailable` | Backend crashed; check logs for DB connection error |
| `MongoDB connection timeout` | Whitelist Railway IP in MongoDB Atlas or use Atlas integration |
| `Initial sync failed` | Check `MONGO_URI` is correct; verify Atlas IP whitelist |
| Build fails | Ensure `npm run build` runs locally without errors |
| Port conflicts | Use `PORT=4000` in env vars; don't hardcode port |

---

## Environment Variables Summary

### Backend (Railway)
```
NODE_ENV = production
MONGO_URI = mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0
PORT = 4000
SITE_HOST = https://replyflow.pro
DEV_WATCH = false
```

### Frontend (Vercel)
```
VITE_BLOG_API_URL = https://reply-flow-api-production.up.railway.app
```

---

## Cost Estimate

- **Railway Free Tier**: $5/month free credits
  - Suitable for low-traffic sites
  - Upgrade if needed: ~$5-20/month depending on compute

- **Vercel Free Tier**: Free for static frontend + limited serverless functions
  - Edge caching included

- **MongoDB Atlas**: Free tier (512 MB) or paid ($15+/month)

---

## Next Steps

1. Deploy backend to Railway (follow steps above)
2. Update `VITE_BLOG_API_URL` in Vercel with the Railway URL
3. Redeploy frontend to Vercel
4. Test `https://replyflow.pro/blog` — posts should load
5. Monitor Railway logs for any errors
6. Configure MongoDB Atlas IP whitelist or use Atlas integration

---

## Support
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.mongodb.com/atlas
- Vercel Docs: https://vercel.com/docs
