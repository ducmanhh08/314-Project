import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents/CreateEvents'; 
import HomePage from './pages/HomePage';
import EventDetail from './pages/event-detail/event-detail';
import MyEvents from './pages/MyEvents/MyEvents';
import NewPassword from './pages/NewPassword/NewPassword';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
