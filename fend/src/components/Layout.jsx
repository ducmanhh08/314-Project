import React, { useEffect, useState } from 'react';
import NavbarUser from './Navbar/NavbarUser';

const Layout = ({ children }) => {
  const [eventCount, setEventCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/my_events')
      .then(res => res.json())
      .then(data => setEventCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setEventCount(0));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/my_tickets')
      .then(res => res.json())
      .then(data => setTicketCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setTicketCount(0));
  }, []);

  return (
    <>
      <NavbarUser eventCount={eventCount} ticketCount={ticketCount}/>
      {children}
    </>
  );
};

export default Layout;