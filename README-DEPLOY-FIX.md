# LedgerLens — Netlify deployment Windows fix (v4)

Extract this ZIP fully (do NOT double-click BAT inside WinRAR).

1. Double-click `CHECK-NODE.bat` to test your Windows Node.js/npm installation. It saves `NODE-CHECK-RESULT.txt`.
2. Latest Netlify CLI requires Node.js **22.13.0 or newer**. If either check fails, install/repair Node LTS at https://nodejs.org/en/download , close CMD windows, and run check again. If your Windows version cannot run current Node, update Windows.
3. Double-click `DEPLOY-NETLIFY.bat`. First time, authorize Netlify login in browser; on first deployment choose Netlify team and create/link site.
4. On Netlify Dashboard, add a **NEW** `GEMINI_API_KEY` as a Functions/All-scope environment variable. Never use the previously shared key. Run the deployment again after saving this.
5. Test a small clear photo. If it fails, use the command window or `DEPLOY-DIAGNOSTIC.txt` for troubleshooting. Do not share any credentials or tokens.

**Important limitations:** This fixes deployment diagnostics and bootstrap, it does not prove a live deployed site or Gemini API functionality. Netlify Functions have request-size limits; images should be kept small (roughly 3 MB or less), even if browser says 8 MB. A genuine Gemini API key and enabled free-tier model are required.
