import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents/CreateEvents'; 
import HomePage from './pages/HomePage';
import EventDetail from './pages/event-detail/event-detail';
import RefundPolicy from './pages/refund-policy/RefundPolicy';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
