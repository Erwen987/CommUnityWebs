import React, { useState } from 'react';
import '../styles/analytics.css';

function Analytics() {
  const [totalReports, setTotalReports] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  return (
    <div className="app">
      <main className="main">
        {/* STATS */}
        <section className="stats">
          <div className="card stat">
            <span>Total Reports</span>
            <strong id="totalReports">{totalReports}</strong>
          </div>

          <div className="card stat">
            <span>Total Requests</span>
            <strong id="totalRequests">{totalRequests}</strong>
          </div>

          <div className="card stat">
            <span>Active Users</span>
            <strong>128</strong>
          </div>

          <div className="card stat">
            <span>Resolved Issues</span>
            <strong>52</strong>
          </div>
        </section>

        {/* CONTENT */}
        <div className="content">
          {/* BAR GRAPH */}
          <div className="card chart">
            <h3>Monthly Reports vs Requests</h3>

            <div className="bars" id="barsContainer">
              {/* Chart bars will be rendered here */}
            </div>

            <div className="legend">
              <span><i className="req"></i> Requests</span>
              <span><i className="rep"></i> Reports</span>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* PIE CHART */}
            <div className="card contributors">
              <h3>Request Status Distribution</h3>

              <svg width="200" height="200" viewBox="0 0 36 36" style={{ margin: 'auto', display: 'block' }}>
                {/* base */}
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="4"></circle>

                {/* Status distribution circles would go here */}
              </svg>

              <div className="legend">
                <span><i className="reviewing"></i> Reviewing</span>
                <span><i className="processing"></i> Processing</span>
                <span><i className="ready"></i> Ready</span>
                <span><i className="released"></i> Released</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;
