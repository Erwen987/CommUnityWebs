import React from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/analytics.css';

const REPORTS = [12,18,9,14,11,16];
const REQUESTS = [10,14,6,12,8,13];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun'];
const MAX = Math.max(...REPORTS, ...REQUESTS);

const PIE_DATA = [
  { label:'Reviewing', value:25, stroke:'#64748b', offset:0 },
  { label:'Processing', value:20, stroke:'#facc15', offset:-25 },
  { label:'Ready', value:15, stroke:'#ef4444', offset:-45 },
  { label:'Released', value:40, stroke:'#16a34a', offset:-60 },
];

function Analytic() {
  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar title="Analytics" description="Reports and requests insights across the barangay." />

        <section className="stats">
          <div className="card stat"><span>Total Reports</span><strong>{REPORTS.reduce((a,b)=>a+b,0)}</strong></div>
          <div className="card stat"><span>Total Requests</span><strong>{REQUESTS.reduce((a,b)=>a+b,0)}</strong></div>
          <div className="card stat"><span>Active Users</span><strong>128</strong></div>
          <div className="card stat"><span>Resolved Issues</span><strong>52</strong></div>
        </section>

        <div className="content" style={{ marginTop:'20px' }}>
          <div className="card chart">
            <h3>Monthly Reports vs Requests</h3>
            <div className="bars" style={{ height:'200px', alignItems:'flex-end', display:'flex', gap:'16px', padding:'10px 0 0' }}>
              {MONTHS.map((m, i) => (
                <div key={m} className="bar-group" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                  <div style={{ display:'flex', gap:'4px', alignItems:'flex-end' }}>
                    <div className="bar requests" style={{ width:'14px', height:`${(REQUESTS[i]/MAX)*160}px`, borderRadius:'4px 4px 0 0', background:'#9dc4ff' }} />
                    <div className="bar reports" style={{ width:'14px', height:`${(REPORTS[i]/MAX)*160}px`, borderRadius:'4px 4px 0 0', background:'#1f5fbf' }} />
                  </div>
                  <span style={{ fontSize:'11px', color:'#6b7a90' }}>{m}</span>
                </div>
              ))}
            </div>
            <div className="legend">
              <span><i className="req"></i> Requests</span>
              <span><i className="rep"></i> Reports</span>
            </div>
          </div>

          <div className="right-column">
            <div className="card contributors">
              <h3 style={{ marginBottom:'12px' }}>Request Status Distribution</h3>
              <svg width="200" height="200" viewBox="0 0 36 36" style={{ margin:'auto', display:'block' }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                {PIE_DATA.map((d, i) => (
                  <circle key={i} cx="18" cy="18" r="16" fill="none" stroke={d.stroke} strokeWidth="4"
                    strokeDasharray={`${d.value} ${100 - d.value}`} strokeDashoffset={d.offset} />
                ))}
              </svg>
              <ul style={{ listStyle:'none', marginTop:'15px' }}>
                {PIE_DATA.map(d => (
                  <li key={d.label} style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'8px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <i style={{ width:'10px', height:'10px', borderRadius:'50%', background:d.stroke, display:'inline-block' }} />
                      {d.label}
                    </span>
                    <strong style={{ color:d.stroke }}>{d.value}%</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card activities">
              <h3 style={{ marginBottom:'12px' }}>Top Reporting Residents</h3>
              <ul style={{ listStyle:'none' }}>
                {[['Juan Dela Cruz',12],['Maria Santos',9],['Pedro Reyes',7],['Ana Lopez',5]].map(([name, count]) => (
                  <li key={name} style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'10px' }}>
                    <span>{name}</span><strong>{count} reports</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytic;
