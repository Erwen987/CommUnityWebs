import React, { useState } from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/rewards.css';

const MOCK_CONTRIBUTORS = [
  { name:'John Dewey', points:2000 }, { name:'Maria Santos', points:1000 },
  { name:'Pedro Reyes', points:950 }, { name:'Ana Lopez', points:900 },
  { name:'Juan Cruz', points:870 }, { name:'Rosa Garcia', points:850 },
  { name:'Carlo Reyes', points:750 }, { name:'Lisa Tan', points:700 },
  { name:'Mike Sy', points:400 }, { name:'Joy Lim', points:300 },
];

const MOCK_CLAIMS = [
  { name:'John Dewey', description:'Claimed ₱500 worth of Grocery for 500 Points' },
  { name:'Maria Santos', description:'Claimed ₱200 worth of Load for 100 Points' },
  { name:'Pedro Reyes', description:'Claimed School Supplies for 300 Points' },
  { name:'John Dewey', description:'Claimed ₱1500 Cash Aid for 1500 Points' },
];

const TIER_COLORS = { gold:'#f59e0b', green:'#16a34a', blue:'#2563eb', red:'#dc2626' };
const TIERS = [{ label:'1,500 Points', color:'gold' }, { label:'500 Points', color:'green' }, { label:'300 Points', color:'blue' }, { label:'100 Points', color:'red' }];

function Rewards() {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? MOCK_CONTRIBUTORS : MOCK_CONTRIBUTORS.slice(0, 3);
  const rankClass = ['first', 'second', 'third'];

  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar title="Rewards" description="Monitor barangay reward contributions." />

        {/* REWARD TIER CARDS */}
        <section className="reward-grid">
          {TIERS.map(t => (
            <div key={t.label} className={`reward ${t.color}`} style={{ background:TIER_COLORS[t.color], borderRadius:'14px', padding:'28px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <h3 style={{ color:'#fff', fontSize:'22px', fontWeight:700 }}>{t.label}</h3>
            </div>
          ))}
        </section>

        {/* TOP CONTRIBUTORS */}
        <section className="card contributors" style={{ marginTop:'20px' }}>
          <h3 style={{ marginBottom:'16px' }}>Top Contributors</h3>
          <div className="leaderboard">
            {displayed.map((user, idx) => (
              <div key={idx} className={`leader ${rankClass[idx] || ''}`} style={{
                display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderRadius:'10px', marginBottom:'8px',
                background: idx === 0 ? '#fef9c3' : idx === 1 ? '#f1f5f9' : idx === 2 ? '#fef3c7' : '#f8fafc'
              }}>
                <div className="avatar" style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2d66ca', flexShrink:0 }} />
                <span style={{ flex:1, fontWeight:500, fontSize:'14px' }}>{user.name}</span>
                <strong style={{ color:'#1f5fbf', fontSize:'14px' }}>{user.points.toLocaleString()} Points</strong>
              </div>
            ))}
          </div>
          <div className="view-all" onClick={() => setShowAll(!showAll)} style={{ textAlign:'center', marginTop:'12px', color:'#2d66ca', cursor:'pointer', fontWeight:500, fontSize:'13px' }}>
            {showAll ? '← Go Back' : 'View All →'}
          </div>
        </section>

        {/* CLAIMED REWARDS */}
        <section className="card claims" style={{ marginTop:'20px' }}>
          <h3 style={{ marginBottom:'16px' }}>Residents Who Claimed Rewards</h3>
          <ul style={{ listStyle:'none' }}>
            {MOCK_CLAIMS.map((item, idx) => (
              <li key={idx} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                <div className="avatar" style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2d66ca', flexShrink:0 }} />
                <div>
                  <strong style={{ fontSize:'14px', display:'block' }}>{item.name}</strong>
                  <p style={{ fontSize:'12px', color:'#6b7a90' }}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Rewards;
