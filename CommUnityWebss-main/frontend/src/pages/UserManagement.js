import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/user_management.css';

const MOCK_NEW = [
  { id:1, name:'Maria Santos', email:'maria@email.com', status:'pending' },
  { id:2, name:'Carlos Rivera', email:'carlos@email.com', status:'pending' },
  { id:3, name:'Angela Bautista', email:'angela@email.com', status:'pending' },
  { id:4, name:'Jose Mendoza', email:'jose@email.com', status:'pending' },
];

const MOCK_EXISTING = [
  { id:5, name:'Juan Dela Cruz', email:'juan@email.com', status:'active' },
  { id:6, name:'Rosa Reyes', email:'rosa@email.com', status:'active' },
  { id:7, name:'Marco Santos', email:'marco@email.com', status:'blocked' },
];

const statusStyle = { active:{ background:'#dcfce7', color:'#15803d' }, pending:{ background:'#fef3c7', color:'#b45309' }, blocked:{ background:'#fee2e2', color:'#dc2626' } };

function UserManagement() {
  const [newUsers, setNewUsers] = useState(MOCK_NEW);
  const [existingUsers] = useState(MOCK_EXISTING);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    all: newUsers.length + existingUsers.length,
    active: existingUsers.filter(u => u.status === 'active').length,
    pending: newUsers.filter(u => u.status === 'pending').length,
    blocked: existingUsers.filter(u => u.status === 'blocked').length,
  };

  const approveUser = (id) => setNewUsers(prev => prev.filter(u => u.id !== id));
  const rejectUser = (id) => setNewUsers(prev => prev.filter(u => u.id !== id));

  const filteredNew = newUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredExisting = existingUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const thStyle = { padding:'12px', textAlign:'left', color:'#1f5fbf', borderBottom:'2px solid #e2e8f0', fontSize:'13px' };
  const tdStyle = { padding:'12px', borderBottom:'1px solid #f1f5f9', fontSize:'13px' };

  return (
    <div className="app">
      <AdminSidebar />
      <main className="main">
        <Topbar title="User Management" description="Approve and manage barangay residents" />

        <section className="stats">
          <div className="card stat"><span>All Users</span><strong>{stats.all}</strong></div>
          <div className="card stat"><span>Active Users</span><strong>{stats.active}</strong></div>
          <div className="card stat"><span>Pending Registrations</span><strong>{stats.pending}</strong></div>
          <div className="card stat"><span>Blocked Users</span><strong>{stats.blocked}</strong></div>
        </section>

        <section className="card" style={{ marginTop:'20px', padding:'24px' }}>
          <input
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width:'100%', padding:'10px 14px', borderRadius:'8px', border:'1px solid #d0d7e3', fontSize:'13px', marginBottom:'24px' }}
          />

          <h3 style={{ marginBottom:'14px' }}>New Registrations</h3>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNew.length === 0 ? (
                <tr><td colSpan="3" style={{ ...tdStyle, textAlign:'center', color:'#6b7a90' }}>No new registrations</td></tr>
              ) : (
                filteredNew.map(user => (
                  <tr key={user.id}>
                    <td style={tdStyle}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2d66ca', flexShrink:0 }} />
                        <div>
                          <strong style={{ display:'block', fontSize:'13px' }}>{user.name}</strong>
                          <span style={{ fontSize:'12px', color:'#6b7a90' }}>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ ...statusStyle[user.status], padding:'4px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:500 }}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => approveUser(user.id)} style={{ background:'#16a34a', color:'#fff', border:'none', padding:'6px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer', marginRight:'6px' }}>Approve</button>
                      <button onClick={() => rejectUser(user.id)} style={{ background:'#dc2626', color:'#fff', border:'none', padding:'6px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer' }}>Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <h3 style={{ marginTop:'28px', marginBottom:'14px' }}>Existing Users</h3>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExisting.length === 0 ? (
                <tr><td colSpan="3" style={{ ...tdStyle, textAlign:'center', color:'#6b7a90' }}>No users found</td></tr>
              ) : (
                filteredExisting.map(user => (
                  <tr key={user.id}>
                    <td style={tdStyle}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2d66ca', flexShrink:0 }} />
                        <div>
                          <strong style={{ display:'block', fontSize:'13px' }}>{user.name}</strong>
                          <span style={{ fontSize:'12px', color:'#6b7a90' }}>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ ...statusStyle[user.status], padding:'4px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:500 }}>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                    </td>
                    <td style={tdStyle}>
                      <button style={{ background:'#2d66ca', color:'#fff', border:'none', padding:'6px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer', marginRight:'6px' }}>⋯</button>
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
