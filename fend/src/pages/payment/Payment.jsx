import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';
import { useEffect } from 'react';
// import axios from 'axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // if (isRefundable) {
        //     const refundData = {
        //         originalPayment: total,
        //         refundAmount: subtotal,
        //         purchasedTickets: selectedTickets
        //             .map(t => `x${ticketQuantities[t.key]} ${t.label}`)
        //             .join(', ')
        //     };
        //     localStorage.setItem('refundInfo', JSON.stringify(refundData));
        // }
        // navigate('./finish');
        const ticketsToCreate = selectedTickets.map(t => ({
            event_id: eventId,
            user_id: 2, // You need to get this from context/auth/session #TODO: 
            type: t.label,
            price: t.price,
            delivery_method: deliveryMethod,
            is_refundable: isRefundable,
            quantity: ticketQuantities[t.key],
        }));

        fetch('http://localhost:5000/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tickets: ticketsToCreate })
        })
            .then(response => response.json())
            .then(data => {
                navigate('./finish');
            })
            .catch(error => {
                alert('Failed to create tickets!');
            });
    };

    const {
        ticketQuantities = {},
        deliveryMethod = '',
        ticketTypes = [],
        subtotal = 0,
        deliveryCost = 0,
        total = 0,
        eventImage = "/images/adele.jpg",
        eventTitle = "Weekend with ADELE",
        eventDate = '26 March 2025 (Sat), 18:00',
        eventId = null
    } = location.state || {};
    const [isRefundable, setIsRefundable] = useState(location.state?.isRefundable || false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeConditions, setAgreeConditions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const selectedTickets = ticketTypes.filter(t => ticketQuantities[t.key] > 0);
    const hasRefundable = selectedTickets.some(t => t.refundable);
    const refundableFee = isRefundable ? 6.72 : 0;
    const totalWithRefundable = total + (isRefundable ? refundableFee : 0);
    const isSubmitEnabled = agreeTerms && agreeConditions;

    useEffect(() => {
        if (isRefundable) {
            const refundData = {
                subtotal,
                selectedTickets,
                refundAmount: subtotal,
                eventTitle,
                eventDate
            };
            localStorage.setItem('refundableTicket', JSON.stringify(refundData));
        } else {
            localStorage.removeItem('refundableTicket');
        }
    }, [isRefundable, subtotal, selectedTickets, eventTitle, eventDate]);

    return (
        // #region Code before CSS Module
        // <div className="payment-container">
        //     <NavbarUser />

        //     <div className="progress-bar">
        //         <div className="step completed">Seat Selection</div>
        //         <div className="step completed">Confirmation</div>
        //         <div className="step active">Payment</div>
        //         <div className="step">Finish</div>
        //     </div>

        //     <div className="order-summary-box">
        //         <div className="summary-inner">
        //             <img src="/images/adele.jpg" alt="Event Poster" className="payment-event-img" />
        //             <div className="summary-details">
        //                 <h2 className="section-title-center">Order Summary</h2>
        //                 {selectedTickets.map(([key, qty]) => (
        //                     <div key={key}>
        //                         <span>{ticketTypes[key]} — Qty: {qty}</span>
        //                         <span className="price">${(prices[key] * qty).toLocaleString()}</span>
        //                     </div>
        //                 ))}
        //                 <div>
        //                     <span>Delivery: {deliveryMethod}</span>
        //                     <span className="price">${deliveryCost.toFixed(2)}</span>
        //                 </div>
        //                 {isRefundable && (
        //                     <div>
        //                         <span>Refundable Ticket</span>
        //                         <span className="price">${refundableFee.toFixed(2)}</span>
        //                     </div>
        //                 )}
        //                 <div className="total-line">
        //                     <strong>Total:</strong>
        //                     <strong>${total.toLocaleString()}</strong>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="refundable-section">
        //         <h3 className="section-title-center">Refundable Ticket</h3>
        //         <p>
        //             Upgrade your booking for just <strong>$6.72</strong> and receive a 100% refund
        //             if you cannot attend for one of the many reasons in our <a href="#" onClick={e => { e.preventDefault(); navigate('./refund-policy'); }}>Terms & Conditions</a>.
        //         </p>
        //         <div className="radio-group">
        //             <label>
        //                 <input type="radio" name="refund" onChange={() => setIsRefundable(true)} />
        //                 Refundable Ticket
        //             </label>
        //             <label>
        //                 <input type="radio" name="refund" checked={!isRefundable} onChange={() => setIsRefundable(false)} />
        //                 Non-Refundable Ticket
        //             </label>
        //         </div>
        //     </div>

        //     <div className="payment-method-section">
        //         <h3 className="section-title-center">Select Payment Method</h3>

        //         <div className="payment-options">
        //             <img
        //             src="/images/credit-card-icon.png"
        //             alt="Credit Card"
        //             onClick={() => setPaymentMethod('card')}
        //             />
        //             <img
        //             src="/images/afterpay.jpg"
        //             alt="Afterpay"
        //             onClick={() => alert('You will be directed to AfterPay to complete your purchase')}
        //             />

        //             <img
        //             src="/images/paypal.jpg"
        //             alt="PayPal"
        //             onClick={() => alert('You will be directed to PayPal to complete your purchase')}
        //             />
        //         </div>

        //         <div className="checkboxes">
        //             <label>
        //             <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
        //             By continuing to payment, you agree to our Terms, Privacy Policy, and Collection Statement.
        //             </label>
        //             <label>
        //             <input type="checkbox" checked={agreeConditions} onChange={(e) => setAgreeConditions(e.target.checked)} />
        //             I have read and agree to the event’s terms and conditions.
        //             </label>

        //             {paymentMethod === 'card' && (
        //                 <div className="card-form-container">
        //                     <label className="card-form-label">Enter your payment details:</label>
        //                     <input type="text" placeholder="Name on card" />
        //                     <input type="text" placeholder="Card number" />
        //                     <div className="card-form-row">
        //                         <input
        //                             type="text"
        //                             placeholder="MM/YY"
        //                             maxLength={5}                
        //                             onInput={(e) => {
        //                             let value = e.target.value.replace(/[^\d]/g, '');
        //                             if (value.length > 2) {
        //                                 value = value.slice(0, 2) + '/' + value.slice(2, 4);
        //                             }
        //                             e.target.value = value;
        //                             }}
        //                         />
        //                         <input
        //                             type="text"
        //                             placeholder="CVV"
        //                             maxLength={4}
        //                             pattern="\d*"
        //                             onInput={(e) => {
        //                             e.target.value = e.target.value.replace(/\D/g, '');
        //                             }}
        //                         />
        //                     </div>
        //                 </div>
        //             )}
        //         </div>
        //     </div>

        //     <div className="button-group">
        //         <button onClick={() => navigate(-1)}>Back</button>
        //         <button
        //             disabled={!isSubmitEnabled}
        //             onClick={() => {
        //                 handleSubmit(); // Call the first function
        //                 navigate(`./finish`); // Then navigate
        //         }}>
        //         Submit Payment
        //         </button>
        //     </div>
        // </div>
        // #endregion
        <div className={styles['payment-container']}>

            <div className={styles['progress-bar']}>
                <div className={`${styles['step']} ${styles['completed']}`}>Seat Selection</div>
                <div className={`${styles['step']} ${styles['completed']}`}>Confirmation</div>
                <div className={`${styles['step']} ${styles['active']}`}>Payment</div>
                <div className={styles['step']}>Finish</div>
            </div>

            <div className={styles['order-summary-box']}>
                <div className={styles['summary-inner']}>
                    <img
                        src={
                            eventImage.startsWith('/')
                                ? `http://localhost:5000${eventImage}`
                                : eventImage
                        } alt="Event Poster" className={styles['payment-event-img']} />
                    <div className={styles['summary-details']}>
                        <h2 className={styles['section-title-center']}>Order Summary</h2>
                        {selectedTickets.map(t => (
                            <div key={t.key}>
                                <span>{t.label} — Qty: {ticketQuantities[t.key]}</span>
                                <span className={styles['price']}>${(t.price * ticketQuantities[t.key]).toLocaleString()}</span>
                            </div>
                        ))}
                        <div>
                            <span>Delivery: {deliveryMethod}</span>
                            <span className={styles['price']}>${deliveryCost.toFixed(2)}</span>
                        </div>
                        {isRefundable && (
                            <div>
                                <span>Refundable Ticket</span>
                                <span className={styles['price']}>${refundableFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div className={styles['total-line']}>
                            <strong>Total:</strong>
                            <strong>${totalWithRefundable.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>
            {hasRefundable && (
                <div className={styles['refundable-section']}>
                    <h3 className={styles['section-title-center']}>Refundable Ticket</h3>
                    <p>
                        Upgrade your booking for just <strong>$6.72</strong> and receive a 100% refund
                        if you cannot attend for one of the many reasons in our <a href="#" onClick={e => { e.preventDefault(); navigate('./refund-policy'); }}>Terms & Conditions</a>.
                    </p>
                    <div className={styles['radio-group']}>
                        <label>
                            <input type="radio" name="refund" checked={isRefundable} onChange={() => setIsRefundable(true)} />
                            Refundable Ticket
                        </label>
                        <label>
                            <input type="radio" name="refund" checked={!isRefundable} onChange={() => setIsRefundable(false)} />
                            Non-Refundable Ticket
                        </label>
                    </div>
                </div>
            )}

            <div className={styles['payment-method-section']}>
                <h3 className={styles['section-title-center']}>Select Payment Method</h3>

                <div className={styles['payment-options']}>
                    <img
                        src="/images/credit-card-icon.png"
                        alt="Credit Card"
                        onClick={() => setPaymentMethod('card')}
                    />
                    <img
                        src="/images/afterpay.jpg"
                        alt="Afterpay"
                        onClick={() => alert('You will be directed to AfterPay to complete your purchase')}
                    />

                    <img
                        src="/images/paypal.jpg"
                        alt="PayPal"
                        onClick={() => alert('You will be directed to PayPal to complete your purchase')}
                    />
                </div>

                <div className={styles['checkboxes']}>
                    <label>
                        <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                        By continuing to payment, you agree to our Terms, Privacy Policy, and Collection Statement.
                    </label>
                    <label>
                        <input type="checkbox" checked={agreeConditions} onChange={(e) => setAgreeConditions(e.target.checked)} />
                        I have read and agree to the event’s terms and conditions.
                    </label>

                    {paymentMethod === 'card' && (
                        <div className={styles['card-form-container']}>
                            <label className={styles['card-form-label']}>Enter your payment details:</label>
                            <input type="text" placeholder="Name on card" />
                            <input type="text" placeholder="Card number" />
                            <div className={styles['card-form-row']}>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    onInput={(e) => {
                                        let value = e.target.value.replace(/[^\d]/g, '');
                                        if (value.length > 2) {
                                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                        }
                                        e.target.value = value;
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    maxLength={4}
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '');
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles['button-group']}>
                <button onClick={() => navigate('/homepage/event/' + eventId + '/seat-selection/confirmation', {
                    state: {
                        ticketQuantities,
                        deliveryMethod,
                        ticketTypes,
                        subtotal,
                        deliveryCost,
                        total,
                        eventImage,
                        eventTitle,
                        eventDate,
                        isRefundable,
                    },
                    replace: true
                })
                }>Back</button>
                <button
                    disabled={!isSubmitEnabled} onClick={handleSubmit}>
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default Payment;
