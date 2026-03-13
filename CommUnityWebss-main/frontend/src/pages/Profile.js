import React, { useState, useRef } from 'react';
import OfficialSidebar from '../components/OfficialSidebar';
import Topbar from '../components/Topbar';
import '../styles/sidebar.css';
import '../styles/profile.css';

const ROLES = ['Barangay Captain', 'Secretary', 'Treasurer', 'Kagawad', 'Barangay Tanod', 'Health Worker'];
const UNIQUE_ROLES = ['Barangay Captain', 'Secretary', 'Treasurer'];

const INITIAL_BARANGAY = {
  name: 'Barangay Bonuan Boquig',
  city: 'Dagupan City',
  logo: `${process.env.PUBLIC_URL}/images/barangay-logo.png`,
  facebook: 'Barangay Bonuan Boquig',
  telephone: '+63 912 345 6789',
  email: 'bonuanboquig@barangay.gov.ph',
  address: 'Bonuan Boquig, Dagupan City',
  population: '12,350 Residents',
};

const INITIAL_OFFICIALS = [
  { id: 1, name: 'Juan Dela Cruz', role: 'Barangay Captain', image: `${process.env.PUBLIC_URL}/images/default-user.png` },
  { id: 2, name: 'Maria Santos', role: 'Secretary', image: `${process.env.PUBLIC_URL}/images/default-user.png` },
  { id: 3, name: 'Pedro Reyes', role: 'Treasurer', image: `${process.env.PUBLIC_URL}/images/default-user.png` },
  { id: 4, name: 'Ana Lopez', role: 'Kagawad', image: `${process.env.PUBLIC_URL}/images/default-user.png` },
];

function Profile() {
  const [barangay, setBarangay] = useState(INITIAL_BARANGAY);
  const [officials, setOfficials] = useState(INITIAL_OFFICIALS);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState(ROLES[0]);
  const logoRef = useRef();

  const roleExists = (role, excludeId = null) =>
    officials.some(o => o.role === role && o.id !== excludeId);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setBarangay(prev => ({ ...prev, logo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const enableEdit = (official) => {
    setEditingId(official.id);
    setEditValues({ name: official.name, role: official.role });
  };

  const saveEdit = (id) => {
    if (UNIQUE_ROLES.includes(editValues.role) && roleExists(editValues.role, id)) {
      alert(`${editValues.role} already assigned`);
      return;
    }
    setOfficials(prev => prev.map(o => o.id === id ? { ...o, ...editValues } : o));
    setEditingId(null);
  };

  const deleteOfficial = (id) => {
    setOfficials(prev => prev.filter(o => o.id !== id));
  };

  const addOfficial = () => {
    if (!newName.trim()) return;
    if (UNIQUE_ROLES.includes(newRole) && roleExists(newRole)) {
      alert(`${newRole} already exists`);
      return;
    }
    setOfficials(prev => [...prev, { id: Date.now(), name: newName, role: newRole, image: `${process.env.PUBLIC_URL}/images/default-user.png` }]);
    setNewName('');
    setNewRole(ROLES[0]);
    setShowModal(false);
  };

  return (
    <div className="app">
      <OfficialSidebar />
      <main className="main">
        <Topbar title="Barangay Officials" description="Manage barangay structure" />

        <section className="barangay-header">
          <div className="cover-photo" style={{ height: '160px', background: 'linear-gradient(135deg, #1f5fbf, #2d66ca)', borderRadius: '16px 16px 0 0' }} />
          <div className="barangay-info-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '0 24px 16px', marginTop: '-40px' }}>
            <div
              className="barangay-avatar"
              onClick={() => logoRef.current.click()}
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #fff', overflow: 'hidden', cursor: 'pointer', background: '#e8f0fe', flexShrink: 0 }}
            >
              <img src={barangay.logo} alt="Barangay Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
              <input type="file" ref={logoRef} hidden accept="image/*" onChange={handleLogoChange} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>{barangay.name}</h2>
              <span style={{ fontSize: '13px', color: '#6b7a90' }}>{barangay.city}</span>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Barangay Information</h3>
            <ul style={{ listStyle: 'none' }}>
              {[['Facebook', barangay.facebook], ['Telephone', barangay.telephone], ['Email', barangay.email], ['Address', barangay.address], ['Population', barangay.population]].map(([label, val]) => (
                <li key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                  <strong style={{ color: '#1f5fbf' }}>{label}</strong>
                  <span style={{ color: '#374151', textAlign: 'right', maxWidth: '60%' }}>{val}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Barangay Organizational Structure</h3>
              <button
                onClick={() => setShowModal(true)}
                style={{ background: '#2d66ca', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
              >
                + Add Official
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {officials.length === 0 ? (
                <p style={{ color: '#6b7a90', fontSize: '13px' }}>No officials added yet</p>
              ) : (
                officials.map(o => (
                  <div key={o.id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                    <img src={o.image} alt={o.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', background: '#e8f0fe' }} onError={e => { e.target.style.display = 'none'; }} />
                    {editingId === o.id ? (
                      <>
                        <input
                          value={editValues.name}
                          onChange={e => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                          style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #d0d7e3', fontSize: '12px', marginBottom: '6px', textAlign: 'center' }}
                        />
                        <select
                          value={editValues.role}
                          onChange={e => setEditValues(prev => ({ ...prev, role: e.target.value }))}
                          style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #d0d7e3', fontSize: '12px', marginBottom: '8px' }}
                        >
                          {ROLES.map(r => <option key={r}>{r}</option>)}
                        </select>
                        <button onClick={() => saveEdit(o.id)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', marginRight: '4px' }}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{ background: '#6b7a90', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <strong style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>{o.name}</strong>
                        <span style={{ fontSize: '11px', color: '#6b7a90', display: 'block', marginBottom: '10px' }}>{o.role}</span>
                        <button onClick={() => enableEdit(o)} style={{ background: '#2d66ca', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', marginRight: '4px' }}>Edit</button>
                        <button onClick={() => deleteOfficial(o.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Delete</button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
            onClick={() => setShowModal(false)}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
              onClick={e => e.stopPropagation()}>
              <h3 style={{ marginBottom: '20px' }}>Add Barangay Official</h3>
              <input
                type="text"
                placeholder="Official Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7e3', fontSize: '13px', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d7e3', fontSize: '13px', marginBottom: '20px', background: '#fff', boxSizing: 'border-box' }}
              >
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={addOfficial} style={{ flex: 1, padding: '10px', background: '#2d66ca', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Add</button>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', color: '#374151', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
