# CommUnity Web Admin Panel Setup Guide

This guide will help you set up and run the CommUnity web admin panel that connects to the same Supabase backend as the mobile app.

## Overview

The web admin panel consists of:
- **Frontend**: React app (port 3000)
- **Backend**: Laravel API (currently using SQLite, needs to connect to Supabase)
- **Purpose**: For officials and admins to manage residents, view reports, and see deleted accounts

## Prerequisites

- Node.js v20.11.1 (already included in `node-v20.11.1-win-x64` folder)
- PHP 8.1+ (for Laravel backend)
- Composer (PHP package manager)
- Your Supabase project URL and API keys

## Quick Start (Frontend Only)

If you just want to run the frontend to see the UI:

### Step 1: Navigate to Frontend Directory

```bash
cd "c:\Users\Jv\Downloads\CommUnity-main\CommUnity-main\frontend"
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Connecting Frontend to Supabase

To connect the React frontend directly to Supabase (bypassing Laravel backend):

### Step 1: Install Supabase Client

```bash
cd "c:\Users\Jv\Downloads\CommUnity-main\CommUnity-main\frontend"
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Configuration

Create a new file `src/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Replace:
- `YOUR_SUPABASE_PROJECT_URL` with your Supabase project URL (from Android app's `local.properties`)
- `YOUR_SUPABASE_ANON_KEY` with your Supabase anon key

### Step 3: Update Login Page

Modify `src/pages/Login.js` to use Supabase authentication:

```javascript
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check if user is an official/admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('auth_id', data.user.id)
        .single();

      if (userError) throw userError;

      // Only allow officials and admins
      if (userData.role !== 'official' && userData.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Access denied. This portal is for officials only.');
      }

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logo">CommUnity.</div>
        <nav>
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* ================= MAIN ================= */}
      <main className="hero">
        <div className="hero-bg"></div>

        <div className="login-wrapper">
          <div className="login-container">
            {/* LEFT SIDE: OVERVIEW */}
            <div className="login-overview">
              <h2>Officials Portal</h2>
              <p>
                Manage your barangay community, review reports,
                and monitor resident activities.
              </p>

              <ul className="overview-points">
                <li>✔ View and manage reports</li>
                <li>✔ Monitor resident activities</li>
                <li>✔ Review deleted accounts</li>
                <li>✔ Manage barangay services</li>
              </ul>
            </div>

            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="login-form">
              <h2>OFFICIALS LOGIN</h2>

              {error && (
                <div style={{
                  padding: '10px',
                  marginBottom: '15px',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '4px',
                  color: '#c33'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your official email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <a href="#" className="forgot-link">Forgot Password?</a>

                <button type="submit" disabled={loading}>
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </button>

                <p className="signup-text">
                  For residents: <a href="#">Download Mobile App</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
```

### Step 4: Create Dashboard Page

Create `src/pages/Dashboard.js`:

```javascript
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [deletedAccounts, setDeletedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchReports();
    fetchDeletedAccounts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (!profile || (profile.role !== 'official' && profile.role !== 'admin')) {
      await supabase.auth.signOut();
      navigate('/login');
      return;
    }

    setUser(profile);
    setLoading(false);
  };

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error) setReports(data || []);
  };

  const fetchDeletedAccounts = async () => {
    const { data, error } = await supabase
      .from('deleted_accounts_view')
      .select('*')
      .order('deleted_at', { ascending: false })
      .limit(10);

    if (!error) setDeletedAccounts(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1>CommUnity Dashboard</h1>
        <div>
          <span>Welcome, {user?.first_name} {user?.last_name}</span>
          <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent Reports */}
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px' 
        }}>
          <h2>Recent Reports</h2>
          {reports.length === 0 ? (
            <p>No reports yet</p>
          ) : (
            <ul>
              {reports.map(report => (
                <li key={report.id} style={{ marginBottom: '10px' }}>
                  <strong>{report.title}</strong>
                  <br />
                  <small>{report.description}</small>
                  <br />
                  <small>Status: {report.status}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Deleted Accounts */}
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px' 
        }}>
          <h2>Recently Deleted Accounts</h2>
          {deletedAccounts.length === 0 ? (
            <p>No deleted accounts</p>
          ) : (
            <ul>
              {deletedAccounts.map(account => (
                <li key={account.id} style={{ marginBottom: '10px' }}>
                  <strong>{account.first_name} {account.last_name}</strong>
                  <br />
                  <small>Email: {account.email}</small>
                  <br />
                  <small>Reason: {account.reason}</small>
                  <br />
                  <small>Deleted: {new Date(account.deleted_at).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

### Step 5: Update App.js Routes

Update `src/App.js` to include the dashboard route:

```javascript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhoCanUse from './components/WhoCanUse';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-element');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div className="hero-wrapper">
                <Header />
                <Hero />
              </div>
              <About />
              <WhoCanUse />
              <Features />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Getting Supabase Credentials

You need to get these from your Android project:

### Option 1: From local.properties

Open `CommUnity/local.properties` and look for:
```
supabase.url=YOUR_URL_HERE
supabase.key=YOUR_KEY_HERE
```

### Option 2: From Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Testing the Web Admin Panel

### Step 1: Create an Official Account

You need an official account to login to the web panel. Run this in Supabase SQL Editor:

```sql
-- First, create an auth user for the official
-- You'll need to do this through the mobile app signup, then update the role

-- Update an existing user to be an official
UPDATE public.users 
SET role = 'official' 
WHERE email = 'your-email@gmail.com';
```

Or create a new official account:

1. Sign up through mobile app
2. Verify email
3. Run SQL to update role:
   ```sql
   UPDATE public.users 
   SET role = 'official' 
   WHERE email = 'official@gmail.com';
   ```

### Step 2: Login to Web Panel

1. Open `http://localhost:3000/login`
2. Enter official email and password
3. Click LOGIN
4. You should be redirected to `/dashboard`

### Step 3: View Deleted Accounts

The dashboard will show:
- Recent reports from residents
- Recently deleted accounts with reasons
- Days since deletion

## Troubleshooting

### Issue: "Module not found: Can't resolve '@supabase/supabase-js'"

**Solution**: Install Supabase client:
```bash
npm install @supabase/supabase-js
```

### Issue: "Access denied. This portal is for officials only."

**Solution**: Update user role in Supabase:
```sql
UPDATE public.users 
SET role = 'official' 
WHERE email = 'your-email@gmail.com';
```

### Issue: Can't see deleted_accounts_view

**Solution**: Make sure you ran the `supabase_delete_account_fix.sql` script that creates the view.

### Issue: CORS errors when calling Supabase

**Solution**: Supabase should allow requests from localhost by default. If you have issues:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add `http://localhost:3000` to allowed URLs

## Next Steps

1. **Install dependencies**: `npm install` in frontend folder
2. **Add Supabase client**: `npm install @supabase/supabase-js`
3. **Create supabaseClient.js**: Add your Supabase credentials
4. **Update Login.js**: Add authentication logic
5. **Create Dashboard.js**: Add dashboard page
6. **Update App.js**: Add dashboard route
7. **Create official account**: Update a user's role to 'official'
8. **Test**: Login and view dashboard

## Future Enhancements

- Add more dashboard pages (Reports, Users, Analytics)
- Add report management (approve, reject, update status)
- Add user management (view all users, update roles)
- Add charts and statistics
- Add real-time updates using Supabase subscriptions
- Add export functionality for reports and deleted accounts
