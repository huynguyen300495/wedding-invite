# Local Development Guide

## ✅ Server is Running!

Your wedding invitation website is now running locally at:
**http://localhost:3000**

## 🎯 How to Add/Delete Names:

### 1. Open the Website
Open your browser and go to: http://localhost:3000

### 2. Access Admin Panel
- Look for the admin button (usually at the top or bottom of the page)
- Click it to show the password prompt

### 3. Enter Password
- Password: `huydeptrai`
- Click "Xác nhận" (Confirm)

### 4. Add a Guest
- Type the guest's name in the input field
- Press Enter or click the "+ Thêm" button
- The name will be added to the list

### 5. Delete a Guest
- Click the "×" button next to any name in the admin panel
- The guest will be removed from the list

## 📝 Data Storage

All guest data is stored locally in:
`/Users/huynguyen/Desktop/wedding_invite/wedding-invite/guests.json`

You can view this file to see all the guests in JSON format.

## 🛠️ Commands

Start the server:
```bash
npm run dev
```

Stop the server:
- Press `Ctrl + C` in the terminal

## 🌐 Production Deployment

When you're ready to deploy to Vercel:
1. The server will use Vercel KV instead of the local JSON file
2. Push your changes to GitHub
3. Vercel will automatically deploy

## 🔧 Troubleshooting

**Port already in use?**
If port 3000 is already being used, you can:
1. Stop the other service using port 3000
2. Or edit `server.js` and change `PORT = 3000` to another port like `3001`

**Can't add duplicate names?**
The system prevents adding duplicate names to avoid confusion.

**Need to reset the guest list?**
Delete or edit the `guests.json` file.
