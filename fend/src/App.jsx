import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ForgotPassword from './pages/forgot-password/ForgotPassword';
import UserHomePage from './pages/UserHomePage';
import CreateEvents from './pages/create-event/CreateEvents';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/HomePage';
import CancelEvents from './pages/cancel-events/CancelEvents';
import EventDetail from './pages/event-detail/EventDetail';
import Attendee from './pages/attendee/Attendee';
import FinanceReport from './pages/finance-report/FinanceReport'
import MyEvents from './pages/MyEvents/MyEvents';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/attendee" element={<Attendee />} />
        <Route path="/cancel-events" element={<CancelEvents />} />
        <Route path="/fin" element={<FinanceReport />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
