import React, { useEffect, useState } from 'react';
import NavbarUser from './Navbar/NavbarUser';

const Layout = ({ children }) => {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/my_events')
      .then(res => res.json())
      .then(data => setEventCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setEventCount(0));
  }, []);

  return (
    <>
      <NavbarUser eventCount={eventCount} />
      {children}
    </>
  );
};

export default Layout;