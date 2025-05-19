import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents/CreateEvents'; 
import HomePage from './pages/HomePage';
import UserHomePage from './pages/UserHomePage';
import EventDetail from './pages/event-detail/event-detail';
import MyTickets from './pages/MyTicket/MyTicket';
import LoginPage from './pages/login/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
