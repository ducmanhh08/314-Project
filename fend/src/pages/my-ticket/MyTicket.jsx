import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyTicket.module.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      // const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/my_tickets');
      //     , {
      //     headers: {
      //         'Authorization': `Bearer ${token}`
      //     }
      // });
      const data = await response.json();
      setTickets(data);
      setLoading(false);
    };
    fetchTickets();
  }, []);

  function formatEventDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} (${weekday}.) ${hours}.${mins}`;
  }

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
      <div className={styles['content']}>
        <a href="#" className={styles['back-link']} onClick={e => { e.preventDefault(); navigate('/homepage'); }}>← Homepage</a>
        <h2>My Tickets</h2>
        {tickets.length === 0 && <p>No tickets found.</p>}

        {tickets.map(ticket => (
          <div className={styles['ticket-card']} key={ticket.id}>
            <img src={`http://localhost:5000${ticket.event_image}`} alt={ticket.event_title} />
            <div className={styles['ticket-details']}>
              <h3>{ticket.event_title}</h3>
              <p>{formatEventDate(ticket.event_date)}</p>
              <p>{ticket.event_location}</p>
              <p>x{ticket.quantity} {ticket.type}</p>
            </div>
            <div className={styles['buttons']}>
              <button onClick={() => navigate(`/homepage/my-tickets/event/${ticket.event_id}`)}>View Event Detail</button>
              <button onClick={() => navigate('/homepage/my-tickets/refund-request')}>Request a Refund</button>
            </div>
          </div>
        ))}

        {/* Example static tickets for demonstration */}
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