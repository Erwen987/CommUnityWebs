import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/change_password.css';

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Password changed');
    navigate('/login');
  };

  return (
    <main className="hero">
      <div className="password-card">
        <h2>Change Your Password</h2>

        <p className="subtitle">
          No worries! Enter your registered email or phone number and we'll send you a reset code.
        </p>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
          <small>Password must be at least 8 characters</small>

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">CHANGE PASSWORD</button>
        </form>
      </div>
    </main>
  );
}

export default ChangePassword;
