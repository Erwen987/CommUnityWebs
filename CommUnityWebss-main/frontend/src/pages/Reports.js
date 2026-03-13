import React, { useState } from 'react';
import '../styles/reports.css';

function Reports() {
  const [reports, setReports] = useState([]);
  const [officerList, setOfficerList] = useState([]);

  const stats = {
    total: 0,
    reviewed: 0,
    assigned: 0,
    progress: 0,
    fixed: 0
  };

  return (
    <div className="app">
      <main className="main">
        {/* STATS */}
        <section className="stats">
          <div className="card stat">
            <span>Total Reports</span>
            <strong id="totalReports">{stats.total}</strong>
          </div>
          <div className="card stat">
            <span>Reviewed</span>
            <strong id="reviewedReports">{stats.reviewed}</strong>
          </div>
          <div className="card stat">
            <span>Assigned</span>
            <strong id="assignedReports">{stats.assigned}</strong>
          </div>
          <div className="card stat">
            <span>In Progress</span>
            <strong id="progressReports">{stats.progress}</strong>
          </div>
          <div className="card stat">
            <span>Fixed</span>
            <strong id="fixedReports">{stats.fixed}</strong>
          </div>
        </section>

        {/* MAP */}
        <section className="card" style={{ padding: '20px', marginTop: '20px' }}>
          <div id="map" style={{ height: '300px', borderRadius: '12px', backgroundColor: '#f0f0f0' }}>
            Map will load here
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="card" style={{ padding: '20px', marginTop: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Reports Overview</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <canvas id="statusChart"></canvas>
            </div>

            <div>
              <h4 className="officer-title">Officer Assignments</h4>
              <ul id="officerList" className="officer-list">
                {officerList.length === 0 ? (
                  <li>No officers assigned</li>
                ) : (
                  officerList.map((officer, idx) => (
                    <li key={idx}>{officer.name} - {officer.count} reports</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="card" style={{ marginTop: '30px', padding: '25px' }}>
          <h3 style={{ marginBottom: '20px' }}>Reports List</h3>
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Issue</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No reports available
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.issue}</td>
                    <td>{report.location}</td>
                    <td>{report.status}</td>
                    <td>{report.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Reports;
