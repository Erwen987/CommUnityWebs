import React, { useState } from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/request.css';

const MOCK_REQUESTS = [
  { requestId:'REQ-001-2026', document:'Barangay Clearance', resident:'Juan Dela Cruz', status:'reviewing', paymentMethod:'gcash', dateSubmitted:'2026-01-05', purpose:'Job Application', contact:'09123456789' },
  { requestId:'REQ-002-2026', document:'Certificate of Residency', resident:'Maria Santos', status:'processing', paymentMethod:'onsite', dateSubmitted:'2026-01-08', purpose:'School Requirement', contact:'09181234567' },
  { requestId:'REQ-003-2026', document:'Indigency Certificate', resident:'Pedro Reyes', status:'ready', paymentMethod:'gcash', dateSubmitted:'2026-01-10', purpose:'Medical Assistance', contact:'09221234567' },
];

const STATUS_COLORS = { reviewing:'#94a3b8', processing:'#f59e0b', ready:'#ef4444', released:'#16a34a' };

function Request() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState(null);

  const stats = {
    total: requests.length,
    reviewing: requests.filter(r => r.status === 'reviewing').length,
    processing: requests.filter(r => r.status === 'processing').length,
    ready: requests.filter(r => r.status === 'ready').length,
    released: requests.filter(r => r.status === 'released').length,
  };

  const filtered = requests.filter(r => {
    const matchSearch = r.resident.toLowerCase().includes(searchTerm.toLowerCase()) || r.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (requestId, newStatus) => {
    setRequests(prev => prev.map(r => r.requestId === requestId ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar title="Requests" description="Monitor and manage barangay document requests." />

        <section className="stats" style={{ gridTemplateColumns:'repeat(5,1fr)' }}>
          <div className="card stat"><span>Total Requests</span><strong>{stats.total}</strong></div>
          <div className="card stat"><span>Reviewing</span><strong>{stats.reviewing}</strong></div>
          <div className="card stat"><span>Processing</span><strong>{stats.processing}</strong></div>
          <div className="card stat"><span>Ready for Pickup</span><strong>{stats.ready}</strong></div>
          <div className="card stat"><span>Released</span><strong>{stats.released}</strong></div>
        </section>

        <section className="card" style={{ marginTop:'20px' }}>
          <h3 style={{ marginBottom:'20px' }}>Requests List</h3>
          <div style={{ display:'flex', gap:'10px', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap' }}>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ padding:'8px 12px', borderRadius:'8px', border:'1px solid #ccc', minWidth:'220px', fontSize:'13px' }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding:'8px 12px', borderRadius:'8px', border:'1px solid #ccc', fontSize:'13px' }}
            >
              <option value="">All Status</option>
              <option value="reviewing">Reviewing</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="released">Released</option>
            </select>
          </div>

          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #e2e8f0' }}>
                {['Request ID','Document','Resident','Payment','Status','Date Submitted','Action'].map(h => (
                  <th key={h} style={{ padding:'10px', textAlign:'left', color:'#1f5fbf' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign:'center', padding:'20px', color:'#6b7a90' }}>No requests found.</td></tr>
              ) : (
                filtered.map((r, idx) => (
                  <tr key={r.requestId} style={{ borderBottom:'1px solid #f1f5f9' }}>
                    <td style={{ padding:'10px' }}>{r.requestId}</td>
                    <td style={{ padding:'10px' }}>{r.document}</td>
                    <td style={{ padding:'10px' }}>{r.resident}</td>
                    <td style={{ padding:'10px' }}>
                      <span style={{ background: r.paymentMethod === 'gcash' ? '#dbeafe' : '#f0fdf4', color: r.paymentMethod === 'gcash' ? '#1d4ed8' : '#15803d', padding:'3px 8px', borderRadius:'12px', fontSize:'12px' }}>
                        {r.paymentMethod === 'gcash' ? 'GCash' : 'On-Site'}
                      </span>
                    </td>
                    <td style={{ padding:'10px' }}>
                      <select value={r.status} onChange={e => updateStatus(r.requestId, e.target.value)} style={{ padding:'4px 8px', borderRadius:'6px', border:'1px solid #ccc', fontSize:'12px', background: STATUS_COLORS[r.status] + '22', color: STATUS_COLORS[r.status] }}>
                        <option value="reviewing">Reviewing</option>
                        <option value="processing">Processing</option>
                        <option value="ready">Ready</option>
                        <option value="released">Released</option>
                      </select>
                    </td>
                    <td style={{ padding:'10px' }}>{new Date(r.dateSubmitted).toLocaleDateString()}</td>
                    <td style={{ padding:'10px' }}>
                      <button onClick={() => setModal(r)} style={{ background:'#2d66ca', color:'#fff', border:'none', padding:'6px 14px', borderRadius:'6px', fontSize:'12px', cursor:'pointer' }}>View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* MODAL */}
        {modal && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }}>
            <div style={{ background:'#fff', borderRadius:'14px', padding:'28px', minWidth:'360px', maxWidth:'480px', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                <h3 style={{ fontSize:'16px' }}>Request Details</h3>
                <span onClick={() => setModal(null)} style={{ cursor:'pointer', fontSize:'22px', color:'#6b7a90' }}>×</span>
              </div>
              {[['Request ID', modal.requestId], ['Resident', modal.resident], ['Document', modal.document], ['Status', modal.status], ['Date Submitted', new Date(modal.dateSubmitted).toLocaleDateString()], ['Purpose', modal.purpose], ['Contact', modal.contact], ['Payment', modal.paymentMethod === 'gcash' ? 'GCash' : 'On-Site']].map(([label, value]) => (
                <p key={label} style={{ fontSize:'13px', marginBottom:'8px' }}><strong>{label}:</strong> {value}</p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Request;
