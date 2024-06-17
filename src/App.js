// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Manager from './components/Manager';
import Customer from './components/Customer';
import Cook from './components/Cook';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/cook" element={<Cook />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
