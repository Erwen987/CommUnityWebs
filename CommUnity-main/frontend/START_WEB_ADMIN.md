# Quick Start Guide - Web Admin Panel

## Step 1: Install Dependencies

Open PowerShell or Command Prompt and run:

```bash
cd "c:\Users\Jv\Downloads\CommUnity-main\CommUnity-main\frontend"
npm install
```

This will install all required packages.

## Step 2: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 3: Get Your Supabase Credentials

You need two things from your Supabase project:

1. **Project URL**: `https://xxxxx.supabase.co`
2. **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Where to find them:

#### Option A: From your Android project
Open `c:\Users\Jv\AndroidStudioProjects\CommUnity\local.properties` and look for:
```
supabase.url=YOUR_URL_HERE
supabase.key=YOUR_KEY_HERE
```

#### Option B: From Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your CommUnity project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**
   - **anon/public key**

## Step 4: Create Supabase Configuration File

Create a new file: `src/supabaseClient.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'PASTE_YOUR_SUPABASE_URL_HERE'
const supabaseAnonKey = 'PASTE_YOUR_SUPABASE_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Replace the placeholder values with your actual Supabase credentials.

## Step 5: Start the Development Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 6: Create an Official Account

Before you can login to the web panel, you need an official account.

### Option A: Update existing account
1. Open Supabase Dashboard → SQL Editor
2. Run this query (replace with your email):
   ```sql
   UPDATE public.users 
   SET role = 'official' 
   WHERE email = 'your-email@gmail.com';
   ```

### Option B: Create new official account
1. Sign up through mobile app with a new email
2. Verify the OTP
3. Run the SQL query above to update the role

## Step 7: Login to Web Panel

1. Go to `http://localhost:3000/login`
2. Enter your official email and password
3. Click LOGIN

If everything is set up correctly, you'll be redirected to the dashboard!

## Troubleshooting

### Error: "Module not found: Can't resolve '@supabase/supabase-js'"
**Solution**: Run `npm install @supabase/supabase-js`

### Error: "Access denied. This portal is for officials only."
**Solution**: Make sure you updated the user role to 'official' in Supabase

### Error: "Invalid login credentials"
**Solution**: 
- Make sure you're using the correct email and password
- Verify the account exists in Supabase → Authentication → Users

### Error: CORS or network errors
**Solution**: 
- Check your Supabase URL and key are correct
- Make sure your Supabase project is active
- Check Supabase Dashboard → Authentication → URL Configuration

## What You'll See

After logging in, the dashboard will show:
- **Recent Reports**: Latest 10 reports from residents
- **Deleted Accounts**: Recently deleted accounts with reasons
- User info in the header
- Logout button

## Next Steps

Once the basic setup is working, you can:
1. Add more dashboard pages (Reports, Users, Analytics)
2. Add report management features
3. Add user management features
4. Add charts and statistics
5. Add export functionality

See `WEB_ADMIN_SETUP.md` for detailed implementation guides.

## Quick Commands Reference

```bash
# Navigate to frontend
cd "c:\Users\Jv\Downloads\CommUnity-main\CommUnity-main\frontend"

# Install dependencies
npm install

# Install Supabase client
npm install @supabase/supabase-js

# Start development server
npm start

# Build for production
npm run build
```

## File Structure

After setup, your frontend should have:
```
frontend/
├── src/
│   ├── supabaseClient.js       (NEW - Supabase config)
│   ├── pages/
│   │   ├── Login.js            (UPDATE - Add auth logic)
│   │   └── Dashboard.js        (NEW - Dashboard page)
│   ├── App.js                  (UPDATE - Add routes)
│   └── ...
├── package.json
└── ...
```

## Support

If you need help:
1. Check `WEB_ADMIN_SETUP.md` for detailed guides
2. Check browser console for errors (F12)
3. Check Supabase Dashboard → Logs for API errors
4. Verify your Supabase credentials are correct
