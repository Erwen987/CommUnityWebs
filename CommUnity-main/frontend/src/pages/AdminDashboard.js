import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

      if (!profile || profile.role !== 'admin') {
        alert('Access denied. This dashboard is for admins only.');
        navigate('/');
        return;
      }

      setUser(profile);
      loadData();
    } catch (error) {
      navigate('/login');
    }
  };

  const loadData = async () => {
    try {
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      setUsers(usersData || []);

      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      setReports(reportsData || []);

      const { data: requestsData } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });
      setRequests(requestsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '30px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
            Admin Dashboard 👋
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Manage your barangay system.</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>Total Users</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>{users.length}</p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>Total Reports</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>{reports.length}</p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>Total Requests</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>{requests.length}</p>
          </div>
        </div>

        {/* Recent Users */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Recent Users</h2>
          
          {users.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No users yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>{user.first_name} {user.last_name}</td>
                      <td style={{ padding: '12px' }}>{user.email}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          background: user.role === 'admin' ? '#dbeafe' : user.role === 'official' ? '#fef3c7' : '#e5e7eb',
                          color: user.role === 'admin' ? '#1e40af' : user.role === 'official' ? '#92400e' : '#374151',
                          fontSize: '12px'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: '#666' }}>
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* System Activity */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px 0' }}>System Activity</h2>
          <p style={{ color: '#666' }}>Recent reports: {reports.length}</p>
          <p style={{ color: '#666' }}>Recent requests: {requests.length}</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
