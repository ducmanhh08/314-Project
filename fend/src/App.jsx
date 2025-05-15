import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Attendee from './pages/Attendee';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/att" element={<Attendee />} />
      </Routes>
    </Router>
  );
}

export default App;
