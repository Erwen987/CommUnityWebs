import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import OfficialSidebar from '../components/OfficialSidebar';
import AdminSidebar from '../components/AdminSidebar';

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    reviewing: 0,
    processing: 0,
    ready: 0,
    released: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, requests]);

  const checkAuth = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authUser.id)
        .single();

      if (!profile || (profile.role !== 'official' && profile.role !== 'admin')) {
        alert('Access denied.');
        navigate('/');
        return;
      }

      setUserRole(profile.role);
      loadRequests();
    } catch (error) {
      navigate('/login');
    }
  };

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRequests(data || []);
      setFilteredRequests(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      reviewing: data.filter(r => r.status === 'reviewing').length,
      processing: data.filter(r => r.status === 'processing').length,
      ready: data.filter(r => r.status === 'ready').length,
      released: data.filter(r => r.status === 'released').length
    });
  };

  const filterRequests = () => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(r =>
        (r.document_type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.purpose?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  const updateStatus = async (requestId, newStatus) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;

      const updatedRequests = requests.map(r =>
        r.id === requestId ? { ...r, status: newStatus } : r
      );
      setRequests(updatedRequests);
      calculateStats(updatedRequests);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {userRole === 'admin' ? <AdminSidebar /> : <OfficialSidebar />}

      <main style={{ marginLeft: '240px', flex: 1, padding: '30px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
            Requests
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Monitor and manage barangay document requests.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Total Requests</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1e3a8a', marginTop: '8px' }}>{stats.total}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Reviewing</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#94a3b8', marginTop: '8px' }}>{stats.reviewing}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Processing</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#f59e0b', marginTop: '8px' }}>{stats.processing}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Ready</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#2d66ca', marginTop: '8px' }}>{stats.ready}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Released</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#16a34a', marginTop: '8px' }}>{stats.released}</strong>
          </div>
        </div>

        {/* Requests Table */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Requests List</h3>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                minWidth: '220px',
                fontSize: '14px'
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            >
              <option value="">All Status</option>
              <option value="reviewing">Reviewing</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="released">Released</option>
            </select>
          </div>

          {filteredRequests.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No requests found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Document</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Purpose</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr key={request.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>{request.document_type || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{request.purpose || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={request.status || 'reviewing'}
                          onChange={(e) => updateStatus(request.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="reviewing">Reviewing</option>
                          <option value="processing">Processing</option>
                          <option value="ready">Ready</option>
                          <option value="released">Released</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', color: '#666' }}>
                        {request.created_at ? new Date(request.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Requests;
