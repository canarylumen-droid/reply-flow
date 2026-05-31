# Production Deployment Checklist

## 🎯 Quick Summary

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | Pending | https://replyflow.pro |
| Backend | Railway (Recommended) | Pending | https://reply-flow-api-production.up.railway.app |
| Database | MongoDB Atlas | ✓ Set | cluster0.tnwwwj5.mongodb.net |

---

## ✅ Pre-Deployment Checklist

### Local Testing
- [ ] Backend starts locally: `node blog-backend/dist/app.js`
- [ ] Frontend dev server runs: `npm run dev` (http://localhost:5000)
- [ ] API responds: `curl http://localhost:4000/api/posts`
- [ ] Posts render in frontend: http://localhost:5000/blog
- [ ] Build succeeds: `npm run build`

### Configuration
- [ ] `.env` has `VITE_BLOG_API_URL` pointing to backend
- [ ] `blog-backend/.env` has valid `MONGO_URI`
- [ ] `NODE_ENV=production` set in production environment variables
- [ ] All secrets are in environment variables (not in repo)

### MongoDB Atlas
- [ ] Cluster is running and accessible
- [ ] Database user has correct credentials (user: `canarylumen_db_user`)
- [ ] Connection string is correct
- [ ] IP whitelist ready (or will add Vercel/Railway IPs)

---

## 🚀 Deployment Steps (In Order)

### Step 1: Deploy Backend to Railway
```bash
cd blog-backend
railway init
# or use Dashboard: https://railway.app/new
```

Set Environment Variables in Railway:
- `NODE_ENV` = `production`
- `MONGO_URI` = `mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0`
- `PORT` = `4000`
- `SITE_HOST` = `https://replyflow.pro`

Deploy:
```bash
git push  # Railway auto-deploys from git
# or: railway up
```

Get URL after deployment (Railway Dashboard → Deployments):
```
Backend URL: https://reply-flow-api-production.up.railway.app
```

**Verify**:
```bash
curl https://reply-flow-api-production.up.railway.app/api/health
```

### Step 2: Configure MongoDB Atlas Whitelist
Add Railway's IP (or use 0.0.0.0/0 for testing):
1. MongoDB Atlas → Network Access
2. Add IP Address → allow 0.0.0.0/0 (temporary)
3. Monitor logs for successful connection

### Step 3: Deploy Frontend to Vercel
```bash
# Update VITE_BLOG_API_URL in root .env or Vercel dashboard
VITE_BLOG_API_URL=https://reply-flow-api-production.up.railway.app

# Build locally to test
npm run build

# Deploy to Vercel
vercel --prod
```

Set in Vercel Dashboard (Project Settings → Environment Variables):
- `VITE_BLOG_API_URL` = `https://reply-flow-api-production.up.railway.app`

### Step 4: Configure Custom Domains
**Vercel (Frontend)**:
1. Dashboard → Settings → Domains
2. Add `replyflow.pro` and `www.replyflow.pro`
3. Point DNS or add CNAME records

**Railway (Backend)** (Optional):
1. Dashboard → Service → Settings → Custom Domain
2. Add `api.replyflow.pro` or use Railway default

---

## 🧪 Post-Deployment Testing

### Test Backend API
```bash
# Health check
curl -I https://reply-flow-api-production.up.railway.app/api/health
# Expected: 200 OK

# Get all posts
curl https://reply-flow-api-production.up.railway.app/api/posts | head -n 50
# Expected: JSON with items array

# Get single post
curl https://reply-flow-api-production.up.railway.app/api/post/cold-email-ai-2026-complete-guide
# Expected: 200 with post content
```

### Test Frontend
1. Visit `https://replyflow.pro`
2. Navigate to `/blog`
3. Verify posts load from backend
4. Click a post to read it
5. Check browser console for any API errors

### Monitor Logs
```bash
# Railway logs
railway logs

# Vercel logs (from CLI)
vercel logs
```

---

## 🔧 Environment Variables Reference

### Backend (Railway)
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://canarylumen_db_user:daYTNG1rp5LLknxI@cluster0.tnwwwj5.mongodb.net/?appName=Cluster0
PORT=4000
SITE_HOST=https://replyflow.pro
DEV_WATCH=false
```

### Frontend (Vercel)
```env
VITE_BLOG_API_URL=https://reply-flow-api-production.up.railway.app
```

---

## ⚠️ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| `502 Bad Gateway` | Backend crashed | Check Railway logs for DB connection error |
| `Posts not loading` | Frontend can't reach backend API | Verify `VITE_BLOG_API_URL` is set in Vercel |
| `MongoDB connection timeout` | IP not whitelisted | Add Railway IP to MongoDB Atlas whitelist |
| `BUILD_FAILED` | Missing dependencies | Ensure `npm run build` works locally |
| `Cannot GET /api/posts` | Wrong backend URL | Check that `VITE_BLOG_API_URL` is exact |

---

## 📝 DNS Setup (if using custom domain)

### For replyflow.pro
Update your DNS provider (Namecheap, GoDaddy, etc.):

**Option 1: Vercel Nameservers** (recommended)
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
Nameserver 3: ns3.vercel-dns.com
Nameserver 4: ns4.vercel-dns.com
```

**Option 2: CNAME Records**
```
www.replyflow.pro  CNAME  cname.vercel-dns.com
replyflow.pro      A      76.76.21.21  (Vercel IP)
```

Wait 24-48 hours for DNS propagation.

Verify:
```bash
nslookup replyflow.pro
nslookup www.replyflow.pro
```

---

## 🎓 After Deployment

1. **Set up monitoring**: Enable Railway alerts for crashes
2. **Review logs daily** for the first week
3. **Monitor MongoDB usage** to ensure quota is not exceeded
4. **Add Google Analytics** to track traffic
5. **Set up Search Console** for both replyflow.pro and www.replyflow.pro
6. **Test SSL/TLS**: https://www.ssllabs.com/ssltest/

---

## 🆘 Rollback Plan

If something breaks:

1. **Backend**: Redeploy previous version from Railway Deployments
2. **Frontend**: Revert to previous Vercel deployment
3. **Database**: MongoDB Atlas has automatic backups (check Clusters → Backup)

To rollback:
```bash
# Vercel
vercel rollback

# Railway
railway redeploy --select
```

---

## 📞 Support Contacts

- **Railway Issues**: https://railway.app/support
- **Vercel Issues**: https://vercel.com/support
- **MongoDB Issues**: https://support.mongodb.com
- **DNS Issues**: Contact your domain registrar

---

## ✨ You're Live!

Once all tests pass and custom domains are configured, your production deployment is complete.

**Next**: Monitor logs, gather feedback, and prepare for scale.
