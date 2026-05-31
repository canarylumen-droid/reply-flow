# Vercel Deployment Guide

## Overview
This guide covers deploying **reply-flow** to Vercel in two parts:
1. Frontend (Vite React app) → `https://replyflow.pro`
2. Backend (Node.js Express API) → `https://backend.replyflow.pro` or separate project

## Prerequisites
- Vercel CLI: `npm install -g vercel`
- Logged into Vercel: `vercel login`
- MongoDB Atlas cluster with credentials
- Custom domain (replyflow.pro) configured in Vercel

---

## Part 1: Deploy Frontend to Vercel

### Step 1: Link the project
```bash
cd c:\Users\USER\.local\reply-flow
vercel link --project reply-flow
```
When prompted, use the recommended settings or:
- Project name: `reply-flow`
- Framework: `Vite`
- Root directory: `./`

### Step 2: Set Environment Variables in Vercel Dashboard
Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

Add:
```
VITE_BLOG_API_URL = https://blog-api.replyflow.pro
```
(or use the backend Vercel URL once deployed)

### Step 3: Deploy Frontend
```bash
vercel --prod
```

Or deploy with inline env:
```bash
VITE_BLOG_API_URL=https://blog-api.replyflow.pro vercel --prod
```

Expected output: `✓ Production`

---

## Part 2: Deploy Backend to Vercel (Alternative: Use Railway Instead)

### Option A: Vercel Serverless Function (Limited)
**Note:** Vercel's serverless functions have a 60-second timeout. If your backend performs DB syncs on startup (via `syncAll()`), it may timeout. Railway is **recommended** for this backend.

If you still want to try:

```bash
cd blog-backend
vercel link --project reply-flow-api
```

Set Environment Variables:
```
NODE_ENV = production
MONGO_URI = mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0
PORT = 3000
```

Deploy:
```bash
vercel --prod
```

### Option B: Use Railway for Backend (Recommended)
See `RAILWAY-DEPLOY.md`

---

## Part 3: Configure Custom Domains

### Frontend Domain
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `replyflow.pro` and `www.replyflow.pro`
3. Point your DNS to Vercel nameservers (or add CNAME records)

### Backend Domain (if using Vercel)
1. Add `backend.replyflow.pro` or `api.replyflow.pro`
2. Update frontend `VITE_BLOG_API_URL` to the backend domain

---

## Part 4: MongoDB Atlas Network Access

Your Vercel deployment needs network access to MongoDB Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → Your Cluster → Network Access
2. Click "Add IP Address" → Add Current IP
   - For production: Use Vercel's IP range (get from support) or allow `0.0.0.0/0` (not recommended)
   - Or use [MongoDB Cloud Integrations](https://www.mongodb.com/docs/atlas/security-integrations/) with cloud providers

Better: Use **MongoDB Atlas Data Federation** or a **MongoDB Realm App** if available.

---

## Environment Variables Summary

### Frontend (.env)
```
VITE_BLOG_API_URL=https://blog-api.replyflow.pro
```

### Backend (.env)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0
PORT=3000
SITE_HOST=https://replyflow.pro
```

---

## Testing Production Deployment

After deployment:

1. **Frontend**: Visit `https://replyflow.pro/blog` → Posts should load
2. **Backend API**: `curl https://blog-api.replyflow.pro/api/posts` → JSON response
3. **Backend Health**: `curl https://blog-api.replyflow.pro/api/health` → `{"status":"ok"}`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `502 Bad Gateway` on backend | Backend failed to start; check Vercel Logs |
| Posts not showing on frontend | `VITE_BLOG_API_URL` not set or backend unreachable |
| MongoDB connection timeout | Whitelist Vercel IP in MongoDB Atlas Network Access |
| `NODE_ENV !== production` | Ensure `NODE_ENV=production` is set in Vercel env vars |

---

## Next: Deploy Backend to Railway

See `RAILWAY-DEPLOY.md` for a more suitable option.
