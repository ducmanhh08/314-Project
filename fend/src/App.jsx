import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ForgotPassword from './pages/forgot-password/ForgotPassword';
import UserHomePage from './pages/UserHomePage';
import CreateEvents from './pages/create-event/CreateEvents';
import LoginPage from './pages/login/LoginPage';
import AccountInfo from './pages/myInformation/MyInformation';
import HomePage from './pages/HomePage';
import CancelEvents from './pages/cancel-events/CancelEvents';
import EventDetail from './pages/event-detail/EventDetail';
import Attendee from './pages/attendee/Attendee';
import FinanceReport from './pages/finance-report/FinanceReport'
import MyEvents from './pages/MyEvents/MyEvents';
import MyTickets from './pages/my-ticket/MyTicket';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/attendee" element={<Attendee />} />
        <Route path="/cancel-events" element={<CancelEvents />} />
        <Route path="/finnace-report" element={<FinanceReport />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/my-info" element={<AccountInfo />} />
        <Route path="/my-tickets" element={<MyTickets />} />

      </Routes>
    </Router>
  );
}

export default App;
