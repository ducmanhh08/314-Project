import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyTicket.module.css';
import { authFetch } from '../../components/authFetch';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await authFetch('http://localhost:5000/my_tickets');
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

  const sortedTickets = [...tickets].sort(
    (a, b) => new Date(b.registration_date) - new Date(a.registration_date)
  );

  return (
    <div className="my-tickets-page">
      <div className="content">
        <a href="#" className="back-link">← Homepage</a>
        <h2>My Tickets</h2>
        {sortedTickets.length === 0 && <p>No tickets found.</p>}

        {sortedTickets.map(ticket => (
          <div className={styles['ticket-card']} key={ticket.id}>
            <img src={ticket.event_image?.startsWith('/images/events/') ? ticket.event_image : `http://localhost:5000${ticket.event_image}`} alt={ticket.event_title} />
            <div className={styles['ticket-details']}>
              <h3>{ticket.event_title}</h3>
              <p>{formatEventDate(ticket.event_date)}</p>
              <p>{ticket.event_location}</p>
              <p>x{ticket.quantity} {ticket.type}</p>
            </div>
            <div className={styles['buttons']}>
              <button onClick={() => navigate(`/homepage/my-tickets/event/${ticket.event_id}`)}>View Event Detail</button>
              {ticket.is_refundable && (
                <button onClick={() => navigate(`/homepage/my-tickets/refund-request/${ticket.id}`)}>Request a Refund</button>
              )}
            </div>
          </div>
        ))}

        {/* Example static tickets for demonstration */}
        <div className={styles['ticket-card']}>
          <img src="/images/adele.jpg" alt="Weekend with Adele" />
          <div className="ticket-details">
            <h3>Weekend with ADELE</h3>
            <p>26 March 2025 (Sat.) 18.00</p>
            <p>The Colosseum Theater at Caesars Palace</p>
            <p>x1 VIP Diamond Package</p>
          </div>  
          <div className="buttons">
              <button>Request a Refund</button> 
          </div>
        </div>

        <div className="ticket-card">
          <img src="/images/pottery.jpg" alt="Pottery Workshop" />
          <div className="ticket-details">
            <h3>POTTERY WORKSHOP</h3>
            <p>Sunday, 10 September 2024</p>
            <p>10 am - 12pm</p>
            <p>x1 General Admission</p>
          </div>  
            <div className="buttons">
              <button>Waiting List</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;