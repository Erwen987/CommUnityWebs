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
import Reports from './pages/Reports';
import Requests from './pages/Requests';
import Rewards from './pages/Rewards';
import UserManagement from './pages/UserManagement';

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
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/requests" element={<Requests />} />
          <Route path="/dashboard/rewards" element={<Rewards />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/rewards" element={<Rewards />} />
          <Route path="/test" element={<TestConnection />} />
          <Route path="/debug" element={<DebugLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;