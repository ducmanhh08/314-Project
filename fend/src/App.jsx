import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents/CreateEvents'; 
import HomePage from './pages/HomePage';
import EventDetail from './pages/event-detail/event-detail';
import MyTickets from './pages/MyTicket/MyTicket';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/my-tickets" element={<MyTickets />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
