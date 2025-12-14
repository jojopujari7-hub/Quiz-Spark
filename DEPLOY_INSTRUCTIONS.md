# Deployment Instructions

## ✅ Database Setup Complete!

Your Supabase database is set up and ready:
- **Project**: Quiz-spark
- **Project ID**: ekaykrxsfwpfzsmzxegj
- **Status**: ACTIVE_HEALTHY
- **Migration**: Applied successfully ✅
- **Tables**: `quizzes` table created with RLS policies

## 🚀 Deploy to Vercel

Due to a project naming issue with Vercel CLI, please deploy via the Vercel Dashboard:

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/new
2. **Import your Git repository**:
   - Connect your GitHub/GitLab/Bitbucket account if not already connected
   - Select the Quiz-Spark repository
3. **Configure the project**:
   - **Project Name**: `quiz-spark` (or any name you prefer)
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
4. **Add Environment Variable**:
   - Go to **Settings** → **Environment Variables**
   - Add: `DATABASE_URL`
   - Value: Get from Supabase Dashboard:
     - Go to: https://supabase.com/dashboard/project/ekaykrxsfwpfzsmzxegj/settings/database
     - Under **Connection string**, select **URI**
     - Copy the connection string (it will look like: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`)
     - **Important**: Use the **Connection Pooling** connection string for better performance
5. **Deploy**: Click **Deploy**

### Option 2: Fix CLI and Deploy

If you want to use CLI, the issue seems to be with project name detection. Try:

```bash
# Make sure you're in the project directory
cd /Users/nikhilpujari/Quiz-Spark

# Try deploying with explicit scope
vercel --prod --yes --scope niks-projects-49f7d067
```

If that doesn't work, create the project first via dashboard, then link:
```bash
vercel link
```

## 📋 Environment Variables Needed

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase Dashboard → Settings → Database → Connection string (URI) |

## ✅ Verify Deployment

After deployment:

1. Visit your Vercel URL (e.g., `https://quiz-spark.vercel.app`)
2. Try creating a quiz
3. Check Vercel Function Logs if there are any errors
4. Verify database connection in Supabase Dashboard → Logs

## 🔧 Troubleshooting

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly in Vercel
- Use the **Connection Pooling** connection string from Supabase
- Check Supabase Dashboard → Settings → Database → Connection Pooling

### Build Errors
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes

### API Routes Not Working
- Check Function logs in Vercel Dashboard
- Verify API routes are in `api/` directory
- Check that `vercel.json` is configured correctly

## 📝 Next Steps

Once deployed:
1. Test the application
2. Set up a custom domain (optional)
3. Monitor usage in Vercel Dashboard
4. Check database usage in Supabase Dashboard

