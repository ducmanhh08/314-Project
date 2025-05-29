import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';

const ticketTypes = {
    vip: 'Front Orchestra',
    premium: 'Rear Orchestra',
    gold: 'First Mezzanine',
    silver: 'Second Mezzanine',
    bronze: 'Restricted View',
};

const prices = {
    vip: 3800,
    premium: 2900,
    gold: 2200,
    silver: 1600,
    bronze: 1200,
};

const deliveryFees = {
    'Mobile Ticket': 17.8,
    'PDF': 7.2,
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

    // const selectedTickets = Object.entries(ticketQuantities).filter(([_, qty]) => qty > 0);
    // const subTotal = selectedTickets.reduce((sum, [key, qty]) => sum + prices[key] * qty, 0);
    const selectedTickets = ticketTypes.filter(t => ticketQuantities[t.key] > 0);
    const subTotal = selectedTickets.reduce((sum, t) => sum + t.price * ticketQuantities[t.key], 0);
    const deliveryCost = deliveryFees[deliveryMethod] || 0;
    const total = subTotal + deliveryCost;
    


    return (
        // #region Code before CSS Module
        // <div className="confirmation-container">
        //     <NavbarUser />

        //     <div className="progress-bar">
        //         <div className="step completed">Seat Selection</div>
        //         <div className="step active">Confirmation</div>
        //         <div className="step">Payment</div>
        //         <div className="step">Finish</div>
        //     </div>

        //     <h2 className="section-title">Order Summary</h2>

        //     <div className="summary-wrapper">
        //         <div className="summary-left">
        //             <img src="/images/adele.jpg" alt="Event Poster" className="event-image" />
        //             <h3 className="event-title">Weekend with ADELE</h3>
        //             <p className="event-date">26 March 2025 (Sat), 18:00</p>
        //         </div>

        //         <div className="summary-right">
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>TYPE</th>
        //                         <th>QTY</th>
        //                         <th>PRICE</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {selectedTickets.map(([key, qty]) => (
        //                         <tr key={key}>
        //                             <td>{ticketTypes[key]}</td>
        //                             <td>{qty}</td>
        //                             <td>${(prices[key] * qty).toLocaleString()}</td>
        //                         </tr>
        //                     ))}
        //                     {deliveryMethod && (
        //                         <tr>
        //                             <td colSpan="2">Delivery: {deliveryMethod}</td>
        //                             <td>${deliveryCost.toFixed(2)}</td>
        //                         </tr>
        //                     )}
        //                     <tr className="total-row">
        //                         <td colSpan="2"><strong>Total</strong></td>
        //                         <td><strong>${total.toLocaleString()}</strong></td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>

        //     <div className="button-group">
        //         <button onClick={() => navigate(-1)}>Back</button>
        //         <button onClick={() => navigate('./payment', {
        //         state: { ticketQuantities, deliveryMethod, subTotal, deliveryCost, total }
        //         })}>Next</button>
        //     </div>
        // </div>
        // #endregion
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
                            eventImage.startsWith('/')
                                ? `http://localhost:5000${eventImage}`
                                : eventImage
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
                                eventImage,
                                eventTitle,
                                eventDate,
                            },
                            replace: true // optional: prevents duplicate history entries
                        })
                    }
                > Back </button>
                <button onClick={() => navigate('./payment', {
                    state: { ticketQuantities, deliveryMethod, ticketTypes, subTotal, deliveryCost, total, eventImage, eventTitle, eventDate, eventId, isRefundable }
                })}>Next</button>
            </div>
        </div>
    );
};

export default Confirmation;
