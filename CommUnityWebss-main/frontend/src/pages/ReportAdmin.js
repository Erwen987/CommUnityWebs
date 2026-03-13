import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/report_admin.css';

const MOCK_REPORTS = [
  { id:'RPT-001', issue:'Broken Streetlight', location:'Sitio Mabini', reporter:'Juan Dela Cruz', officer:'Officer Reyes', status:'reviewing', date:'2025-01-10' },
  { id:'RPT-002', issue:'Pothole on Road', location:'Purok 3', reporter:'Maria Santos', officer:'Officer Cruz', status:'in-progress', date:'2025-01-11' },
  { id:'RPT-003', issue:'Clogged Drainage', location:'Sitio Bagong Pag-asa', reporter:'Pedro Reyes', officer:'Officer Lim', status:'fixed', date:'2025-01-08' },
  { id:'RPT-004', issue:'Illegal Dumping', location:'Purok 1', reporter:'Ana Lopez', officer:'Unassigned', status:'assigned', date:'2025-01-12' },
];

const STATUS_STYLE = {
  reviewing: { background:'#f1f5f9', color:'#64748b' },
  assigned: { background:'#fef3c7', color:'#b45309' },
  'in-progress': { background:'#dbeafe', color:'#1d4ed8' },
  fixed: { background:'#dcfce7', color:'#15803d' },
};

const thStyle = { padding:'12px', textAlign:'left', color:'#1f5fbf', borderBottom:'2px solid #e2e8f0', fontSize:'13px' };
const tdStyle = { padding:'12px', borderBottom:'1px solid #f1f5f9', fontSize:'13px' };

function ReportAdmin() {
  const [reports, setReports] = useState(MOCK_REPORTS);

  const stats = {
    total: reports.length,
    reviewed: reports.filter(r => r.status === 'reviewing').length,
    assigned: reports.filter(r => r.status === 'assigned').length,
    progress: reports.filter(r => r.status === 'in-progress').length,
    fixed: reports.filter(r => r.status === 'fixed').length,
  };

  const officerAssignments = reports.reduce((acc, r) => {
    if (r.officer !== 'Unassigned') {
      acc[r.officer] = (acc[r.officer] || 0) + 1;
    }
    return acc;
  }, {});

  const updateStatus = (id, newStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="app">
      <AdminSidebar />
      <main className="main">
        <Topbar title="Reports" description="Monitor and manage barangay issue reports." />

        <section className="stats">
          <div className="card stat"><span>Total Reports</span><strong>{stats.total}</strong></div>
          <div className="card stat"><span>Reviewed</span><strong>{stats.reviewed}</strong></div>
          <div className="card stat"><span>Assigned</span><strong>{stats.assigned}</strong></div>
          <div className="card stat"><span>In Progress</span><strong>{stats.progress}</strong></div>
          <div className="card stat"><span>Fixed</span><strong>{stats.fixed}</strong></div>
        </section>

        <section className="card" style={{ padding:'20px', marginTop:'20px' }}>
          <div style={{ height:'300px', borderRadius:'12px', background:'#e8f0fe', display:'flex', alignItems:'center', justifyContent:'center', color:'#1f5fbf', fontWeight:500 }}>
            Map Placeholder
          </div>
        </section>

        <section className="card" style={{ padding:'24px', marginTop:'20px' }}>
          <h3 style={{ marginBottom:'20px' }}>Reports Overview</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            <div>
              <h4 style={{ marginBottom:'12px', fontSize:'14px', color:'#1f5fbf' }}>Status Summary</h4>
              {Object.entries({ Reviewing: stats.reviewed, Assigned: stats.assigned, 'In Progress': stats.progress, Fixed: stats.fixed }).map(([label, count]) => (
                <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:'13px' }}>
                  <span>{label}</span><strong>{count}</strong>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ marginBottom:'12px', fontSize:'14px', color:'#1f5fbf' }}>Officer Assignments</h4>
              {Object.keys(officerAssignments).length === 0 ? (
                <p style={{ color:'#6b7a90', fontSize:'13px' }}>No officers assigned</p>
              ) : (
                Object.entries(officerAssignments).map(([officer, count]) => (
                  <div key={officer} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:'13px' }}>
                    <span>{officer}</span><strong>{count} reports</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="card" style={{ marginTop:'20px', padding:'24px' }}>
          <h3 style={{ marginBottom:'20px' }}>Reports List</h3>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Report ID</th>
                <th style={thStyle}>Issue</th>
                <th style={thStyle}>Reporter</th>
                <th style={thStyle}>Officer</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td style={tdStyle}><strong style={{ color:'#1f5fbf' }}>{r.id}</strong></td>
                  <td style={tdStyle}>{r.issue}</td>
                  <td style={tdStyle}>{r.reporter}</td>
                  <td style={tdStyle}>{r.officer}</td>
                  <td style={tdStyle}>
                    <select
                      value={r.status}
                      onChange={e => updateStatus(r.id, e.target.value)}
                      style={{ ...STATUS_STYLE[r.status], border:'none', borderRadius:'12px', padding:'4px 10px', fontSize:'12px', fontWeight:500, cursor:'pointer' }}
                    >
                      <option value="reviewing">Reviewing</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </td>
                  <td style={tdStyle}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default ReportAdmin;
