import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from "./pages/signUp/SignUp";
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import UserHomePage from './pages/UserHomePage';
import CreateEvents from './pages/create-event/CreateEvents';
import LoginPage from './pages/login/LoginPage';
import AccountInfo from './pages/my-information/MyInformation';
import HomePage from './pages/HomePage';
import CancelEvents from './pages/cancel-events/CancelEvents';
import EventDetail from './pages/event-detail/EventDetail';
import Attendee from './pages/attendee/Attendee';
import FinanceReport from './pages/finance-report/FinanceReport'
import MyEvents from './pages/my-events/MyEvents';
import MyTickets from './pages/my-ticket/MyTicket';
import RefundPolicy from './pages/refund-policy/RefundPolicy';
import EventPage from './pages/search-option/Research'

import SeatSelection from './pages/seat-selection/SeatSelection';
import Confirmation from './pages/confirmation/Confirmation';
import Payment from './pages/payment/Payment';
import Finish from './pages/finish/Finish';
import RefundRequest from './pages/refund-request/RefundRequest';


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

        <Route path="/homepage/my-tickets" element={<MyTickets />} />
        <Route path="/homepage/my-tickets/event/:id" element={<EventDetail />} />
        <Route path="/homepage/my-tickets/refund-request" element={<RefundRequest />} />
        <Route path="/homepage/my-tickets/waiting-list" element={<WaitingList />} />
        <Route path="/homepage/my-info" element={<AccountInfo />} />
        <Route path="/homepage/my-events" element={<MyEvents />} />
        <Route path="/homepage/my-events/attendee" element={<Attendee />} />
        <Route path="/homepage/my-events/finnace-report" element={<FinanceReport />} />
        <Route path="/homepage/my-events/cancel-events" element={<CancelEvents />} />
        <Route path="/homepage/create-event" element={<CreateEvents/>} />

        

       
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/result" element={<EventPage />} />

        {/* Ticket Selection option: */}
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/finish" element={<Finish />} />
        
        <Route path="/waiting-list2" element={<WaitingList2 />} />
        <Route path="/waiting-list3" element={<WaitingList3 />} />

      </Routes>
    // </Router>


  );
}

export default App;
