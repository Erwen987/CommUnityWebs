import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import OfficialSidebar from '../components/OfficialSidebar';
import AdminSidebar from '../components/AdminSidebar';

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    assigned: 0,
    inProgress: 0,
    fixed: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

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
      loadReports();
    } catch (error) {
      navigate('/login');
    }
  };

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      reviewed: data.filter(r => r.status === 'reviewed').length,
      assigned: data.filter(r => r.status === 'assigned').length,
      inProgress: data.filter(r => r.status === 'in_progress').length,
      fixed: data.filter(r => r.status === 'fixed').length
    });
  };

  const updateStatus = async (reportId, newStatus) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (error) throw error;

      // Update local state
      const updatedReports = reports.map(r =>
        r.id === reportId ? { ...r, status: newStatus } : r
      );
      setReports(updatedReports);
      calculateStats(updatedReports);
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
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
            Reports
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Monitor and manage community reports.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Total Reports</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1e3a8a', marginTop: '8px' }}>{stats.total}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Reviewed</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#94a3b8', marginTop: '8px' }}>{stats.reviewed}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Assigned</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#f59e0b', marginTop: '8px' }}>{stats.assigned}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>In Progress</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#2d66ca', marginTop: '8px' }}>{stats.inProgress}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Fixed</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#16a34a', marginTop: '8px' }}>{stats.fixed}</strong>
          </div>
        </div>

        {/* Reports Table */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Reports List</h3>

          {reports.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No reports yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Title</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Description</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>{report.title || 'Untitled'}</td>
                      <td style={{ padding: '12px' }}>{report.description || 'No description'}</td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={report.status || 'reviewed'}
                          onChange={(e) => updateStatus(report.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="reviewed">Reviewed</option>
                          <option value="assigned">Assigned</option>
                          <option value="in_progress">In Progress</option>
                          <option value="fixed">Fixed</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', color: '#666' }}>
                        {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'N/A'}
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

export default Reports;
