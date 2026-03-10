import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import OfficialSidebar from '../components/OfficialSidebar';
import AdminSidebar from '../components/AdminSidebar';

const Rewards = () => {
  const navigate = useNavigate();
  const [contributors, setContributors] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

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
      loadContributors();
    } catch (error) {
      navigate('/login');
    }
  };

  const loadContributors = async () => {
    try {
      // Try to load from rewards table
      const { data, error } = await supabase
        .from('rewards')
        .select('*, users(first_name, last_name)')
        .order('points', { ascending: false });

      if (error) throw error;

      // Format data
      const formatted = data.map(r => ({
        name: r.users ? `${r.users.first_name} ${r.users.last_name}` : 'Unknown',
        points: r.points || 0
      }));

      setContributors(formatted);
    } catch (error) {
      console.error('Error loading contributors:', error);
      // Use mock data if table doesn't exist
      setContributors([
        { name: 'John Dewey', points: 2000 },
        { name: 'Maria Santos', points: 1500 },
        { name: 'Pedro Cruz', points: 1200 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const displayedContributors = showAll ? contributors : contributors.slice(0, 3);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {userRole === 'admin' ? <AdminSidebar /> : <OfficialSidebar />}

      <main style={{ marginLeft: '240px', flex: 1, padding: '30px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
            Rewards
          </h1>
          <p style={{ color: '#666', margin: 0 }}>Monitor barangay reward contributions.</p>
        </div>

        {/* Reward Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>1,500 Points</h3>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>500 Points</h3>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>300 Points</h3>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>100 Points</h3>
          </div>
        </div>

        {/* Top Contributors */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Top Contributors</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {displayedContributors.map((contributor, index) => {
              let bgColor = '#f3f4f6';
              if (index === 0) bgColor = '#fef3c7';
              if (index === 1) bgColor = '#e5e7eb';
              if (index === 2) bgColor = '#fed7aa';

              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '15px',
                  background: bgColor,
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#1e3a8a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    {contributor.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '16px' }}>{contributor.name}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1e3a8a' }}>
                    {contributor.points.toLocaleString()} Points
                  </div>
                </div>
              );
            })}
          </div>

          {contributors.length > 3 && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  padding: '10px 24px',
                  background: '#1e3a8a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {showAll ? '← Go Back' : 'View All →'}
              </button>
            </div>
          )}
        </div>

        {/* Claimed Rewards */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Residents Who Claimed Rewards</h3>
          <p style={{ color: '#999', textAlign: 'center', padding: '20px 0' }}>No claims yet.</p>
        </div>
      </main>
    </div>
  );
};

export default Rewards;
