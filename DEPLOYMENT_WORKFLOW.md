# GitHub Pages Deployment Workflow

## 🔄 Complete Workflow Process

### Step 1: Code Push
- You push code to `main` branch
- GitHub Actions automatically triggers

### Step 2: Build Job
1. **Checkout** - Gets your code
2. **Setup Node.js** - Installs Node 20
3. **Install Dependencies** - Runs `npm ci`
4. **Build Static Site** - Runs `npm run build:static`
   - Creates `dist/public/` folder with HTML, CSS, JS
5. **Upload Artifact** - Uploads built files to GitHub

### Step 3: Deploy Job
1. **Wait for Build** - Only runs after build succeeds
2. **Deploy to Pages** - Publishes files to GitHub Pages
3. **Site Goes Live** - Available at `https://jojopujari7-hub.github.io/Quiz-Spark/`

## ⚠️ Important: Enable GitHub Pages First!

**The workflow will FAIL until you enable GitHub Pages:**

1. Go to: **https://github.com/jojopujari7-hub/Quiz-Spark/settings/pages**
2. Under **"Source"**, select **"GitHub Actions"**
3. Click **"Save"**

**Without this, the deploy job will fail!**

## ✅ After Enabling Pages

Once you enable GitHub Pages:
- The workflow will run automatically on every push
- Your site will be live in ~2-3 minutes
- URL: `https://jojopujari7-hub.github.io/Quiz-Spark/`

## 🔍 Check Status

- **Workflow runs**: https://github.com/jojopujari7-hub/Quiz-Spark/actions
- **Pages settings**: https://github.com/jojopujari7-hub/Quiz-Spark/settings/pages

## 🐛 Troubleshooting

If workflow fails:
1. Check the Actions tab for error messages
2. Make sure GitHub Pages is enabled (see above)
3. Verify the build works locally: `npm run build:static`

