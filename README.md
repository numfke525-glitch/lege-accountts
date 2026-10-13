# LedgerLens AI — Gemini + Netlify edition

## Deploy on Netlify
1. Create a new Netlify site from this project (Git repository recommended). Netlify build settings: publish directory `public`, functions directory `netlify/functions`, no build command.
2. In Netlify Site configuration > Environment variables, create `GEMINI_API_KEY` with a NEW Google AI Studio API key. Never put the key into files or browser code. Optionally set `GEMINI_MODEL=gemini-2.5-flash` (check free-tier availability in your region/project).
3. Redeploy the site after saving variables. Open the live site and upload a JPG/PNG/WebP under 8 MB. Analyze > correct values > confirm > solve.
4. If deploying a ZIP manually, Netlify drag-and-drop static deploys may not deploy Functions. Connect a Git repository or use Netlify CLI `netlify deploy --build --prod` from this project directory.

## Notes
- Gemini API free tier has quotas and can vary by model, account and region. Requests may be rate-limited. Avoid public unrestricted usage; add authentication, rate limiting, and usage limits before launch.
- API key is never included in this ZIP. A key shared in chat should be revoked and replaced.
- Uploaded photos are sent to Google's Gemini API for analysis. Do not upload sensitive private data.
- This is a testable prototype, not a verified production service. AI may misread values or make accounting mistakes; verify before relying on solutions.
- Frontend and Netlify Functions require internet access and an active Gemini API key.
