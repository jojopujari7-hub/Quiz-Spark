# How to Find Your Supabase Connection String

## Quick Steps:

1. **Go to your Supabase project dashboard:**
   https://supabase.com/dashboard/project/ekaykrxsfwpfzsmzxegj

2. **Look for the "Connect" button** - It's usually a big button at the top of the page, or in the sidebar

3. **Click "Connect"** - This opens a modal/dialog

4. **In the modal, you'll see tabs like:**
   - URI
   - JDBC
   - GORM
   - etc.

5. **Click on the "URI" tab**

6. **You'll see connection strings** - Look for the one labeled:
   - **"Connection Pooling"** (port 6543) - **USE THIS ONE** ✅
   - Or "Direct connection" (port 5432)

7. **Copy the Connection Pooling connection string**

## Alternative Location:

If you don't see the "Connect" button:

1. Go to **Settings** (gear icon in sidebar)
2. Click **Database**
3. Scroll down to find **Connection string** or **Connection info**
4. Look for the **URI** format connection string

## What It Should Look Like:

```
postgresql://postgres.ekaykrxsfwpfzsmzxegj:[YOUR-PASSWORD]@aws-0-us-west-2.pooler.supabase.com:6543/postgres
```

**Important**: Replace `[YOUR-PASSWORD]` with your actual database password (the one you set when creating the project, or you can reset it in Database Settings).

## If You Need to Reset Your Password:

1. Go to **Settings** → **Database**
2. Look for **Database password** section
3. Click **Reset database password**
4. Copy the new password
5. Use it in the connection string

