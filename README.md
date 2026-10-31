# Anita (PWA)

## Put it on GitHub Pages
1. Create a new public repo on GitHub (e.g. `anita`).
2. Upload everything in this folder (config.js, index.html, manifest.json, sw.js, icons/, worker.js, README.md).
3. Repo Settings > Pages > Deploy from a branch > `main` / root > Save.
4. After a minute, open `https://YOUR-USERNAME.github.io/anita/` in Chrome on your Android phone.
5. Tap Key, paste your Gemini API key from Google AI Studio, then chat.
6. Chrome menu (three dots) > Install app (or Add to Home screen).

## Keys: read this
GitHub Pages is static, so there is no safe place to hide a key in the page.
- Testing alone: the key you paste is stored only in your own browser. Never commit it to the repo.
- Sharing with others: deploy `worker.js` on Cloudflare Workers (free tier), add secrets GEMINI_API_KEY and ALLOWED_ORIGIN (https://YOUR-USERNAME.github.io), then set PROXY_URL in config.js to the worker address.
