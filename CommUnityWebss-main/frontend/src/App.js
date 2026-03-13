import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// Home Page Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhoCanUse from './components/WhoCanUse';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetCode from './pages/ResetCode';
import ChangePassword from './pages/ChangePassword';

// User Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Request from './pages/Request';
import Reports from './pages/Reports';
import Rewards from './pages/Rewards';
import Reward from './pages/Reward';
import Analytics from './pages/Analytics';
import Analytic from './pages/Analytic';
import Settings from './pages/Settings';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import RequestAdmin from './pages/RequestAdmin';
import ReportAdmin from './pages/ReportAdmin';
import UserManagement from './pages/UserManagement';

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
          {/* HOME PAGE */}
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

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-code" element={<ResetCode />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* USER PAGES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/request" element={<Request />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/analytic" element={<Analytic />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* ADMIN PAGES */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/request-admin" element={<RequestAdmin />} />
          <Route path="/admin/requests" element={<RequestAdmin />} />
          <Route path="/report-admin" element={<ReportAdmin />} />
          <Route path="/admin/reports" element={<ReportAdmin />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;