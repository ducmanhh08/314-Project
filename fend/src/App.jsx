import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import UserHomePage from './pages/UserHomePage';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<UserHomePage />} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
      </Router>
  );
}

export default App;
