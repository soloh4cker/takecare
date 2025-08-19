# Back & Tailbone Care — PWA Package

This is a ready-to-deploy **Progressive Web App (PWA)**. It installs on Android via **Add to Home screen** and works offline.

## Files
- `index.html` — app shell (loads React + Tailwind CDN + `app.jsx`)
- `app.jsx` — full React source (tabs, exercises, plan, tips, track, settings)
- `manifest.json` — app metadata (name, icons, theme)
- `service-worker.js` — offline cache
- `icons/` — 192×192 and 512×512 PNG icons
- `404.html` — SPA redirect for GitHub Pages

## Quick Deploy (GitHub Pages)
1. **Create a new repo** (public). Name example: `back-tailbone-care`.
2. **Upload** all files from this folder to the repo root.
3. In GitHub → **Settings → Pages** → Source: **Deploy from a branch** → select `main` branch, `/ (root)` folder → Save.
4. Wait for the page to build. Your site will be at: `https://<your-username>.github.io/<repo-name>/`
5. Open it on Android Chrome → tap menu (⋮) → **Add to Home screen**.

> Tip: If your GitHub Pages path is a subfolder, the PWA still works because we used relative `./` paths.

## Add Exercise GIFs
- In the app: **Settings → Exercise GIFs**.
- Paste internet GIF URLs for each exercise, then **Save GIF URLs**.
- The app remembers your links on-device (local storage).

## Update the App
- Edit `app.jsx` and commit; GitHub Pages redeploys automatically.
- Version the cache by updating `CACHE` in `service-worker.js` (e.g., `-v2`) if assets change.

## Install on Android
1. Visit your site in Chrome.
2. Accept the “Add to Home screen” prompt **or** tap (⋮) → **Add to Home screen**.
3. Launch the app from your home screen/app drawer.

Enjoy! 🎉
