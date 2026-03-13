import React, { useState } from 'react';
import '../styles/settings.css';

function Settings() {
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [enableAutoBackup, setEnableAutoBackup] = useState(false);

  const handleCreateBackup = () => {
    console.log('Creating backup...');
  };

  const handleDownloadBackup = () => {
    console.log('Downloading backup...');
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', { backupFrequency, enableAutoBackup });
  };

  return (
    <div className="app">
      <main className="main">
        {/* SETTINGS TITLE */}
        <section className="settings-header">
          <h2>System Settings</h2>
          <p>Manage system backup, recovery and data protection.</p>
        </section>

        {/* BACKUP SECTION */}
        <section className="card">
          <h3>Database Backup</h3>

          <p className="settings-desc">
            Create a backup of the entire system database including residents, requests, and reports.
          </p>

          <div className="backup-actions">
            <button className="primary-btn" onClick={handleCreateBackup}>
              Create Backup
            </button>

            <button className="secondary-btn" onClick={handleDownloadBackup}>
              Download Latest Backup
            </button>
          </div>
        </section>

        {/* AUTO BACKUP */}
        <section className="card">
          <h3>Automatic Backup</h3>

          <p className="settings-desc">
            Enable automatic scheduled backups to protect system data.
          </p>

          <div className="form-group">
            <label>Backup Frequency</label>

            <select
              id="backupFrequency"
              value={backupFrequency}
              onChange={(e) => setBackupFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                id="enableAutoBackup"
                checked={enableAutoBackup}
                onChange={(e) => setEnableAutoBackup(e.target.checked)}
              />
              Enable Automatic Backup
            </label>
          </div>

          <button className="primary-btn" onClick={handleSaveSettings}>
            Save Settings
          </button>
        </section>
      </main>
    </div>
  );
}

export default Settings;
