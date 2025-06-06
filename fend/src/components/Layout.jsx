import { useEffect, useState, useCallback } from 'react';
import NavbarUser from './Navbar/NavbarUser';
import Navbar from './Navbar/Navbar';
import { authFetch } from './authFetch';
import { Outlet } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ticket-please.onrender.com";

const Layout = ({ children }) => {
  const [ticketCount, setTicketCount] = useState(0);

  const fetchTicketCount = useCallback(() => {
      authFetch(`${API_BASE_URL}/my_tickets`)
      .then(res => res.json())
      .then(data => setTicketCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setTicketCount(0));
  }, []);

  useEffect(() => {
    fetchTicketCount();
  }, [fetchTicketCount]);

  return (
    <>
      <NavbarUser ticketCount={ticketCount} fetchTicketCount={fetchTicketCount}/>
      <Outlet context={{ fetchTicketCount }} />
    </>
  );
};

const GuestLayout = ({ children }) => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export { GuestLayout, Layout };
