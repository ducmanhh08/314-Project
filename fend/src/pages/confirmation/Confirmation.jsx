import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Confirmation.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';

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
    const { ticketQuantities = {}, deliveryMethod = '' } = location.state || {};

    const selectedTickets = Object.entries(ticketQuantities).filter(([_, qty]) => qty > 0);
    const subTotal = selectedTickets.reduce((sum, [key, qty]) => sum + prices[key] * qty, 0);
    const deliveryCost = deliveryFees[deliveryMethod] || 0;
    const total = subTotal + deliveryCost;

    return (
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
        <div className={styles['confirmation-container']}>
            <NavbarUser />

            <h2 className={styles['section-title']}>Confirm Your Order</h2>

            <div className={styles['progress-bar']}>
                <span className={styles.step}>1. Seat Selection</span>
                <span className={`${styles.step} ${styles.active}`}>2. Confirmation</span>
                <span className={styles.step}>3. Payment</span>
            </div>

            <div className={styles['summary-wrapper']}>
                <div className={styles['summary-left']}>
                    <img src="/images/adele.jpg" alt="Event Poster" className={styles['event-image']} />
                    <p className={styles['event-title']}>The Grand Symphony Orchestra</p>
                    <p className={styles['event-date']}>Friday, 15th March 2025, 7:30 PM</p>
                </div>

                <div className={styles['summary-right']}>
                    <h3>Order Summary</h3>
                    <table className={styles['order-summary-table']}>
                        <thead>
                            <tr>
                                <th>Ticket Type</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTickets.map(([key, qty]) => (
                                <tr key={key}>
                                    <td>{ticketTypes[key]}</td>
                                    <td>{qty}</td>
                                    <td>${(prices[key] * qty).toLocaleString()}</td>
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
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('./payment', {
                state: { ticketQuantities, deliveryMethod, subTotal, deliveryCost, total }
                })}>Next</button>
            </div>
        </div>
    );
};

export default Confirmation;
