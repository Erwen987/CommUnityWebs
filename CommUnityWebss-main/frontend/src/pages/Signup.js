import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    barangay: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
    console.log('Form submitted:', formData);
  };

  return (
    <section className="hero">
      <div className="signup-wrapper">
        <div className="signup-container">
          {/* LEFT SIDE */}
          <div className="login-overview">
            <h2>Welcome to CommUnity</h2>
            <p>
              CommUnity helps residents connect, report issues,
              request services, and build a stronger barangay together.
            </p>
            <ul className="overview-points">
              <li>✔ Report community concerns</li>
              <li>✔ Request barangay services</li>
              <li>✔ Earn rewards for participation</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="signup-card">
            <h2>Create an Account</h2>
            <p className="subtitle">Join your community today!</p>

            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <label>Name</label>
              <div className="row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BARANGAY */}
              <label>Barangay</label>
              <select
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
                required
              >
                <option value="">Select your barangay</option>
                <option>Bacayao Norte</option>
                <option>Bacayao Sur</option>
                <option>Balangobong</option>
                <option>Balococ</option>
                <option>Bolosan</option>
                <option>Bonuan Binloc</option>
                <option>Bonuan Boquig</option>
                <option>Bonuan Gueset</option>
                <option>Calmay</option>
                <option>Carael</option>
                <option>Caranglaan</option>
                <option>Herrero-Perez</option>
                <option>Lomboy</option>
                <option>Lucao</option>
                <option>Malued</option>
                <option>Mamalingling</option>
                <option>Mangin</option>
                <option>Mayombo</option>
                <option>Pantal</option>
                <option>Pogo Chico</option>
              </select>

              {/* EMAIL */}
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* PHONE */}
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              {/* PASSWORD */}
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* CONFIRM PASSWORD */}
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit">CREATE ACCOUNT</button>

              <p className="signup-text">
                Already have an account?
                <Link to="/login"> Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
