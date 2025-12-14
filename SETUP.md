# Quick Setup Guide

## Database Setup

The application requires a PostgreSQL database. Here are quick setup options:

### Option 1: Using Docker (Recommended for Quick Testing)

```bash
# Start PostgreSQL in Docker
docker run --name quiz-spark-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quizspark \
  -p 5432:5432 \
  -d postgres:15

# Wait a few seconds for PostgreSQL to start, then run migrations
psql postgresql://postgres:postgres@localhost:5432/quizspark -f supabase/migrations/20251214211717_create_quizzes_table.sql
```

### Option 2: Using Local PostgreSQL

1. Install PostgreSQL if not already installed:
   - macOS: `brew install postgresql@15`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`
   - Windows: Download from https://www.postgresql.org/download/

2. Start PostgreSQL service:
   ```bash
   # macOS
   brew services start postgresql@15
   
   # Linux
   sudo systemctl start postgresql
   ```

3. Create database and user:
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE quizspark;
   CREATE USER quizuser WITH PASSWORD 'quizpass';
   GRANT ALL PRIVILEGES ON DATABASE quizspark TO quizuser;
   \q
   ```

4. Run migrations:
   ```bash
   psql postgresql://quizuser:quizpass@localhost:5432/quizspark -f supabase/migrations/20251214211717_create_quizzes_table.sql
   ```

### Option 3: Using Supabase (Cloud Database)

1. Create a free account at https://supabase.com
2. Create a new project
3. Get your database connection string from Project Settings > Database
4. Use that as your `DATABASE_URL`

## Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/quizspark
PORT=3000
NODE_ENV=development
```

Replace `user`, `password`, and `quizspark` with your actual database credentials.

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Troubleshooting

### "Database connection failed" error

- Ensure PostgreSQL is running: `pg_isready` or check Docker container status
- Verify DATABASE_URL is correct in your `.env` file
- Check that the database exists: `psql -l` should list `quizspark`
- Ensure migrations have been run

### "Database table not found" error

Run the migration:
```bash
psql $DATABASE_URL -f supabase/migrations/20251214211717_create_quizzes_table.sql
```

Or use Drizzle Kit:
```bash
npx drizzle-kit push
```

