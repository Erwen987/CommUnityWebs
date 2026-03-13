import React, { useState } from 'react';
import '../styles/rewards.css';

function Rewards() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [claims, setClaims] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const rewardTiers = [
    { points: 1500, color: 'gold' },
    { points: 500, color: 'green' },
    { points: 300, color: 'blue' },
    { points: 100, color: 'red' }
  ];

  return (
    <div className="app">
      <main className="main">
        {/* REWARD CARDS */}
        <section className="reward-grid" id="rewardGrid">
          {rewardTiers.map((tier, index) => (
            <div key={index} className={`reward ${tier.color}`}>
              <h3>{tier.points.toLocaleString()} Points</h3>
            </div>
          ))}
        </section>

        {/* TOP CONTRIBUTORS */}
        <section className="card contributors">
          <h3>Top Contributors</h3>
          <div className="leaderboard" id="leaderboard">
            {leaderboard.length === 0 ? (
              <p>No contributors yet</p>
            ) : (
              leaderboard.map((user, idx) => (
                <div key={idx} className="leaderboard-item">
                  {idx + 1}. {user.name} - {user.points} points
                </div>
              ))
            )}
          </div>
          <div className="view-all" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? '← Go Back' : 'View All →'}
          </div>
        </section>

        {/* CLAIMED REWARDS */}
        <section className="card claims">
          <h3>Residents Who Claimed Rewards</h3>
          <ul id="claimList">
            {claims.length === 0 ? (
              <li>No claims yet</li>
            ) : (
              claims.map((claim, idx) => (
                <li key={idx}>{claim.resident} - Claimed on {claim.date}</li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Rewards;
