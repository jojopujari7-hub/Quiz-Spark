# Quiz Spark Architecture

## Overview

Quiz Spark uses a **hybrid architecture**:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│   Frontend      │────────▶│   API Routes     │────────▶│   PostgreSQL    │
│   (Vercel)      │         │   (Vercel)       │         │   (External)    │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
   Static Files              Serverless Functions         Database Provider
```

## Components

### 1. Frontend (Vercel)
- **Hosted on**: Vercel
- **Type**: Static files (React app built with Vite)
- **Location**: `dist/public` after build
- **Cost**: Free tier available

### 2. API Routes (Vercel)
- **Hosted on**: Vercel Serverless Functions
- **Type**: Node.js serverless functions
- **Location**: `api/` directory
- **Cost**: Free tier available (with limits)

### 3. Database (External Provider)
- **Hosted on**: External PostgreSQL provider
- **Type**: PostgreSQL database
- **Options**: Supabase, Neon, Railway, Render, etc.
- **Cost**: Free tiers available

## Why This Architecture?

### Vercel's Strengths
✅ **Frontend hosting** - Excellent CDN, fast static file delivery  
✅ **Serverless functions** - Auto-scaling API routes  
✅ **Easy deployment** - Git-based deployments  
✅ **Free tier** - Great for small projects  

### Vercel's Limitations
❌ **No database service** - Vercel doesn't provide databases  
❌ **Serverless limitations** - Functions have timeout limits  
❌ **Cold starts** - First request can be slower  

### Why External Database?
✅ **Specialized providers** - Better database features  
✅ **More control** - Choose the right database for your needs  
✅ **Better performance** - Dedicated database servers  
✅ **Free tiers** - Many providers offer generous free tiers  

## How It Works

1. **User visits your Vercel URL** (e.g., `https://quiz-spark.vercel.app`)
   - Vercel serves the static React frontend

2. **User creates a quiz**
   - Frontend makes API call to `/api/quizzes`
   - Vercel routes to serverless function `api/quizzes/index.ts`

3. **Serverless function processes request**
   - Function connects to external PostgreSQL database
   - Uses `DATABASE_URL` environment variable
   - Creates quiz and returns response

4. **Response sent back**
   - Function returns JSON
   - Frontend updates UI

## Environment Variables

You need to set these in Vercel:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

This tells your Vercel serverless functions where to find the database.

## Database Provider Options

Since Vercel doesn't provide databases, you need an external provider:

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Supabase** | ✅ 500MB | Quick setup, great dashboard |
| **Neon** | ✅ 512MB | Serverless, auto-scaling |
| **Railway** | ✅ $5 credit | Simple deployment |
| **Render** | ✅ 90 days | Simple deployment |

## Cost Breakdown

### Free Tier Setup
- **Vercel**: Free (frontend + API)
- **Database**: Free (Supabase/Neon free tier)
- **Total**: $0/month ✅

### Paid Tiers (if needed)
- **Vercel Pro**: $20/month (if you exceed free limits)
- **Database**: Varies by provider (usually starts around $5-10/month)

## Summary

**Vercel = Frontend + API**  
**External Provider = Database**

This is a common and recommended architecture pattern! Many successful apps use this setup.

