import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ title, description, profileHref = '/profile' }) => {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="top-actions">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 105.293 14.293l4.207 4.207 1.414-1.414-4.207-4.207A8 8 0 0010 2z" />
          </svg>
        </div>
        <div className="notif">
          <svg viewBox="0 0 24 24">
            <path d="M12 2a6 6 0 00-6 6v4.586L4.293 15.293A1 1 0 005 17h14a1 1 0 00.707-1.707L18 12.586V8a6 6 0 00-6-6z" />
          </svg>
        </div>
        <Link to={profileHref} className="profile-circle">
          <img src={`${process.env.PUBLIC_URL}/images/barangay-profile.png`} alt="Profile" onError={e => { e.target.style.display='none'; }} />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
