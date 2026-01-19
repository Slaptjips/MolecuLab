# Deployment Guide for Cloudflare Pages

## Prerequisites
- A GitHub, GitLab, or Bitbucket account
- A Cloudflare account (free tier works)
- Node.js installed locally (for building/testing)

## Step 1: Commit and Push Your Code

### 1.1 Stage all changes
```bash
git add .
```

### 1.2 Commit the changes
```bash
git commit -m "Complete MolecuLab application with all 12 modules"
```

### 1.3 Push to remote repository
If you haven't set up a remote repository yet:
```bash
# Create a new repository on GitHub/GitLab/Bitbucket, then:
git remote add origin https://github.com/YOUR_USERNAME/moleculab.git
git push -u origin main
```

If you already have a remote:
```bash
git push origin main
```

## Step 2: Deploy to Cloudflare Pages

### 2.1 Log in to Cloudflare
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign in or create a free account

### 2.2 Navigate to Pages
1. In the left sidebar, click on "Pages"
2. Click "Create a project"
3. Select "Connect to Git"

### 2.3 Connect Your Repository
1. Choose your Git provider (GitHub, GitLab, or Bitbucket)
2. Authorize Cloudflare to access your repositories
3. Select the `moleculab` repository
4. Click "Begin setup"

### 2.4 Configure Build Settings
Use these settings:

**Project name:** `moleculab` (or your preferred name)

**Production branch:** `main`

**Framework preset:** `Vite` (or "None" if Vite isn't listed)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** `/` (leave as default)

**Environment variables:** None required for basic deployment

### 2.5 Deploy
1. Click "Save and Deploy"
2. Cloudflare will start building your project
3. Wait for the build to complete (usually 2-3 minutes)
4. Once complete, you'll get a URL like: `https://moleculab.pages.dev`

## Step 3: Custom Domain (Optional)

### 3.1 Add Custom Domain
1. In your Cloudflare Pages project, go to "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

### 3.2 Configure DNS
- Add a CNAME record pointing to your Pages URL
- Or use Cloudflare's automatic DNS management

## Step 4: Verify Deployment

1. Visit your deployed URL
2. Test all 9 modules to ensure everything works
3. Check browser console for any errors

## Troubleshooting

### Build Fails
- Check the build logs in Cloudflare Pages dashboard
- Ensure Node.js version is compatible (Cloudflare uses Node 18+ by default)
- Verify all dependencies are in `package.json`

### Module Not Found Errors
- Ensure all imports use correct paths
- Check that all files are committed to git

### Environment Variables
If you need environment variables:
1. Go to Settings → Environment variables
2. Add variables for production, preview, and development
3. Redeploy after adding variables

## Continuous Deployment

Cloudflare Pages automatically deploys when you push to your `main` branch. Each pull request also gets a preview deployment URL.

## Build Optimization Note

The build shows a warning about large chunks (>500 KB). For better performance, you can:
1. Use dynamic imports for modules
2. Configure code splitting in `vite.config.ts`
3. Lazy load heavy components

For now, the application will work fine with the current setup.
