# Database Options for Quiz Spark

Quiz Spark uses **standard PostgreSQL** - you can use **any PostgreSQL database provider**. The `supabase/` folder name is just a convention; it's not tied to Supabase.

## Quick Comparison

| Provider | Free Tier | Ease of Setup | Best For |
|----------|-----------|---------------|----------|
| **Supabase** | ✅ Generous | ⭐⭐⭐⭐⭐ | Quick setup, great dashboard |
| **Neon** | ✅ Generous | ⭐⭐⭐⭐⭐ | Serverless PostgreSQL, auto-scaling |
| **Railway** | ✅ Limited | ⭐⭐⭐⭐ | Simple deployment |
| **Render** | ✅ Limited | ⭐⭐⭐⭐ | Simple deployment |
| **Self-hosted** | ✅ Free | ⭐⭐ | Full control |

## Recommended: Supabase or Neon

Both are excellent free options:

### Why Supabase?
- ✅ Generous free tier (500MB database, 2GB bandwidth)
- ✅ Great web dashboard with SQL editor
- ✅ Built-in connection pooling
- ✅ Easy to use

### Why Neon?
- ✅ Serverless PostgreSQL (scales to zero)
- ✅ Branching (like Git for databases)
- ✅ Auto-scaling
- ✅ Great for development

## Setup Steps (Same for All)

1. **Create account** on your chosen provider
2. **Create a PostgreSQL database**
3. **Get connection string** (format: `postgresql://user:password@host:port/database`)
4. **Run migration**:
   - Copy SQL from `supabase/migrations/20251214211717_create_quizzes_table.sql`
   - Run it in your database (SQL editor, psql, or provider's console)
5. **Set `DATABASE_URL`** environment variable in Vercel

## Migration SQL

The migration file contains standard PostgreSQL SQL that works with any PostgreSQL database:

```sql
CREATE TABLE IF NOT EXISTS quizzes (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid()::varchar,
  topic text NOT NULL,
  seed_questions text[] NOT NULL DEFAULT '{}',
  generated_questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);
-- ... (RLS policies)
```

## No Supabase SDK Required

This project uses:
- ✅ Standard PostgreSQL (`pg` driver)
- ✅ Drizzle ORM (works with any PostgreSQL)
- ✅ Standard SQL migrations

**No Supabase-specific code or dependencies needed!**

