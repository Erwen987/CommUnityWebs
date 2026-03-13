import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/sidebar.css';

const OfficialSidebar = () => {
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
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/home.png`} className="menu-icon" alt="" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/reports.png`} className="menu-icon" alt="" />
          <span>Reports</span>
        </NavLink>
        <NavLink to="/request" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/requests.png`} className="menu-icon" alt="" />
          <span>Requests</span>
        </NavLink>
        <NavLink to="/analytic" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/analytics.png`} className="menu-icon" alt="" />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/rewards" className={({ isActive }) => isActive ? 'active' : ''}>
          <img src={`${process.env.PUBLIC_URL}/icons/reward.png`} className="menu-icon" alt="" />
          <span>Reward</span>
        </NavLink>
      </nav>

      <div className="logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </aside>
  );
};

export default OfficialSidebar;
