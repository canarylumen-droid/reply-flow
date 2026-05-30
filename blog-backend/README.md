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
