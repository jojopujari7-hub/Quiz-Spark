# Troubleshooting GitHub Pages Deployment

## 🔍 How to Check Workflow Errors

1. Go to: **https://github.com/jojopujari7-hub/Quiz-Spark/actions**
2. Click on the **latest workflow run** (red X = failed, green ✓ = success)
3. Click on the **failed job** (usually "build" or "deploy")
4. Expand the **failed step** to see the error message

## 🐛 Common Errors & Fixes

### Error: "Environment 'github-pages' not found"
**Fix:** 
- Go to: https://github.com/jojopujari7-hub/Quiz-Spark/settings/pages
- Make sure **"Source"** is set to **"GitHub Actions"**
- Click **Save**
- Wait 1-2 minutes for environment to be created
- Re-run the workflow (Actions → Run workflow)

### Error: "Path './dist/public' does not exist"
**Fix:** Already fixed! The path is now `dist/public` (without `./`)

### Error: Build fails with "npm ci" error
**Possible causes:**
- `package-lock.json` is out of sync
- Run locally: `npm install` then commit `package-lock.json`

### Error: "Permission denied" or "403"
**Fix:**
- Make sure repository is **public** (or you have Pages enabled for private repos)
- Check repository settings → Pages → Visibility

## ✅ Verify Locally

Before pushing, test the build:
```bash
npm run build:static
ls -la dist/public/index.html  # Should exist
```

## 🔄 Re-run Workflow

If workflow fails:
1. Go to: https://github.com/jojopujari7-hub/Quiz-Spark/actions
2. Click on the failed run
3. Click **"Re-run all jobs"** (or "Re-run failed jobs")

## 📝 Current Status

- ✅ Workflow file: `.github/workflows/deploy.yml`
- ✅ Build script: `npm run build:static`
- ✅ Output path: `dist/public`
- ✅ GitHub Pages enabled: Check settings

