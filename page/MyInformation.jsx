import React from 'react';
import NavbarUser from './page/NavbarUser.jsx';
import './MyInformation.css';

const MyTickets = () => {
  return (
    <div className="my-tickets-page">
      <NavbarUser />
      <div className="content">
        <a href="#" className="back-link">← Homepage</a>
        <h2>My Tickets</h2>

        <div className="ticket-card">
          <img src="adele.jpg" alt="Weekend with Adele" />
          <div className="ticket-details">
            <h3>Weekend with ADELE</h3>
            <p>26 March 2025 (Sat.) 18.00</p>
            <p>The Colosseum Theater at Caesars Palace</p>
            <p>x1 VIP Diamond Package</p>
            <div className="buttons">
              <button>View Event Detail</button>
              <button>Request a Refund</button>
            </div>
          </div>
        </div>

        <div className="ticket-card">
          <img src="pottery.jpg" alt="Pottery Workshop" />
          <div className="ticket-details">
            <h3>POTTERY WORKSHOP</h3>
            <p>Sunday, 10 September 2024</p>
            <p>10 am - 12pm</p>
            <p>x1 General Admission</p>
            <div className="buttons">
              <button>Waiting List</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;