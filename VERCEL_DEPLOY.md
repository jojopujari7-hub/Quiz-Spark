# Deploying to Vercel

This guide will help you deploy Quiz Spark to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. **An external PostgreSQL database** - Vercel doesn't provide databases, so you need one from:
   - [Supabase](https://supabase.com) (recommended - free tier)
   - [Neon](https://neon.tech) (recommended - free tier)
   - [Railway](https://railway.app) (free tier)
   - [Render](https://render.com) (free tier)
   - Or any other PostgreSQL provider
3. Git repository (GitHub, GitLab, or Bitbucket)

> **Note**: Vercel hosts your frontend and API routes, but you need an external database provider. See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## Step 1: Set Up Database

You need a PostgreSQL database. Choose any of these options:

### Option A: Supabase (Recommended - Free & Easy)

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection string** (URI format)
5. Run the migration:
   - Go to **SQL Editor** in Supabase dashboard
   - Copy the contents of `supabase/migrations/20251214211717_create_quizzes_table.sql`
   - Paste and run it in the SQL Editor

### Option B: Neon (Free & Easy)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy the connection string
4. Connect to your database and run:
   ```bash
   psql $DATABASE_URL -f supabase/migrations/20251214211717_create_quizzes_table.sql
   ```

### Option C: Railway (Free Tier)

1. Go to https://railway.app and create a free account
2. Create a new PostgreSQL database
3. Copy the connection string from the database settings
4. Run migrations via Railway's database console or CLI

### Option D: Render (Free Tier)

1. Go to https://render.com and create a free account
2. Create a new PostgreSQL database
3. Copy the connection string
4. Run migrations via Render's database console

### Option E: Any Other PostgreSQL Provider

Any PostgreSQL database will work! Just:
1. Get your connection string (format: `postgresql://user:password@host:port/database`)
2. Run the migration SQL from `supabase/migrations/20251214211717_create_quizzes_table.sql`

## Step 2: Deploy to Vercel

### Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **No**
   - Project name: **quiz-spark** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

5. Set environment variables:
   ```bash
   vercel env add DATABASE_URL
   ```
   Paste your database connection string when prompted.

6. Deploy to production:
   ```bash
   vercel --prod
   ```

### Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
4. Add environment variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your PostgreSQL connection string
5. Click **Deploy**

## Step 3: Verify Deployment

1. After deployment, Vercel will provide you with a URL (e.g., `https://quiz-spark.vercel.app`)
2. Visit the URL to test your application
3. Try creating a quiz to verify the database connection

## Environment Variables

Make sure these are set in Vercel:

- `DATABASE_URL` - Your PostgreSQL connection string (required)
- `NODE_ENV` - Set to `production` (optional, defaults to production on Vercel)

## Troubleshooting

### Database Connection Errors

- Verify `DATABASE_URL` is set correctly in Vercel dashboard
- Check that your database allows connections from Vercel's IP addresses
- For Supabase: Go to **Settings** → **Database** → **Connection Pooling** and use the pooled connection string

### Build Errors

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### API Routes Not Working

- Check that API routes are in the `api/` directory
- Verify file names match the route structure (`api/quizzes/index.ts` for `/api/quizzes`)
- Check function logs in Vercel dashboard

## Updating Your Deployment

After making changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically deploy on push to your main branch, or:

```bash
vercel --prod
```

## Custom Domain

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

