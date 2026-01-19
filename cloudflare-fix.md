# Fix for Cloudflare Pages Deploy Error

## Problem
The build succeeds, but the deploy fails because Cloudflare Pages is trying to run `npx wrangler deploy`, which is for Cloudflare Workers, not Pages.

## Solution

### In Cloudflare Pages Dashboard:

1. **Go to your Pages project settings:**
   - Navigate to your MolecuLab project in Cloudflare Pages
   - Click on "Settings" tab
   - Scroll to "Builds & deployments"

2. **Check/Clear the Deploy Command:**
   - Look for "Deploy command" field
   - **It should be EMPTY/BLANK** for static sites
   - If there's `npx wrangler deploy` or any deploy command, **DELETE IT**
   - Leave it empty

3. **Verify Build Settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (blank/empty)
   - **Deploy command:** (EMPTY - no command here!)

4. **Save and Redeploy:**
   - Click "Save"
   - Go to "Deployments" tab
   - Click "Retry deployment" or "Create deployment" → "Deploy latest commit"

## Why This Happens
- Cloudflare Pages automatically serves static files from the `dist` directory
- No deploy command is needed for static sites
- Wrangler is only for Cloudflare Workers (serverless functions)

## After Fix
Your site should deploy successfully and be accessible at your Pages URL (e.g., `https://moleculab.pages.dev`)
