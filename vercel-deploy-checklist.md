Vercel Deploy Checklist
=======================

1. Commit & push changes (including `vercel.json` and updated `public/robots.txt`).

2. Trigger a deployment on Vercel (push to the branch linked to the Vercel project).

3. Verify build settings on Vercel:
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Confirm Domain & SSL:
   - Ensure both `replyflow.pro` and `www.replyflow.pro` are added (or set preferred canonical).
   - Verify SSL is active and no certificate errors.

5. Check live files after deploy (run these locally):
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

8. Monitor Search Console for indexing and crawl errors over 24–72 hours.
