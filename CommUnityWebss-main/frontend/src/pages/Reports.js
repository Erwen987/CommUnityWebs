import React, { useState } from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/reports.css';

const MOCK_REPORTS = [
  { reportId:'RPT-001-2026', title:'Illegal Dumping', reporter:'Toni Fowler', officer:'Kgw. Daddy Rob', status:'in_progress', dateSubmitted:'January 02, 2026' },
  { reportId:'RPT-002-2026', title:'Broken Street Light', reporter:'Juan Dela Cruz', officer:'Kgw. Maria Santos', status:'reviewed', dateSubmitted:'January 05, 2026' },
];

function Reports() {
  const [reports, setReports] = useState(MOCK_REPORTS);

  const stats = {
    total: reports.length,
    reviewed: reports.filter(r => r.status === 'reviewed').length,
    assigned: reports.filter(r => r.status === 'assigned').length,
    progress: reports.filter(r => r.status === 'in_progress').length,
    fixed: reports.filter(r => r.status === 'fixed').length,
  };

  const updateStatus = (reportId, newStatus) => {
    setReports(prev => prev.map(r => r.reportId === reportId ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar title="Reports" description="View and manage all reports submitted by residents." />

        <section className="stats" style={{ gridTemplateColumns:'repeat(5,1fr)' }}>
          <div className="card stat"><span>Total Reports</span><strong>{stats.total}</strong></div>
          <div className="card stat"><span>Reviewed</span><strong>{stats.reviewed}</strong></div>
          <div className="card stat"><span>Assigned</span><strong>{stats.assigned}</strong></div>
          <div className="card stat"><span>In Progress</span><strong>{stats.progress}</strong></div>
          <div className="card stat"><span>Fixed</span><strong>{stats.fixed}</strong></div>
        </section>

        <section className="card" style={{ padding:'20px', marginTop:'20px' }}>
          <div style={{ height:'300px', borderRadius:'12px', background:'#c8d9e8', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7a90', fontSize:'14px' }}>
            Map View — connect Supabase to render pins
          </div>
        </section>

        <section className="card" style={{ padding:'20px', marginTop:'20px' }}>
          <h3 style={{ marginBottom:'20px' }}>Reports Overview</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            <div>
              <h4 style={{ marginBottom:'10px', fontSize:'14px' }}>Status Summary</h4>
              {[['reviewed','Reviewed'],['assigned','Assigned'],['in_progress','In Progress'],['fixed','Fixed']].map(([key, label]) => (
                <div key={key} style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px' }}>
                  <span>{label}</span><strong style={{ color:'#1f5fbf' }}>{reports.filter(r => r.status === key).length}</strong>
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ marginBottom:'10px', fontSize:'14px' }}>Officer Assignments</h4>
              {[...new Set(reports.map(r => r.officer))].map((officer, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px' }}>
                  <span>{officer}</span><span>{reports.filter(r => r.officer === officer).length} Reports</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card" style={{ marginTop:'30px', padding:'25px' }}>
          <h3 style={{ marginBottom:'20px' }}>Reports List</h3>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #e2e8f0' }}>
                {['Report ID','Title','Reporter','Officer Assigned','Status','Date Submitted'].map(h => (
                  <th key={h} style={{ padding:'10px', textAlign:'left', color:'#1f5fbf' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.reportId} style={{ borderBottom:'1px solid #f1f5f9' }}>
                  <td style={{ padding:'10px' }}>{r.reportId}</td>
                  <td style={{ padding:'10px' }}>{r.title}</td>
                  <td style={{ padding:'10px' }}>{r.reporter}</td>
                  <td style={{ padding:'10px' }}>{r.officer}</td>
                  <td style={{ padding:'10px' }}>
                    <select value={r.status} onChange={e => updateStatus(r.reportId, e.target.value)} style={{ padding:'4px 8px', borderRadius:'6px', border:'1px solid #ccc', fontSize:'12px' }}>
                      <option value="reviewed">Reviewed</option>
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </td>
                  <td style={{ padding:'10px' }}>{r.dateSubmitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Reports;
