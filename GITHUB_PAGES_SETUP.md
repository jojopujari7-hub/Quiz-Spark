# Deploy to GitHub Pages (Free, Works on SFUSD Chromebooks!)

## ✅ What We Did

Converted the app to use **Supabase REST API directly** from the frontend, so it can be hosted as a **static site** on GitHub Pages!

## 🚀 Deploy Steps

### 1. Enable GitHub Pages
1. Go to your repo: https://github.com/jojopujari7-hub/Quiz-Spark
2. Click **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Save

### 2. Add Secrets (Optional - defaults are already set)
The app has default Supabase keys, but you can add them as secrets:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add:
   - `VITE_SUPABASE_URL`: `https://ekaykrxsfwpfzsmzxegj.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: (your anon key)

### 3. Push to GitHub
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 4. Your App Will Be Live At:
```
https://jojopujari7-hub.github.io/Quiz-Spark/
```

## ✅ Why This Works

- **GitHub Pages** is usually **not blocked** by schools
- **Static hosting** - no backend needed
- **Supabase REST API** - database access from frontend
- **Free forever** - no limits

## 🔧 How It Works

1. Frontend calls Supabase REST API directly
2. Quiz generation happens client-side
3. Data stored in Supabase database
4. Fully static - can host anywhere!

## 📝 Notes

- The app uses Supabase's anon key (safe for frontend)
- RLS (Row Level Security) is enabled on your table
- All quizzes are publicly readable/writable (as per your migration)

