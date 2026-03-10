import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AdminSidebar from '../components/AdminSidebar';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, users]);

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
        alert('Access denied. Admins only.');
        navigate('/');
        return;
      }

      loadUsers();
    } catch (error) {
      navigate('/login');
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const updateRole = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      const updatedUsers = users.map(u =>
        u.id === userId ? { ...u, role: newRole } : u
      );
      setUsers(updatedUsers);
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      <AdminSidebar />

      <main style={{ marginLeft: '240px', flex: 1, padding: '30px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
            User Management
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Manage all users in the system.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Total Users</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#1e3a8a', marginTop: '8px' }}>{users.length}</strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Residents</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#10b981', marginTop: '8px' }}>
              {users.filter(u => u.role === 'resident').length}
            </strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Officials</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#f59e0b', marginTop: '8px' }}>
              {users.filter(u => u.role === 'official').length}
            </strong>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Admins</span>
            <strong style={{ display: 'block', fontSize: '28px', color: '#ef4444', marginTop: '8px' }}>
              {users.filter(u => u.role === 'admin').length}
            </strong>
          </div>
        </div>

        {/* Users Table */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>All Users</h3>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search users..."
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
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            >
              <option value="">All Roles</option>
              <option value="resident">Resident</option>
              <option value="official">Official</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {filteredUsers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No users found.</p>
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
                  {filteredUsers.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>{user.first_name} {user.last_name}</td>
                      <td style={{ padding: '12px' }}>{user.email}</td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={user.role || 'resident'}
                          onChange={(e) => updateRole(user.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '13px',
                            cursor: 'pointer',
                            background: user.role === 'admin' ? '#dbeafe' : user.role === 'official' ? '#fef3c7' : '#f3f4f6'
                          }}
                        >
                          <option value="resident">Resident</option>
                          <option value="official">Official</option>
                          <option value="admin">Admin</option>
                        </select>
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
      </main>
    </div>
  );
};

export default UserManagement;
