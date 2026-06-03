# ✅ Redis Setup Complete!

Your local development is now configured to use Redis. Now you need to add the Redis URL to Vercel for production.

## 🚀 Add Redis URL to Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click on your **wedding-invite** project

### Step 2: Add Environment Variable
1. Click on **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar
3. Click **"Add New"** button

### Step 3: Add REDIS_URL
Fill in the form:
- **Name (Key):** `REDIS_URL`
- **Value:** `redis://default:PEKbjdtpP2iYUqWvzM8LaW72qc6E9tAH@salmonish-sunny-keystone-86919.db.redis.io:17506`
- **Environment:** Check **Production**, **Preview**, and **Development**
- Click **"Save"**

### Step 4: Redeploy
After adding the environment variable:
1. Go to **"Deployments"** tab
2. Click the **⋯** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~1-2 minutes)

## ✅ Verification

After redeployment:
1. Visit your Vercel URL (e.g., https://wedding-invite-xxx.vercel.app)
2. Try adding a name through the admin panel
3. It should work! ✨

## 🔧 Troubleshooting

### Error: "Cannot connect to Redis"
- Make sure REDIS_URL is added to Vercel environment variables
- Check that the value is exactly: `redis://default:PEKbjdtpP2iYUqWvzM8LaW72qc6E9tAH@salmonish-sunny-keystone-86919.db.redis.io:17506`
- Redeploy after adding the variable

### Error: "Function timeout"
- Redis connection might be slow
- Check if Redis server is accessible from Vercel
- Try pinging the Redis URL

## 📝 What Changed

### Files Created:
- ✅ `.env` - Contains Redis URL for local development (NOT pushed to GitHub)
- ✅ `.gitignore` - Prevents sensitive files from being pushed
- ✅ `api/db.js` - Redis client wrapper (works locally and on Vercel)

### Files Updated:
- ✅ `api/guests.js` - Now uses Redis via db.js
- ✅ `api/rsvp.js` - Now uses Redis via db.js
- ✅ `package.json` - Added redis and dotenv packages

## 🎯 Next Steps

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Redis support for production"
   git push
   ```

2. **Add REDIS_URL to Vercel** (follow steps above)

3. **Test your live website!**

---

Your wedding invitation website is ready to go live! 🎉
