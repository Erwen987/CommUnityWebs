import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      id="get-started"
      className="get-started fade-element"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/Footer.png)` }}
    >
      <h2>Get Started</h2>
      <p>Join and be part of building a better community.</p>
      <div className="footer-buttons">
        <Link to="/login" className="footer-btn">Login</Link>
        <Link to="/signup" className="footer-btn2">Sign Up</Link>
      </div>
    </footer>
  );
};

export default Footer;
