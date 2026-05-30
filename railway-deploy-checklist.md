Railway Deploy Checklist

1. Create a Railway project and connect this repository (or use `railway init` locally).

2. Services to create:
   - `frontend` (optional): deploy the root repository. Build command: `npm run build`; Start command: `npm run start`.
   - `backend` (recommended): set root to `blog-backend/`, Build: `npm run build`, Start: `npm run start`.

3. Environment variables (set in Railway > Variables):
   - `MONGO_URI` or `DATABASE_URL_MONGODB_URI` = MongoDB connection string
   - `SITE_HOST` = https://replyflow.pro
   - `VITE_BLOG_API_URL` = https://<your-backend-host> (for frontend service)
   - `INDEXNOW_KEY`, `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` (optional)

4. MongoDB network access:
   - If using MongoDB Atlas, ensure your cluster allows connections from Railway. Either add Railway's IPs or enable access from anywhere (0.0.0.0/0) while testing, then tighten later.

5. Deploy and verify:
   - After deployment, open the backend service URL and visit `/api/health` — expect `status: ok` and `readyState: 1`.
   - Visit the frontend URL to confirm the site loads and API calls succeed.

6. Post-deploy:
   - In Google Search Console submit `https://replyflow.pro/sitemap.xml`.
   - Use URL Inspection → Live Test → Request Indexing for any page.

7. Optional: Keepalive
   - Use the included GitHub Actions workflow `.github/workflows/keepalive.yml` to ping `/api/health` regularly, or use Railway's cron/heartbeat features.
