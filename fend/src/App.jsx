import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHomePage from './pages/UserHomePage';
import HomePage from './pages/HomePage';
import EventPage from './pages/search-option/Research' 

import Attendee from './pages/attendee/Attendee';
import CancelEvents from './pages/cancel-events/CancelEvents';
import Confirmation from './pages/confirmation/Confirmation';
import CreateEvents from './pages/create-event/CreateEvents';
import EventDetail from './pages/event-detail/EventDetail';
import FinanceReport from './pages/finance-report/FinanceReport'
import Finish from './pages/finish/Finish';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import LoginPage from './pages/login/LoginPage';
import MyEvents from './pages/my-events/MyEvents';
import AccountInfo from './pages/my-information/MyInformation';
import MyTickets from './pages/my-ticket/MyTicket';
import NewPassword from './pages/new-password/NewPassword';
import Payment from './pages/payment/Payment';
import RefundPolicy from './pages/refund-policy/RefundPolicy';
import RefundRequest from './pages/refund-request/RefundRequest';
import SeatSelection from './pages/seat-selection/SeatSelection';
import SignUp from "./pages/signUp/SignUp";
import WaitingList from './pages/waitinglist-1/WaitingList';
import WaitingList2 from './pages/waitinglist-2/WaitingList2';
import WaitingList3 from './pages/waitinglist-3/WaitingList3';

function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/new-password" element={<NewPassword />} />
        
        <Route path="/result" element={<EventPage />} />
        {/* <Route path="/homepage/event/:id" element={<EventDetail />} /> */}

        {/* Ticket Selection option: */}
        <Route path="/homepage/event/:id/seat-selection" element={<SeatSelection />} />
        <Route path="/homepage/event/:id/seat-selection/confirmation" element={<Confirmation />} />
        <Route path="/homepage/event/:id/seat-selection/confirmation/payment" element={<Payment />} />
        <Route path="/homepage/event/:id/seat-selection/confirmation/payment/refund-policy" element={<RefundPolicy />} />
        <Route path="/homepage/event/:id/seat-selection/confirmation/payment/finish" element={<Finish />} />

        <Route path="/homepage/my-tickets" element={<MyTickets />} />
        <Route path="/homepage/my-tickets/event/:id" element={<EventDetail />} />
        <Route path="/homepage/my-tickets/refund-request" element={<RefundRequest />} />
        <Route path="/homepage/my-tickets/waiting-list" element={<WaitingList />} />
        <Route path="/homepage/my-tickets/waiting-list2" element={<WaitingList2 />} />
        <Route path="/homepage/my-tickets/waiting-list3" element={<WaitingList3 />} />
        <Route path="/homepage/my-info" element={<AccountInfo />} />
        <Route path="/homepage/my-events" element={<MyEvents />} />
        <Route path="/homepage/my-events/attendee" element={<Attendee />} />
        <Route path="/homepage/my-events/finnace-report" element={<FinanceReport />} />
        <Route path="/homepage/my-events/cancel-events" element={<CancelEvents />} />
        <Route path="/homepage/create-event" element={<CreateEvents/>} />
      </Routes>
    // </Router>
  );
}

export default App;
