import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Sidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/images/CommUnity Logo.png" alt="CommUnity Logo" className="brand-logo" />
        <span>CommUnity</span>
      </div>

      <nav className="menu">
        <a href="/admin/dashboard" className={isActive('/admin/dashboard')}>
          <img src="/icons/home.png" alt="Home" className="menu-icon" />
          <span>Home</span>
        </a>

        <a href="/admin/users" className={isActive('/admin/users')}>
          <img src="/icons/users.png" alt="User Management" className="menu-icon" />
          <span>User Management</span>
        </a>

        <a href="/admin/reports" className={isActive('/admin/reports')}>
          <img src="/icons/reports.png" alt="Reports" className="menu-icon" />
          <span>Reports</span>
        </a>

        <a href="/admin/requests" className={isActive('/admin/requests')}>
          <img src="/icons/requests.png" alt="Requests" className="menu-icon" />
          <span>Requests</span>
        </a>

        <a href="/admin/analytics" className={isActive('/admin/analytics')}>
          <img src="/icons/analytics.png" alt="Analytics" className="menu-icon" />
          <span>Analytics</span>
        </a>

        <a href="/admin/rewards" className={isActive('/admin/rewards')}>
          <img src="/icons/reward.png" alt="Reward" className="menu-icon" />
          <span>Reward</span>
        </a>
      </nav>

      <div className="logout">
        <a href="/admin/settings" className={isActive('/admin/settings')} style={{ marginBottom: '8px' }}>
          <img src="/icons/settings.png" alt="Settings" className="menu-icon" />
          <span>Settings</span>
        </a>

        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
          Log Out
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
