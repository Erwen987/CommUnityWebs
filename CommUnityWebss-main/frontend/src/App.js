import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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

// Redirects to /login if not authenticated; optionally restricts to admins only
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, profile, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  if (!user || !profile) return <Navigate to="/login" replace />;
  if (adminOnly && profile.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

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
    <AuthProvider>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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

          {/* Redirect /index.html to / */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-code" element={<ResetCode />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* USER PAGES (officials + admins) */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/request" element={<ProtectedRoute><Request /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Request /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/reward" element={<ProtectedRoute><Reward /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
          <Route path="/analytic" element={<ProtectedRoute><Analytic /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* ADMIN PAGES (admins only) */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/request-admin" element={<ProtectedRoute adminOnly><RequestAdmin /></ProtectedRoute>} />
          <Route path="/admin/requests" element={<ProtectedRoute adminOnly><RequestAdmin /></ProtectedRoute>} />
          <Route path="/report-admin" element={<ProtectedRoute adminOnly><ReportAdmin /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute adminOnly><ReportAdmin /></ProtectedRoute>} />
          <Route path="/user-management" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;