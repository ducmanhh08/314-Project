import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents'; 
import HomePage from './pages/HomePage';
import EventDetail from './pages/CreateEvents/event-detail';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
