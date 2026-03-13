import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forgot_password.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic
    console.log('Reset code requested for:', email);
    navigate('/reset-code');
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Forgot Password?</h1>
        <p className="subtitle">
          No worries! Enter your registered email or phone number
          and we'll send you a reset code.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            GET RESET CODE
          </button>
        </form>

        <p className="footer-text">
          Remember Password?
          <Link to="/login"> Log In</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
