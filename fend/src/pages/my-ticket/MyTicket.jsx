import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyTicket.module.css';
import { authFetch } from '../../components/authFetch';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ticket-please.onrender.com";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await authFetch(`${API_BASE_URL}/my_tickets`);
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
    <div className={styles['my-tickets-page']}>
      <div className={styles['content']}>
        <a href="/homepage" className={styles['back-link']}>← Homepage</a>
        <h2 className={styles['title']}>My Tickets</h2>
        {sortedTickets.length === 0 && <p className={styles['no-tickets']}>No tickets found.</p>}

        {sortedTickets.map(ticket => (
          <div className={styles['ticket-card']} key={ticket.id}>
            <img
              src={ticket.event_image?.startsWith('/images/events/') ? ticket.event_image : `${API_BASE_URL}${ticket.event_image}`}
              alt={ticket.event_title}
              className={styles['ticket-image']}
            />
            <div className={styles['ticket-details']}>
              <h3 className={styles['event-title']}>{ticket.event_title}</h3>
              <p className={styles['event-date']}>{formatEventDate(ticket.event_date)}</p>
              <p className={styles['event-location']}>{ticket.event_location}</p>
              <p className={styles['ticket-type']}>x{ticket.quantity} {ticket.type}</p>
            </div>
            <div className={styles['buttons']}>
              {/* <button className={styles['view-btn']} onClick={() => navigate(`/homepage/my-tickets/event/${ticket.event_id}`)}>View Event Detail</button> */}
              {ticket.is_refundable && (
                <button className={styles['refund-btn']} onClick={() => navigate(`/homepage/my-tickets/refund-request/${ticket.id}`)}>Request a Refund</button>
              )}
            </div>
          </div>
        ))}

        {/* <div className={styles['ticket-card']}>
          <img src="/images/adele.jpg" alt="Weekend with Adele" className={styles['ticket-image']} />
          <div className={styles['ticket-details']}>
            <h3 className={styles['event-title']}>Weekend with ADELE</h3>
            <p className={styles['event-date']}>26 March 2025 (Sat.) 18.00</p>
            <p className={styles['event-location']}>The Colosseum Theater at Caesars Palace</p>
            <p className={styles['ticket-type']}>x1 VIP Diamond Package</p>
          </div>
          <div className={styles['buttons']}>
            <button className={styles['refund-btn']}>Request a Refund</button>
          </div>
        </div>

        <div className={styles['ticket-card']}>
          <img src="/images/pottery.jpg" alt="Pottery Workshop" className={styles['ticket-image']} />
          <div className={styles['ticket-details']}>
            <h3 className={styles['event-title']}>POTTERY WORKSHOP</h3>
            <p className={styles['event-date']}>Sunday, 10 September 2024</p>
            <p className={styles['event-location']}>10 am - 12pm</p>
            <p className={styles['ticket-type']}>x1 General Admission</p>
          </div>
          <div className={styles['buttons']}>
            <button className={styles['waitlist-btn']}>Waiting List</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyTickets;