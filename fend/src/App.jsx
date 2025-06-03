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
import ProtectedRoute from "./components/ProtectedRoute";
import HomePageLayout from "./pages/HomePageLayout";
import { Layout, GuestLayout } from "./components/Layout";
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<UserHomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<GuestLayout />}>
        <Route path="/event/:id" element={<EventDetail />} />
      </Route>

      {/* Protect all /homepage routes */}
      <Route
        path="/homepage/*"
        element={
          <Layout>
            <ProtectedRoute>
              <HomePageLayout />
            </ProtectedRoute>
          </Layout>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="result" element={<EventPage />} />
        <Route path="event/:id" element={<EventDetail />} />
        {/* Ticket Selection option: */}
        <Route path="event/:id/seat-selection" element={<SeatSelection />} />
        <Route path="event/:id/seat-selection/confirmation" element={<Confirmation />} />
        <Route path="event/:id/seat-selection/confirmation/payment" element={<Payment />} />
        <Route path="event/:id/seat-selection/confirmation/payment/refund-policy" element={<RefundPolicy />} />
        <Route path="event/:id/seat-selection/confirmation/payment/finish" element={<Finish />} />

        <Route path="my-tickets" element={<MyTickets />} />
        <Route path="my-tickets/event/:id" element={<EventDetail />} />
        <Route path="my-tickets/refund-request/:id" element={<RefundRequest />} />
        <Route path="my-tickets/waiting-list" element={<WaitingList />} />
        <Route path="my-tickets/waiting-list2" element={<WaitingList2 />} />
        <Route path="my-tickets/waiting-list3" element={<WaitingList3 />} />
        <Route path="my-info" element={<AccountInfo />} />
        <Route path="my-events" element={<MyEvents />} />
        <Route path="my-events/attendee/:id" element={<Attendee />} />
        <Route path="my-events/finnace-report/:id" element={<FinanceReport />} />
        <Route path="my-events/cancel-events" element={<CancelEvents />} />
        <Route path="create-event" element={<CreateEvents />} />
      </Route>
    </Routes>
    // </Router>
  );
}

export default App;
