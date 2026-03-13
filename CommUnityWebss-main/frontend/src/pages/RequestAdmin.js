import React, { useState } from 'react';
import '../styles/request_admin.css';

function RequestAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [requests, setRequests] = useState([]);

  const stats = {
    total: 0,
    reviewing: 0,
    processing: 0,
    ready: 0,
    released: 0
  };

  return (
    <div className="app">
      <main className="main">
        {/* STATS */}
        <section className="stats">
          <div className="card stat">
            <span>Total Requests</span>
            <strong id="totalRequests">{stats.total}</strong>
          </div>

          <div className="card stat">
            <span>Reviewing</span>
            <strong id="reviewingCount">{stats.reviewing}</strong>
          </div>

          <div className="card stat">
            <span>Processing</span>
            <strong id="processingCount">{stats.processing}</strong>
          </div>

          <div className="card stat">
            <span>Ready for Pickup</span>
            <strong id="readyCount">{stats.ready}</strong>
          </div>

          <div className="card stat">
            <span>Released</span>
            <strong id="releasedCount">{stats.released}</strong>
          </div>
        </section>

        {/* TABLE */}
        <section className="card">
          <h3 style={{ marginBottom: '20px' }}>Requests List</h3>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              id="filterSearch"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', minWidth: '220px' }}
            />

            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc' }}
            >
              <option value="">All Status</option>
              <option value="reviewing">Reviewing</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="released">Released</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Document</th>
                <th>Resident</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No requests available
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.document}</td>
                    <td>{req.resident}</td>
                    <td>{req.status}</td>
                    <td>{req.date}</td>
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

export default RequestAdmin;
