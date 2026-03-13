import React, { useState } from 'react';
import '../styles/user_management.css';

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newUsers, setNewUsers] = useState([]);
  const [existingUsers, setExistingUsers] = useState([]);

  const stats = {
    all: 0,
    active: 0,
    pending: 0,
    blocked: 0
  };

  return (
    <div className="layout">
      <main className="content">
        {/* STATS */}
        <section className="stats">
          <div className="card">
            <span>All Users</span>
            <strong id="allCount">{stats.all}</strong>
          </div>

          <div className="card">
            <span>Active Users</span>
            <strong id="activeCount">{stats.active}</strong>
          </div>

          <div className="card">
            <span>Pending Registrations</span>
            <strong id="pendingCount">{stats.pending}</strong>
          </div>

          <div className="card">
            <span>Blocked Users</span>
            <strong id="blockedCount">{stats.blocked}</strong>
          </div>
        </section>

        {/* TABLE SECTION */}
        <section className="table-card">
          <input
            className="table-search"
            id="tableSearch"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* NEW SIGN UPS */}
          <h3 style={{ marginTop: '20px' }}>New Registrations</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody id="newUsersTable">
              {newUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    No new registrations
                  </td>
                </tr>
              ) : (
                newUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.status}</td>
                    <td>
                      <button>Approve</button>
                      <button>Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* EXISTING USERS */}
          <h3 style={{ marginTop: '30px' }}>Existing Users</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody id="existingUsersTable">
              {existingUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    No users
                  </td>
                </tr>
              ) : (
                existingUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.status}</td>
                    <td>
                      <button>Edit</button>
                      <button>Block</button>
                    </td>
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

export default UserManagement;
