import React, { useState } from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/dashboard.css';

function Dashboard() {
  const [announcement, setAnnouncement] = useState('');
  const [leaderboard] = useState([]);
  const [stats] = useState({ reports: 0, requests: 0 });

  const handlePublishAnnouncement = () => {
    if (announcement.trim()) {
      alert('Announcement published!');
      setAnnouncement('');
    } else {
      alert('Announcement cannot be empty');
    }
  };

  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar
          title="Hello, Barangay Officials 👋"
          description="Here's what's happening in your barangay today."
        />

        <section className="grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* ANNOUNCEMENT */}
            <div className="card announcement">
              <h3>Barangay Announcement</h3>
              <div className="announcement-box">
                <textarea
                  placeholder="Write an announcement for barangay residents..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
                <label className="attach">
                  📎
                  <input type="file" accept="image/*" hidden />
                </label>
              </div>
              <button onClick={handlePublishAnnouncement}>Publish Announcement</button>
            </div>

            {/* GRAPH */}
            <div className="card chart">
              <h3>Monthly Reports and Requests</h3>
              <div className="empty-state">No available records yet.</div>
              <div className="legend">
                <span><i className="req"></i>Requests</span>
                <span><i className="rep"></i>Reports</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <div className="stats">
              <div className="card stat">
                <span>Total Reports</span>
                <strong>{stats.reports}</strong>
              </div>
              <div className="card stat">
                <span>Total Requests</span>
                <strong>{stats.requests}</strong>
              </div>
            </div>

            <div className="card leaderboard">
              <h3>Top Community Contributors</h3>
              <ul>
                {leaderboard.length === 0 ? (
                  <li className="empty">No contributor records yet.</li>
                ) : (
                  leaderboard.map((u, i) => (
                    <li key={i}><span>{i + 1}</span>{u.name}<b>{u.points}</b></li>
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

export default Dashboard;
