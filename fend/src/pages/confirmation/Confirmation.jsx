import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';

const deliveryFees = {
    'Mobile Ticket': 1.5,
    'PDF': 1.0,
    'Print at Home': 0,
};

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        ticketQuantities = {},
        deliveryMethod = '',
        ticketTypes = [],
        eventImage = "/images/adele.jpg",
        eventTitle = "Event Title",
        eventDate = "",
        eventId = null,
        isRefundable = false
    } = location.state || {};

    const selectedTickets = ticketTypes.filter(t => ticketQuantities[t.key] > 0);
    const subTotal = selectedTickets.reduce((sum, t) => sum + t.price * ticketQuantities[t.key], 0);
    const deliveryCost = deliveryFees[deliveryMethod] || 0;
    const total = subTotal + deliveryCost;

    return (
        <div className={styles['confirmation-container']}>

            <div className={styles['progress-bar']}>
                <div className={`${styles.step} ${styles.completed}`}>Seat Selection</div>
                <div className={`${styles.step} ${styles.active}`}>Confirmation</div>
                <div className={styles.step}>Payment</div>
                <div className={styles.step}>Finish</div>
            </div>

            <h2 className={styles['section-title']}>Order Summary</h2>

            <div className={styles['summary-wrapper']}>
                <div className={styles['summary-left']}>
                    <img
                        src={
                            eventImage.startsWith('/images/events/')
                                ? eventImage
                                : `http://localhost:5000${eventImage}`
                        } alt="Event Poster" className={styles['event-image']} />
                    <h3 className={styles['event-title']}>{eventTitle}</h3>
                    <p className={styles['event-date']}>
                        {eventDate ? new Date(eventDate).toLocaleString() : ""}
                    </p>
                </div>

                <div className={styles['summary-right']}>
                    <table>
                        <thead>
                            <tr>
                                <th>TYPE</th>
                                <th>QTY</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTickets.map(t => (
                                <tr key={t.key}>
                                    <td>{t.label}</td>
                                    <td>{ticketQuantities[t.key]}</td>
                                    <td>${(t.price * ticketQuantities[t.key]).toLocaleString()}</td>
                                </tr>
                            ))}
                            {deliveryMethod && (
                                <tr>
                                    <td colSpan="2">Delivery: {deliveryMethod}</td>
                                    <td>${deliveryCost.toFixed(2)}</td>
                                </tr>
                            )}
                            <tr className={styles['total-row']}>
                                <td colSpan="2"><strong>Total</strong></td>
                                <td><strong>${total.toLocaleString()}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles['button-group']}>
                <button
                    onClick={() =>
                        navigate('/homepage/event/' + eventId + '/seat-selection', {
                            state: {
                                ticketQuantities,
                                deliveryMethod,
                                ticketTypes,
                                subTotal,
                                deliveryCost,
                                total,
                                eventImage,
                                eventTitle,
                                eventDate,
                                isRefundable,
                                eventId,
                            },
                            replace: true
                        })
                    }
                > Back </button>
                <button onClick={() => navigate('./payment', {
                    state: {
                        ticketQuantities,
                        deliveryMethod,
                        ticketTypes,
                        subTotal,
                        deliveryCost,
                        total,
                        eventImage,
                        eventTitle,
                        eventDate,
                        eventId,
                        isRefundable
                    }
                })}>Next</button>
            </div>
        </div>
    );
};

export default Confirmation;