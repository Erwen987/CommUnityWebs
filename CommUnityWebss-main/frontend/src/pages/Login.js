import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { profile } = await signIn(formData.emailOrPhone, formData.password);
      if (profile.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.png)` }}>
      <header>
        <nav>
          <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/CommUnity Logo.png`} alt="CommUnity" />
            <span className="logo-text">CommUnity</span>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#get-started">Get Started</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        <div className="login-wrapper">
          <div className="login-container">
            <div className="login-overview">
              <h2>Welcome to CommUnity</h2>
              <p>CommUnity helps residents connect, report issues, request services, and build a stronger barangay together.</p>
              <ul className="overview-points">
                <li>✔ Report community concerns</li>
                <li>✔ Request barangay services</li>
                <li>✔ Earn rewards for participation</li>
              </ul>
            </div>

            <div className="login-form">
              <h2>WELCOME BACK!</h2>
              <form onSubmit={handleSubmit}>
                <label>Email / Phone Number</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Enter your email or phone number"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                {error && <p style={{ color: '#ff9999', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>}
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'LOGIN'}</button>
                <p className="signup-text">Don't have an account? <Link to="/signup">Sign up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
