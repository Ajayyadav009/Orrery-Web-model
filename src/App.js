import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SolarSystem from './pages/SolarSystem';
import Home from './pages/Home';
import About from './pages/About';
import Neos from './pages/Neos';

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#333', padding: '10px' }}>
          <Link to="/" style={navStyle}>Home</Link>
          <Link to="/about" style={navStyle}>About</Link>
          <Link to="/solar-system" style={navStyle}>Solar System</Link>
          <Link to="/neos" style={navStyle}>Neos</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solar-system" element={<SolarSystem />} />
          <Route path="/neos" element={<Neos />} />
        </Routes>
      </div>
    </Router>
  );
};

const navStyle = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: '20px',
};

export default App;
