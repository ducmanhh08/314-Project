import { useState, useEffect } from 'react';
import styles from './SeatSelection.module.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { authFetch } from '../../components/authFetch';

const SeatSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const ticketPrice = location.state?.ticket_price || {};
    const [ticketQuantities, setTicketQuantities] = useState(
        location.state?.ticketQuantities || {}
    );
    const [deliveryMethod, setDeliveryMethod] = useState(
        location.state?.deliveryMethod || 'Mobile Ticket'
    );

    useEffect(() => {
        authFetch(`http://localhost:5000/event/${id}`)
            .then(res => {
                if (res.status === 401) {
                    navigate('/login');
                    return null;
                }
                return res.json();
            })
            .then(data => {
                if (data) setEvent(data);
            })
            .catch(() => setEvent(null));
    }, [id, navigate]);

    useEffect(() => {
        if (event && event.ticket_price && Object.keys(ticketQuantities).length === 0) {
            const initialQuantities = {};
            Object.keys(event.ticket_price).forEach(key => {
                initialQuantities[key] = 0;
            });
            setTicketQuantities(initialQuantities);
        }
    }, [event]);

    const ticketTypes = event && event.ticket_price
        ? Object.entries(event.ticket_price).map(([label, info]) => ({
            label,
            price: info.price,
            key: label,
            refundable: info.refundable,
        }))
        : [];

    const handleNext = () => {
        const selectedData = {
            ticketQuantities,
            deliveryMethod,
            ticketTypes,
            eventImage: event.image_url,
            eventTitle: event.title,
            eventDate: event.date,
            eventId: event.id,
        };
        navigate('./confirmation', { state: selectedData });
    };

    const deliveryFees = {
        'Mobile Ticket': 1.5,
        'PDF': 1.0,
        'Print at Home': 0,
    };

    const handleQuantityChange = (key, delta) => {
        setTicketQuantities((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta),
        }));
    };

    const selectedTickets = ticketTypes.filter(t => ticketQuantities[t.key] > 0);
    const ticketTotal = selectedTickets.reduce(
        (sum, t) => sum + t.price * ticketQuantities[t.key],
        0
    );
    const deliveryMethodPrice = deliveryFees[deliveryMethod] || 0;
    const calculateTotal = () => ticketTotal + deliveryMethodPrice;
    const hasSelectedTicket = Object.values(ticketQuantities).some(qty => qty > 0);
    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles['seat-selection-container']}>
            <h2>Seat Selection</h2>

            <div className={styles['progress-bar']}>
                <div className={`${styles['step']} ${styles['active']}`}>Seat Selection</div>
                <div className={styles['step']}>Confirmation</div>
                <div className={styles['step']}>Payment</div>
                <div className={styles['step']}>Finish</div>
            </div>

            <div className={styles['content-wrapper']}>
                <img src={
                    event.image_url.startsWith('/images/events/')
                        ? event.image_url
                        : `http://localhost:5000${event.image_url}`
                } alt="Event Poster" className={styles['event-poster']} />

                <div className={styles['seat-summary']}>
                    <div className={styles['seat-map']}>
                        <img src="/images/seat-plan.jpg" alt="Seat Map" />
                    </div>

                    <div className={styles['pricing-and-delivery']}>
                        <div className={styles['ticket-pricing']}>
                            <h3>Ticket Pricing</h3>
                            {ticketTypes.map(({ label, price, key }) => (
                                <div key={key} className={styles['ticket-row']}>
                                    <span>{label}</span>
                                    <span>${price.toLocaleString()}</span>
                                    <button onClick={() => handleQuantityChange(key, -1)}>-</button>
                                    <span>{ticketQuantities[key]}</span>
                                    <button onClick={() => handleQuantityChange(key, 1)}>+</button>
                                </div>
                            ))}
                        </div>

                        <div className={styles['delivery-section']}>
                            <h4>Delivery Method</h4>
                            <select
                                value={deliveryMethod}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            >
                                <option>Mobile Ticket</option>
                                <option>PDF</option>
                                <option>Print at Home</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles['order-summary']}>
                        <h3>Order Summary</h3>
                        {selectedTickets.length > 0 ? (
                            <>
                                {selectedTickets.map(({ label, price, key }) => (
                                    <div key={key} className={styles['summary-row']}>
                                        <span>{label} x {ticketQuantities[key]}</span>
                                        <span>${(price * ticketQuantities[key]).toLocaleString()}</span>
                                    </div>
                                ))}

                                {deliveryMethodPrice > 0 && (
                                    <div className={styles['summary-row']}>
                                        <span>Delivery Fee ({deliveryMethod})</span>
                                        <span>${deliveryMethodPrice.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className={styles['summary-total']}>
                                    <strong>Total:</strong>
                                    <strong>${calculateTotal().toLocaleString()}</strong>
                                </div>
                            </>
                        ) : (
                            <p className={styles['empty-summary']}>
                                Your order summary will appear here once you select tickets.
                            </p>
                        )}
                    </div>
                </div>

                <button className={styles['next-button']} onClick={handleNext} disabled={!hasSelectedTicket} >Next</button>
            </div>
        </div>
    )
};

export default SeatSelection;