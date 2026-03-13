import React, { useState } from 'react';
import '../styles/admin_dashboard.css';

function AdminDashboard() {
  const [stats] = useState({
    reports: 0,
    requests: 0,
    users: 0,
    activeUsers: 0
  });

  const [contributors, setContributors] = useState([]);

  return (
    <div className="app">
      <main className="main">
        {/* STATS */}
        <section className="stats">
          <div className="card stat">
            <span>Reports</span>
            <strong id="reportsCount">{stats.reports}</strong>
          </div>

          <div className="card stat">
            <span>Requests</span>
            <strong id="requestsCount">{stats.requests}</strong>
          </div>

          <div className="card stat">
            <span>Users</span>
            <strong id="usersCount">{stats.users}</strong>
          </div>

          <div className="card stat">
            <span>Active Users</span>
            <strong id="activeUsersCount">{stats.activeUsers}</strong>
          </div>
        </section>

        {/* CONTENT */}
        <section className="content">
          <div className="card chart">
            <h3>Reports and Requests per Month</h3>

            <div id="graphEmpty" className="empty-state">
              No records yet.<br />
              <small>Graph will appear once data is available.</small>
            </div>

            <div className="bars" id="graphBars" style={{ display: 'none' }}>
              {['Jan', 'Feb'].map((month) => (
                <div className="bar-group" key={month}>
                  <div className="bar requests"></div>
                  <div className="bar reports"></div>
                  <span>{month}</span>
                </div>
              ))}
            </div>

            <div className="legend">
              <span><i className="req"></i> Requests</span>
              <span><i className="rep"></i> Reports</span>
            </div>
          </div>

          <div className="right-column">
            <div className="card contributors">
              <h3>Top Contributors</h3>
              <ul id="contributorsList">
                {contributors.length === 0 ? (
                  <li>No contributors yet</li>
                ) : (
                  contributors.map((contrib, idx) => (
                    <li key={idx}>{contrib.name} - {contrib.points} points</li>
                  ))
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
