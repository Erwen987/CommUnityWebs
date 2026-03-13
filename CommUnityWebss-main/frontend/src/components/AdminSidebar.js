import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={`${process.env.PUBLIC_URL}/images/CommUnity Logo.png`} className="brand-logo" alt="CommUnity" />
        <span>CommUnity</span>
      </div>

      <nav className="menu">
        <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/home.png`} className="menu-icon" alt="" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/user-management" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/users.png`} className="menu-icon" alt="" />
          <span>User Management</span>
        </NavLink>
        <NavLink to="/report-admin" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/reports.png`} className="menu-icon" alt="" />
          <span>Reports</span>
        </NavLink>
        <NavLink to="/request-admin" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/requests.png`} className="menu-icon" alt="" />
          <span>Requests</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/analytics.png`} className="menu-icon" alt="" />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/reward" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/reward.png`} className="menu-icon" alt="" />
          <span>Reward</span>
        </NavLink>
      </nav>

      <div className="logout">
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/settings.png`} className="menu-icon" alt="" />
          <span>Settings</span>
        </NavLink>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
