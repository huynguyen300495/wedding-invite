# Vercel Deployment Guide

## Problem: Website works locally but not on Vercel

The issue is that your Vercel deployment needs a **Redis database** (formerly called Vercel KV) to store guest data.

## ✅ Solution: Set up Redis on Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com
2. Log in to your account
3. Click on your project (wedding-invite)

### Step 2: Add Redis Database
1. Click on the **"Storage"** tab at the top
2. Click **"Create Database"**
3. Select **"Redis"** (it will redirect you to Vercel Marketplace)
4. OR go directly to: https://vercel.com/marketplace?category=storage&search=redis
5. Choose one of these Redis providers:
   - **Upstash Redis** (Recommended - Free tier available)
   - **Redis Cloud**
   - Any other Redis provider

### Step 3: Install Upstash Redis (Recommended)
1. Click on **"Upstash Redis"**
2. Click **"Add Integration"**
3. Select your project: **wedding-invite**
4. Click **"Continue"**
5. Name your database: `wedding-guests` (or any name you like)
6. Choose region: **Select closest to you**
7. Click **"Create Database"**

### Step 4: Connect to Your Project
1. After creating the database, Vercel will ask you to connect it
2. Select your project: **wedding-invite**
3. Click **"Connect"**
4. Vercel will automatically add the environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### Step 5: Update Your Code (if needed)

Your current code uses `@vercel/kv` which is deprecated. Update to use Upstash Redis:

**Option A: Keep using @vercel/kv (simpler, works with Upstash)**
- No changes needed! Upstash works with @vercel/kv

**Option B: Use Upstash SDK directly (recommended)**
- I can help you update the code if needed

### Step 6: Redeploy
After setting up Redis:
1. Go back to your project dashboard
2. Click **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete

OR just push a new commit to trigger automatic deployment.

## 🔍 Troubleshooting

### Error: "Cannot connect to KV"
- Make sure Redis database is connected to your project
- Check Environment Variables in Vercel:
  - Go to Project Settings → Environment Variables
  - Make sure `KV_REST_API_URL` and `KV_REST_API_TOKEN` exist

### Error: "Function timeout"
- Increase function timeout in `vercel.json`:
  ```json
  {
    "functions": {
      "api/*.js": {
        "memory": 128,
        "maxDuration": 30
      }
    }
  }
  ```

### Still not working?
1. Check Vercel deployment logs:
   - Go to your project
   - Click "Deployments"
   - Click on the latest deployment
   - Click "View Function Logs"
2. Look for error messages

## 📝 Quick Checklist

- [ ] Redis database created on Vercel
- [ ] Redis connected to wedding-invite project
- [ ] Environment variables added automatically
- [ ] Project redeployed
- [ ] Test the website on Vercel URL

## 🎯 After Setup

Once Redis is set up:
1. Your website will work on Vercel
2. Guest data will be stored in Redis
3. You can add/delete guests through the admin panel
4. Data persists between deployments

## Need Help?

If you still have issues, share:
1. Your Vercel project URL
2. Any error messages from Vercel logs
3. Screenshots of the error
