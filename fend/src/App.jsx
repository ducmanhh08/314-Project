import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Finance from './pages/Finance'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/fin" element={<Finance />} />
      </Routes>
    </Router>
  );
}

export default App;
