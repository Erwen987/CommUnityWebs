import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Sidebar.css';

const OfficialSidebar = () => {
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
        <a href="/dashboard" className={isActive('/dashboard')}>
          <img src="/icons/home.png" alt="Home" className="menu-icon" />
          <span>Home</span>
        </a>

        <a href="/dashboard/reports" className={isActive('/dashboard/reports')}>
          <img src="/icons/reports.png" alt="Reports" className="menu-icon" />
          <span>Reports</span>
        </a>

        <a href="/dashboard/requests" className={isActive('/dashboard/requests')}>
          <img src="/icons/requests.png" alt="Requests" className="menu-icon" />
          <span>Requests</span>
        </a>

        <a href="/dashboard/analytics" className={isActive('/dashboard/analytics')}>
          <img src="/icons/analytics.png" alt="Analytics" className="menu-icon" />
          <span>Analytics</span>
        </a>

        <a href="/dashboard/rewards" className={isActive('/dashboard/rewards')}>
          <img src="/icons/reward.png" alt="Reward" className="menu-icon" />
          <span>Reward</span>
        </a>
      </nav>

      <div className="logout">
        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
          Log Out
        </a>
      </div>
    </aside>
  );
};

export default OfficialSidebar;
