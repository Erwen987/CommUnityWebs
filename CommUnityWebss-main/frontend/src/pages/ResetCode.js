import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/reset_code.css';

function ResetCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus to next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    console.log('Code submitted:', fullCode);
    navigate('/change-password');
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Enter the Code</h1>

        <p className="subtitle">
          Don't worry! We've sent you a code. Enter it below
          to create a new password.
        </p>

        {/* OTP INPUTS */}
        <form onSubmit={handleSubmit}>
          <div className="otp-group">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
              />
            ))}
          </div>

          <button type="submit" className="btn-primary">
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResetCode;
