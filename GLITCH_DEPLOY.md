# Deploy to Glitch (Free, Education-Friendly)

## Steps:

1. **Go to https://glitch.com** and sign up/login (free)

2. **Click "New Project" → "Import from GitHub"**

3. **Paste your repo URL:**
   ```
   https://github.com/jojopujari7-hub/Quiz-Spark
   ```

4. **Add Environment Variable:**
   - Click the `.env` file in the left sidebar
   - Add: `DATABASE_URL=your_supabase_pooler_connection_string`
   - (Use the same Supabase connection string from Vercel)

5. **Glitch will auto-start your app!**

6. **Your app will be live at:**
   ```
   https://YOUR-PROJECT-NAME.glitch.me
   ```

## Benefits:
- ✅ **100% Free** - No credit card needed
- ✅ **Education-friendly** - Often allowed in schools
- ✅ **Full-stack support** - Node.js, Express, databases
- ✅ **Auto-deploys** - Updates when you push to GitHub
- ✅ **Custom domain** - `*.glitch.me` (different from vercel/render)

## If Glitch is blocked:
Try these alternatives:
- **Fly.io** (`*.fly.dev`) - Free tier available
- **Cloudflare Pages** (`*.pages.dev`) - Free, but might need Workers for API
- **GitHub Codespaces** - Free for students

