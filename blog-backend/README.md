# ReplyFlow Blog Backend

This small backend syncs Markdown files in `content/posts/*.md` to MongoDB and serves server-rendered blog pages with perfect SEO meta tags.

Environment variables (set in `.env` at the `blog-backend` root):

- `MONGO_URI` - MongoDB connection string
- `DATABASE_URL_MONGODB_URI` - alternative MongoDB connection string name supported in production
- `PORT` - optional server port (default 4000)
- `SITE_HOST` - site host (e.g. replyflow.pro) used for IndexNow and canonical links
- `INDEXNOW_KEY` - IndexNow API key
- `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` - stringified Google service account JSON for Indexing API

A health endpoint is available at `/api/health` once the backend is running.

Run locally:

```bash
cd blog-backend
npm install
# sync once
npm run sync
# start server for production
npm run start
# or during development
npm run dev
```

Notes:

- Markdown files live in the repository under `content/posts`.
- The `sync` script computes a SHA256 hash of title+content; if it changes it upserts the post and pings Indexing APIs.

Railway deployment notes:

- Create a new service on Railway and connect this GitHub repository (or deploy from CLI).
- Set the following environment variables in Railway (Project Settings > Variables):
  - `MONGO_URI` or `DATABASE_URL_MONGODB_URI` = your MongoDB connection string
  - `SITE_HOST` = `https://replyflow.pro`
  - `INDEXNOW_KEY` and `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` if using indexing
  - `PORT` (optional) — Railway provides one automatically.
- Build command: `npm run build`
- Start command: `npm run start` (this runs the compiled backend `dist/app.js` via the `start` script)

If you prefer to host the frontend on Railway as a static site in the same repository:

- The repository root now contains a small static server (`server.js`) and a `start` script. Railway will run `npm run build` then `npm run start` to serve the frontend from `dist/`.
- Alternatively, deploy only the `blog-backend` as a service and point the frontend `VITE_BLOG_API_URL` to the Railway service URL.

Healthchecks and keepalive:

- A health endpoint is available at `/api/health` which reports MongoDB connection state and uptime.
- We added a GitHub Actions workflow `.github/workflows/keepalive.yml` which will periodically ping the health endpoint. You may disable it if Railway provides an uptime policy or if you use Railway's cron/heartbeat features.

Troubleshooting:

- If Railway fails to build, check `build` and `start` commands and ensure `MONGO_URI` is set.
- Check Railway logs for runtime errors; common issues are missing env vars or network access to MongoDB (IP whitelist). Ensure your MongoDB Atlas cluster allows connections from Railway; add Railway's IPs or allow access from anywhere (0.0.0.0/0) temporarily for testing.
