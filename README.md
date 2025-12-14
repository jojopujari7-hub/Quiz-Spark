# Quiz Spark

A quiz generation application built with React, Express, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/quizspark
   PORT=3000
   NODE_ENV=development
   ```

3. **Set up the database:**
   - See [SETUP.md](./SETUP.md) for detailed database setup instructions
   - Quick Docker setup:
     ```bash
     docker run --name quiz-spark-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=quizspark -p 5432:5432 -d postgres:15
     psql postgresql://postgres:postgres@localhost:5432/quizspark -f supabase/migrations/20251214211717_create_quizzes_table.sql
     ```
   - Or use Drizzle Kit to push the schema:
     ```bash
     npx drizzle-kit push
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server (requires build first)

## Project Structure

- `client/` - React frontend application
- `server/` - Express backend server
- `shared/` - Shared TypeScript types and schemas
- `supabase/migrations/` - Database migration files

