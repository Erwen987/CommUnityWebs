import React, { useState } from 'react';
import '../styles/profile.css';

function Profile() {
  const [barangayName, setBarangayName] = useState('');
  const [barangayCity, setBarangayCity] = useState('');
  const [barangayDetails, setBarangayDetails] = useState([]);
  const [officials, setOfficials] = useState([]);

  const handleAddOfficial = () => {
    console.log('Adding official...');
  };

  const handleLogoUpload = () => {
    document.getElementById('logoUpload').click();
  };

  return (
    <div className="app">
      <main className="main">
        <section className="barangay-header">
          <div className="cover-photo"></div>

          <div className="barangay-info-header">
            <div className="barangay-avatar" onClick={handleLogoUpload}>
              <img id="barangayLogo" alt="Barangay Logo" />
              <input type="file" id="logoUpload" hidden accept="image/*" />
            </div>

            <div className="barangay-meta">
              <h2 id="barangayName">{barangayName || 'Barangay Name'}</h2>
              <span id="barangayCity">{barangayCity || 'City'}</span>
            </div>
          </div>
        </section>

        <section className="barangay-layout">
          <div className="left-column">
            <div className="card barangay-details">
              <h3>Barangay Information</h3>

              <ul id="barangayDetails">
                {barangayDetails.length === 0 ? (
                  <li>No details available</li>
                ) : (
                  barangayDetails.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="right-column">
            <section className="card org-chart">
              <h3>Barangay Organizational Structure</h3>

              <button className="add-official-btn" onClick={handleAddOfficial}>
                + Add Official
              </button>

              <div id="orgTree">
                {officials.length === 0 ? (
                  <p>No officials added yet</p>
                ) : (
                  officials.map((official, idx) => (
                    <div key={idx} className="official-card">
                      {official.name}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
