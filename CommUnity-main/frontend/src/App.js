import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css'; // Import the CSS
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhoCanUse from './components/WhoCanUse';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import TestConnection from './pages/TestConnection';
import DebugLogin from './pages/DebugLogin';
import OfficialsDashboard from './pages/OfficialsDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-element');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div className="hero-wrapper">
                <Header />
                <Hero />
              </div>
              <About />
              <WhoCanUse />
              <Features />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<OfficialsDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="/debug" element={<DebugLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;