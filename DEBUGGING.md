# Debugging Guide for MolecuLab

## Common Issues and Solutions

### 1. Console Errors (Open DevTools with F12)

#### "Module not found" or 404 errors
- **Check:** Browser console for missing file paths
- **Solution:** Verify all imports use relative paths (no `@/` aliases that might not resolve)
- **Fix:** Update vite.config.ts base path if needed

#### React/ReactDOM errors
- **Check:** Browser console for React-related errors
- **Solution:** Ensure React and ReactDOM are in dependencies (already in package.json)

#### Chart.js or D3.js errors
- **Check:** Console for "Chart is not defined" or "d3 is not defined"
- **Solution:** Verify Chart.js and D3 are imported correctly in components

### 2. Visual Issues

#### Styling not loading (plain HTML)
- **Check:** Network tab for CSS file loading
- **Solution:** Ensure Tailwind CSS is configured correctly
- **Fix:** Check that `index.css` imports Tailwind directives

#### Components not rendering
- **Check:** Browser console for React errors
- **Solution:** Check if all components are exported correctly

### 3. Functional Issues

#### Calculations not working
- **Check:** Console for JavaScript errors
- **Solution:** Verify utility functions are imported correctly

#### State not updating
- **Check:** Zustand store initialization
- **Solution:** Check store files for errors

### 4. Cloudflare Pages Specific Issues

#### Base path issues
If your site is deployed at a subpath (e.g., `/moleculab/`):
- Update `vite.config.ts` with `base: '/moleculab/'`
- Rebuild and redeploy

#### Asset loading issues
- Check that assets are in the `dist` folder
- Verify asset paths are relative

## Debugging Steps

### Step 1: Check Browser Console
1. Open your deployed site
2. Press F12 (or Right-click → Inspect)
3. Go to "Console" tab
4. Look for red error messages
5. **Copy and share the errors you see**

### Step 2: Check Network Tab
1. In DevTools, go to "Network" tab
2. Refresh the page
3. Look for failed requests (red entries)
4. Check if CSS/JS files are loading (status 200)

### Step 3: Test Local Build
```bash
npm run build
npm run preview
```
This tests if the production build works locally before deploying.

### Step 4: Check Build Output
Verify that `dist` folder contains:
- `index.html`
- `assets/` folder with CSS and JS files

## Quick Fixes

### If you see specific error messages, try these:

**"Cannot find module"**
- Check import paths in the component file
- Verify the file exists in the repository

**"React is not defined"**
- Check that React is imported: `import React from 'react'`

**Blank white screen**
- Check console for React render errors
- Verify `main.tsx` is mounting the App correctly

**Styling broken**
- Check that `index.css` is imported in `main.tsx`
- Verify Tailwind is configured in `tailwind.config.js`

## Share Your Errors

To help debug, please share:
1. **Error messages from browser console** (copy/paste)
2. **What you see** (blank screen, partial rendering, etc.)
3. **Which module** is affected (or is it all modules?)
4. **Browser you're using** (Chrome, Firefox, Safari, etc.)

Once I know the specific errors, I can provide targeted fixes!
