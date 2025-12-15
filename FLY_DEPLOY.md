# Deploy to Fly.io (Free, Works on SFUSD Chromebooks)

Fly.io offers a **free tier** with `.fly.dev` domains that should work on school Chromebooks!

## Quick Setup:

### 1. Install Fly CLI
```bash
# macOS
curl -L https://fly.io/install.sh | sh

# Or using Homebrew
brew install flyctl
```

### 2. Sign up / Login
```bash
flyctl auth signup
# Or if you have an account:
flyctl auth login
```

### 3. Deploy from GitHub
```bash
cd /Users/nikhilpujari/Quiz-Spark
flyctl launch
```

When prompted:
- **App name**: `quiz-spark` (or choose your own)
- **Region**: Choose closest (e.g., `sjc` for San Francisco)
- **Postgres**: **No** (we're using Supabase)
- **Redis**: **No**

### 4. Set Database URL
```bash
flyctl secrets set DATABASE_URL="your-supabase-pooler-connection-string"
```

### 5. Deploy!
```bash
flyctl deploy
```

### 6. Your app will be live at:
```
https://quiz-spark.fly.dev
```

## Free Tier Limits:
- ✅ 3 shared-cpu-1x VMs (256MB RAM each)
- ✅ 3GB persistent volume storage
- ✅ 160GB outbound data transfer/month
- ✅ Perfect for school projects!

## If you need to update:
```bash
git push origin main
flyctl deploy
```

## View logs:
```bash
flyctl logs
```

## Scale down (to save free tier):
```bash
flyctl scale count 0  # Stops the app
flyctl scale count 1  # Starts it again
```

---

**Note**: The app will auto-sleep after inactivity on free tier, but wakes up quickly when accessed!

