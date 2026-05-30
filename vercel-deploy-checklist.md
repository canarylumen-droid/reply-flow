Vercel Deploy Checklist
=======================

1. Commit & push changes (including `vercel.json` and updated `public/robots.txt`).

2. Trigger a deployment on Vercel (push to the branch linked to the Vercel project).

3. Verify build settings on Vercel:
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Confirm Domain & SSL:
   - Ensure `replyflow.pro` is the primary deployed domain.
   - If you do not need `www.replyflow.pro`, do not use it as the canonical host.
   - Verify SSL is active and no certificate errors.

5. Set the blog backend URL and MongoDB env vars in Vercel:
   - `VITE_BLOG_API_URL` = `https://replyflow.pro` or the backend host where the API runs
   - `MONGO_URI` or `DATABASE_URL_MONGODB_URI` = your MongoDB connection string
   - `SITE_HOST` = `https://replyflow.pro`
   - `INDEXNOW_KEY` and `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` if using indexing integrations

6. Check live files after deploy (run these locally):
```powershell
curl.exe -I https://replyflow.pro/robots.txt
curl.exe -I https://www.replyflow.pro/robots.txt
curl.exe -I -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://replyflow.pro/
curl.exe -L -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://replyflow.pro/ | findstr /I "noindex"
curl.exe -I https://replyflow.pro/ | findstr /I "X-Robots-Tag"
```

6. In Vercel dashboard, open the latest deployment, view build logs, and confirm `vite build` succeeded and `dist/` contains static site files.

7. In Google Search Console:
   - Submit `https://replyflow.pro/sitemap.xml` if not present.
   - Use URL Inspection → Live Test → Request Indexing for any page.

8. Verify the backend health endpoint:
   - Visit `https://replyflow.pro/api/health` after deployment.
   - A healthy response should return `status: ok` and `readyState: 1`.

9. Use the keepalive workflow to keep the backend active:
   - A GitHub Actions workflow file was added at `.github/workflows/keepalive.yml`.
   - Add a repository secret `KEEPALIVE_URL` if your backend health endpoint uses a different host.

10. Monitor Search Console for indexing and crawl errors over 24–72 hours.
