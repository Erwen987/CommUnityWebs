import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/admin_dashboard.css';

function AdminDashboard() {
  const [stats] = useState({ reports: 0, requests: 0, users: 0, activeUsers: 0 });
  const [contributors] = useState([]);
  const [activities] = useState([]);

  return (
    <div className="app">
      <AdminSidebar />
      <main className="main">
        <Topbar
          title="Welcome Admin 👋"
          description="Here's a quick overview of your barangay"
          profileHref="/profile"
        />

        {/* STATS */}
        <section className="stats">
          <div className="card stat">
            <span>Reports</span>
            <strong>{stats.reports}</strong>
          </div>
          <div className="card stat">
            <span>Requests</span>
            <strong>{stats.requests}</strong>
          </div>
          <div className="card stat">
            <span>Users</span>
            <strong>{stats.users}</strong>
          </div>
          <div className="card stat">
            <span>Active Users</span>
            <strong>{stats.activeUsers}</strong>
          </div>
        </section>

        {/* CONTENT */}
        <section className="content">
          <div className="card chart">
            <h3>Reports and Requests per Month</h3>
            <div className="empty-state">
              No records yet.<br />
              <small>Graph will appear once data is available.</small>
            </div>
            <div className="legend">
              <span><i className="req"></i> Requests</span>
              <span><i className="rep"></i> Reports</span>
            </div>
          </div>

          <div className="right-column">
            <div className="card contributors">
              <h3>Top Contributors</h3>
              <ul>
                {contributors.length === 0 ? (
                  <li className="empty">No contributors yet</li>
                ) : (
                  contributors.map((c, i) => (
                    <li key={i}><span>{c.name}</span><strong>{c.points} pts</strong></li>
                  ))
                )}
              </ul>
            </div>
            <div className="card activities">
              <h3>Recent Activities</h3>
              <ul>
                {activities.length === 0 ? (
                  <li className="empty">No recent activities</li>
                ) : (
                  activities.map((a, i) => <li key={i}>{a}</li>)
                )}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
