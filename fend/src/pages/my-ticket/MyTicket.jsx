import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../../components/Navbar/NavbarUser.jsx';
import styles from './MyTicket.module.css';

const MyTickets = () => {
  const navigate = useNavigate();
  return (
    // #region Code before CSS Module
    // <div className="my-tickets-page">
    //   <NavbarUser />
    //   <div className="content">
    //     <a href="#" className="back-link" onClick={e => { e.preventDefault(); navigate('/homepage'); }}>← Homepage</a>
    //     <h2>My Tickets</h2>

    //     <div className="ticket-card">
    //       <img src="/images/adele.jpg" alt="Weekend with Adele" />
    //       <div className="ticket-details">
    //         <h3>Weekend with ADELE</h3>
    //         <p>26 March 2025 (Sat.) 18.00</p>
    //         <p>The Colosseum Theater at Caesars Palace</p>
    //         <p>x1 VIP Diamond Package</p>
    //       </div>  
    //       <div className="buttons">
    //           <button onClick={() => navigate('/homepage/my-tickets/event/:id')}>View Event Detail</button>
    //           <button onClick={() => navigate('/homepage/my-tickets/refund-request')}>Request a Refund</button>
    //       </div>
    //     </div>

    //     <div className="ticket-card">
    //       <img src="/images/pottery.jpg" alt="Pottery Workshop" />
    //       <div className="ticket-details">
    //         <h3>POTTERY WORKSHOP</h3>
    //         <p>Sunday, 10 September 2024</p>
    //         <p>10 am - 12pm</p>
    //         <p>x1 General Admission</p>
    //       </div>  
    //         <div className="buttons">
    //           <button onClick={() => navigate('/homepage/my-tickets/waiting-list')}>Waiting List</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // #endregion
    <div className={styles['my-tickets-page']}>
      <NavbarUser />
      <div className={styles['content']}>
        <a href="#" className={styles['back-link']} onClick={e => { e.preventDefault(); navigate('/homepage'); }}>← Homepage</a>
        <h2>My Tickets</h2>

        <div className={styles['ticket-card']}>
          <img src="/images/adele.jpg" alt="Weekend with Adele" />
          <div className={styles['ticket-details']}>
            <h3>Weekend with ADELE</h3>
            <p>26 March 2025 (Sat.) 18.00</p>
            <p>The Colosseum Theater at Caesars Palace</p>
            <p>x1 VIP Diamond Package</p>
          </div>
          <div className={styles['buttons']}>
            <button onClick={() => navigate('/homepage/my-tickets/event/:id')}>View Event Detail</button>
            <button onClick={() => navigate('/homepage/my-tickets/refund-request')}>Request a Refund</button>
          </div>
        </div>

        <div className={styles['ticket-card']}>
          <img src="/images/pottery.jpg" alt="Pottery Workshop" />
          <div className={styles['ticket-details']}>
            <h3>POTTERY WORKSHOP</h3>
            <p>Sunday, 10 September 2024</p>
            <p>10 am - 12pm</p>
            <p>x1 General Admission</p>
          </div>
          <div className={styles['buttons']}>
            <button onClick={() => navigate('/homepage/my-tickets/waiting-list')}>Waiting List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;