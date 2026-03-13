# React Conversion Quick Start Guide

## 🎯 What Was Done

All 21 HTML pages from the CommUnity project have been converted to React.js components with:
- ✅ Complete routing (30+ routes)
- ✅ State management with React hooks
- ✅ Form handling with controlled components
- ✅ Responsive CSS styling
- ✅ React Router v6 integration

---

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd frontend
npm install  # Only needed first time
npm start
```

The app will open at `http://localhost:3000`

---

## 🗺️ All Available Routes

### Authentication
- `/login` - User login page
- `/signup` - Create new account
- `/forgot-password` - Password recovery
- `/reset-code` - OTP code entry
- `/change-password` - Set new password

### User Pages
- `/` - Home/landing page
- `/dashboard` - User dashboard
- `/profile` - Barangay profile
- `/request` or `/requests` - Request list
- `/reports` - Reports list
- `/reward` or `/rewards` - Rewards page
- `/analytics` or `/analytic` - Analytics dashboard
- `/settings` - System settings

### Admin Pages
- `/admin` or `/admin-dashboard` - Admin dashboard
- `/request-admin` or `/admin/requests` - Requests management
- `/report-admin` or `/admin/reports` - Reports management
- `/user-management` or `/admin/users` - User management

---

## 📂 File Structure

### Created Components
```
src/pages/
├── Authentication
│   ├── Login.js
│   ├── Signup.js
│   ├── ForgotPassword.js
│   ├── ResetCode.js
│   └── ChangePassword.js
├── User Pages
│   ├── Dashboard.js
│   ├── Profile.js
│   ├── Request.js
│   ├── Reports.js
│   ├── Rewards.js
│   └── Analytics.js
└── Admin Pages
    ├── AdminDashboard.js
    ├── RequestAdmin.js
    ├── ReportAdmin.js
    └── UserManagement.js
```

### Created Styles
```
src/styles/
├── signup.css
├── forgot_password.css
├── reset_code.css
├── change_password.css
├── dashboard.css
├── rewards.css
├── request.css
├── reports.css
├── analytics.css
├── settings.css
├── profile.css
├── admin_dashboard.css
├── request_admin.css
├── report_admin.css
└── user_management.css
```

---

## 💡 Component Template

Every page component follows this structure:

```javascript
import React, { useState } from 'react';
import '../styles/[pageName].css';

function PageName() {
  const [data, setData] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here
  };

  return (
    <div className="app">
      <main className="main">
        {/* Component JSX */}
      </main>
    </div>
  );
}

export default PageName;
```

---

## 🔗 Navigation

Use React Router `Link` component for navigation:

```javascript
import { Link } from 'react-router-dom';

// In JSX:
<Link to="/dashboard">Go to Dashboard</Link>
```

---

## 🎨 Styling

### Color Palette
- Primary Blue: `#667eea`
- Secondary Purple: `#764ba2`
- Light Gray: `#f5f5f5`
- Border Color: `#ddd`
- Text Dark: `#333`
- Text Light: `#666`

### Common Classes
- `.app` - Container wrapper
- `.main` - Main content area
- `.card` - Card/section container
- `.stats` - Statistics grid
- `.table` - Table styling
- `.btn-primary` - Primary button

---

## 📋 Common Tasks

### Add a New Page

1. Create component in `src/pages/NewPage.js`:
```javascript
import React, { useState } from 'react';
import '../styles/new_page.css';

function NewPage() {
  return <div className="app">...</div>;
}

export default NewPage;
```

2. Create stylesheet in `src/styles/new_page.css`

3. Add route in `src/App.js`:
```javascript
import NewPage from './pages/NewPage';

// In <Routes>:
<Route path="/new-page" element={<NewPage />} />
```

### Add Form Input

```javascript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// In JSX:
<input
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter email"
/>
```

### Add API Call

```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []); // Empty dependency array = runs once on mount
```

---

## 🔄 Form Submission Pattern

```javascript
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page reload
  
  // Validate data
  if (!formData.email) {
    alert('Email is required');
    return;
  }
  
  // Send API request
  console.log('Form submitted:', formData);
  
  // Reset form (optional)
  setFormData({ email: '', password: '' });
};
```

---

## 🐛 Common Issues & Solutions

### Issue: Styles not loading
**Solution:** Check CSS import path matches file location
```javascript
// Correct:
import '../styles/page_name.css';

// Wrong:
import './styles/page_name.css';
```

### Issue: Navigation not working
**Solution:** Use `Link` from react-router-dom, not `<a>` tags
```javascript
// Correct:
import { Link } from 'react-router-dom';
<Link to="/page">Go</Link>

// Wrong:
<a href="/page">Go</a>
```

### Issue: Data not updating
**Solution:** Make sure to call setState, not mutate directly
```javascript
// Correct:
setData([...data, newItem]);

// Wrong:
data.push(newItem);
```

---

## 📦 Useful Packages to Add

```bash
# HTTP client
npm install axios

# State management
npm install zustand

# Form handling
npm install react-hook-form

# Charts
npm install chart.js react-chartjs-2

# Maps
npm install leaflet react-leaflet

# Notifications
npm install react-toastify

# Loading spinner
npm install react-spinners
```

---

## 🧪 Testing Routes

Open these URLs in your browser to test:
1. `http://localhost:3000/` - Homepage
2. `http://localhost:3000/login` - Login
3. `http://localhost:3000/signup` - Signup
4. `http://localhost:3000/dashboard` - Dashboard
5. `http://localhost:3000/admin` - Admin panel

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [React Hooks](https://react.dev/reference/react)

---

## ✅ Checklist for Backend Integration

- [ ] Add API base URL to `.env` file
- [ ] Create API client/service layer
- [ ] Add authentication context
- [ ] Implement token handling
- [ ] Add error handling/logging
- [ ] Add loading states
- [ ] Add form validation

---

**Ready to build? Start with:** `npm start`
