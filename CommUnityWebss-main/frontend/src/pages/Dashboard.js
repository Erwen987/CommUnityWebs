import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';

function Dashboard() {
  const [announcement, setAnnouncement] = useState('');
  const [graphData, setGraphData] = useState(null);

  const handlePublishAnnouncement = () => {
    if (announcement.trim()) {
      console.log('Publishing announcement:', announcement);
      setAnnouncement('');
    }
  };

  return (
    <div className="app">
      <main className="main">
        <section className="grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* ANNOUNCEMENT */}
            <div className="card announcement">
              <h3>Barangay Announcement</h3>
              <div className="announcement-box">
                <textarea
                  id="announcementText"
                  placeholder="Write an announcement for barangay residents..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
                <label className="attach">
                  📎
                  <input type="file" accept="image/*" hidden />
                </label>
              </div>
              <button id="publishAnnouncement" onClick={handlePublishAnnouncement}>
                Publish Announcement
              </button>
            </div>

            {/* GRAPH */}
            <div className="card chart">
              <h3>Monthly Reports and Requests</h3>
              <div id="graphEmpty" className="empty-state">
                No available records yet.
              </div>
              <div className="bars" id="graphBars" style={{ display: 'none' }}>
                {['Oct', 'Nov', 'Dec', 'Jan'].map((month) => (
                  <div className="group" key={month}>
                    <div className="bar requests"></div>
                    <div className="bar reports"></div>
                    <span>{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* STATS */}
            <div className="card stat-card">
              <h4>Total Reports</h4>
              <strong>0</strong>
            </div>
            <div className="card stat-card">
              <h4>Pending Requests</h4>
              <strong>0</strong>
            </div>
            <div className="card stat-card">
              <h4>Active Users</h4>
              <strong>0</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
