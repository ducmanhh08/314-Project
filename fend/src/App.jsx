import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from "./page/signUp/SignUp";
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
import RefundPolicy from './pages/refund-policy/RefundPolicy';
import EventPage from './pages/search-option/Research'

import SeatSelection from './pages/seat-selection/SeatSelection';
import Confirmation from './pages/confirmation/Confirmation';
import Payment from './pages/payment/Payment';
import Finish from './pages/finish/Finish';
import RefundRequest from './pages/refund-request/RefundRequest';



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
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/result" element={<EventPage />} />
        <Route path="/sign-up" element={<SignUp />} />


        {/* Ticket Selection option: */}
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/refund-request" element={<RefundRequest />} />

      </Routes>
    </Router>


  );
}

export default App;
