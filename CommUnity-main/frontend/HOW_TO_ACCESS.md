# How to Access the Web App

## ✅ The Server is Running!

Your web server is currently running in the background.

## How to Open the Web App

### Option 1: Click this link
Open your web browser and go to:

**http://localhost:3000**

### Option 2: Copy and paste
1. Open your web browser (Chrome, Edge, Firefox, etc.)
2. Copy this URL: `http://localhost:3000`
3. Paste it in the address bar
4. Press Enter

### Option 3: Type manually
1. Open your web browser
2. Type in the address bar: `localhost:3000`
3. Press Enter

## What You'll See

### Homepage (http://localhost:3000)
- CommUnity landing page
- Header with navigation
- Hero section
- About, Features, Contact sections

### Login Page (http://localhost:3000/login)
- Login form
- Enter your email and password
- Click LOGIN button
- You'll be logged in and redirected to homepage

## To Test Login

1. Go to: http://localhost:3000/login
2. Enter your email (from mobile app)
3. Enter your password
4. Click LOGIN
5. You should see: "Welcome back, [Your Name]!"

## If You Can't Access It

### Check 1: Is the server running?
Look for a command prompt window that says:
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

### Check 2: Try these URLs
- http://localhost:3000
- http://127.0.0.1:3000

### Check 3: Restart the server
1. Close any command prompt windows
2. Go to: `c:\Users\Jv\Downloads\CommUnity-main\CommUnity-main\frontend`
3. Double-click `start-web.bat`
4. Wait for "Compiled successfully!"
5. Open browser to http://localhost:3000

## Common Issues

### "This site can't be reached"
- The server is not running
- Run `start-web.bat` again

### "Connection refused"
- Port 3000 is blocked
- Try closing other programs using port 3000

### Page is blank
- Wait a few seconds for it to load
- Refresh the page (F5)
- Check browser console (F12) for errors

## To Stop the Server

1. Find the command prompt window running the server
2. Press `Ctrl+C`
3. Type `Y` and press Enter

Or just close the command prompt window.

## Quick Test

Right now, open your browser and type:
```
localhost:3000
```

You should see the CommUnity homepage!

Then go to:
```
localhost:3000/login
```

You should see the login page where you can login with your mobile app credentials!
