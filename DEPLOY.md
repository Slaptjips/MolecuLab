# Quick Deployment Guide - Cloudflare Pages

## Build Settings for Cloudflare Pages

When setting up your Cloudflare Pages project, use these exact settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (leave as default)
- **Node.js version:** `18` or higher (default is fine)
- **Framework preset:** `Vite` or `None` (both work)

## Step-by-Step Instructions

### Step 1: Commit Your Code

Run these commands in your terminal:

```bash
# Stage all files
git add .

# Commit with a message
git commit -m "Complete MolecuLab application - all 12 modules implemented"

# If you have a remote repository, push:
git push origin main

# If you don't have a remote yet, create a repository on GitHub/GitLab/Bitbucket first
```

### Step 2: Create Repository (if needed)

1. Go to GitHub (github.com), GitLab (gitlab.com), or Bitbucket (bitbucket.org)
2. Create a new repository named `moleculab`
3. Don't initialize with README (you already have files)
4. Copy the repository URL
5. Run: `git remote add origin <your-repo-url>`
6. Run: `git push -u origin main`

### Step 3: Deploy to Cloudflare Pages

1. **Sign in to Cloudflare**
   - Go to https://dash.cloudflare.com/
   - Sign in or create a free account

2. **Navigate to Pages**
   - Click "Pages" in the left sidebar
   - Click "Create a project"
   - Click "Connect to Git"

3. **Connect Repository**
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Cloudflare if prompted
   - Select the `moleculab` repository
   - Click "Begin setup"

4. **Configure Build Settings**
   - **Project name:** `moleculab` (or your choice)
   - **Production branch:** `main`
   - **Framework preset:** `Vite` (or leave as "None")
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (default)
   - **Environment variables:** Leave empty for now

5. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://moleculab.pages.dev` (or your custom name)

### Step 4: Test Your Deployment

1. Visit your deployment URL
2. Test all 9 modules:
   - Periodic Table Explorer
   - Bonding & Molecules
   - Chemical Equations
   - Stoichiometry Calculator
   - Acids & Bases
   - Gas Laws
   - Thermochemistry
   - Organic Chemistry
   - Study Tools

3. Check browser console (F12) for any errors

### Step 5: Custom Domain (Optional)

1. In your Pages project, go to "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

## Automatic Deployments

- **Production:** Automatically deploys when you push to `main` branch
- **Preview:** Each pull request gets a preview URL
- **Rollback:** Easy rollback to previous deployments in dashboard

## Troubleshooting

**Build fails?**
- Check build logs in Cloudflare dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct: `npm run build`

**Module not found errors?**
- Ensure all files are committed to git
- Check import paths are correct

**Large bundle warning?**
- This is normal for now
- The app still works perfectly
- Can optimize later with code splitting

## Success! 🎉

Once deployed, your MolecuLab application will be live and accessible to students worldwide!
