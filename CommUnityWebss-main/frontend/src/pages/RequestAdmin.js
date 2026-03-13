import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/request_admin.css';

const MOCK_REQUESTS = [
  { id:'REQ-001', document:'Barangay Clearance', resident:'Juan Dela Cruz', payment:'Paid', status:'reviewing', date:'2025-01-10', purpose:'Employment', address:'Purok 1' },
  { id:'REQ-002', document:'Certificate of Residency', resident:'Maria Santos', payment:'Unpaid', status:'processing', date:'2025-01-11', purpose:'School Enrollment', address:'Sitio Mabini' },
  { id:'REQ-003', document:'Business Permit', resident:'Pedro Reyes', payment:'Paid', status:'ready', date:'2025-01-08', purpose:'Business Operation', address:'Purok 3' },
  { id:'REQ-004', document:'Indigency Certificate', resident:'Ana Lopez', payment:'Paid', status:'released', date:'2025-01-07', purpose:'Medical Assistance', address:'Purok 2' },
];

const STATUS_STYLE = {
  reviewing: { background:'#f1f5f9', color:'#64748b' },
  processing: { background:'#fef3c7', color:'#b45309' },
  ready: { background:'#dbeafe', color:'#1d4ed8' },
  released: { background:'#dcfce7', color:'#15803d' },
};

const thStyle = { padding:'12px', textAlign:'left', color:'#1f5fbf', borderBottom:'2px solid #e2e8f0', fontSize:'13px' };
const tdStyle = { padding:'12px', borderBottom:'1px solid #f1f5f9', fontSize:'13px' };

function RequestAdmin() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const stats = {
    total: requests.length,
    reviewing: requests.filter(r => r.status === 'reviewing').length,
    processing: requests.filter(r => r.status === 'processing').length,
    ready: requests.filter(r => r.status === 'ready').length,
    released: requests.filter(r => r.status === 'released').length,
  };

  const filtered = requests.filter(r => {
    const matchSearch = r.document.toLowerCase().includes(searchTerm.toLowerCase()) || r.resident.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === '' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="app">
      <AdminSidebar />
      <main className="main">
        <Topbar title="Requests" description="Manage document requests from barangay residents." />

        <section className="stats">
          <div className="card stat"><span>Total Requests</span><strong>{stats.total}</strong></div>
          <div className="card stat"><span>Reviewing</span><strong>{stats.reviewing}</strong></div>
          <div className="card stat"><span>Processing</span><strong>{stats.processing}</strong></div>
          <div className="card stat"><span>Ready for Pickup</span><strong>{stats.ready}</strong></div>
          <div className="card stat"><span>Released</span><strong>{stats.released}</strong></div>
        </section>

        <section className="card" style={{ marginTop:'20px', padding:'24px' }}>
          <h3 style={{ marginBottom:'20px' }}>Requests List</h3>

          <div style={{ display:'flex', gap:'10px', marginBottom:'20px', flexWrap:'wrap' }}>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ flex:1, minWidth:'200px', padding:'9px 14px', borderRadius:'8px', border:'1px solid #d0d7e3', fontSize:'13px' }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding:'9px 14px', borderRadius:'8px', border:'1px solid #d0d7e3', fontSize:'13px', background:'#fff' }}
            >
              <option value="">All Status</option>
              <option value="reviewing">Reviewing</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="released">Released</option>
            </select>
          </div>

          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Request ID</th>
                <th style={thStyle}>Document</th>
                <th style={thStyle}>Resident</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" style={{ ...tdStyle, textAlign:'center', color:'#6b7a90' }}>No requests found</td></tr>
              ) : (
                filtered.map(req => (
                  <tr key={req.id}>
                    <td style={tdStyle}><strong style={{ color:'#1f5fbf' }}>{req.id}</strong></td>
                    <td style={tdStyle}>{req.document}</td>
                    <td style={tdStyle}>{req.resident}</td>
                    <td style={tdStyle}>
                      <span style={{ background: req.payment === 'Paid' ? '#dcfce7' : '#fee2e2', color: req.payment === 'Paid' ? '#15803d' : '#dc2626', padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:500 }}>
                        {req.payment}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <select
                        value={req.status}
                        onChange={e => updateStatus(req.id, e.target.value)}
                        style={{ ...STATUS_STYLE[req.status], border:'none', borderRadius:'12px', padding:'4px 10px', fontSize:'12px', fontWeight:500, cursor:'pointer' }}
                      >
                        <option value="reviewing">Reviewing</option>
                        <option value="processing">Processing</option>
                        <option value="ready">Ready for Pickup</option>
                        <option value="released">Released</option>
                      </select>
                    </td>
                    <td style={tdStyle}>{req.date}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => setSelected(req)}
                        style={{ background:'#2d66ca', color:'#fff', border:'none', padding:'6px 12px', borderRadius:'6px', fontSize:'12px', cursor:'pointer' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {selected && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}
            onClick={() => setSelected(null)}>
            <div style={{ background:'#fff', borderRadius:'16px', padding:'32px', width:'420px', boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}
              onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom:'20px', color:'#1f2937' }}>Request Details</h3>
              {[['Request ID', selected.id], ['Document', selected.document], ['Resident', selected.resident], ['Address', selected.address], ['Purpose', selected.purpose], ['Payment', selected.payment], ['Status', selected.status.charAt(0).toUpperCase() + selected.status.slice(1)], ['Date', selected.date]].map(([label, val]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:'13px' }}>
                  <span style={{ color:'#6b7a90' }}>{label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
              <button onClick={() => setSelected(null)} style={{ marginTop:'20px', width:'100%', padding:'10px', background:'#2d66ca', color:'#fff', border:'none', borderRadius:'8px', fontSize:'14px', cursor:'pointer' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RequestAdmin;
