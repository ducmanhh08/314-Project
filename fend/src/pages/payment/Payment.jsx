import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';
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
    PDF: 7.2,
    'Print at Home': 0,
};

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const {
        ticketQuantities = {},
        deliveryMethod = '',
        eventImage = '/images/adele.jpg',
        eventTitle = 'Weekend with ADELE',
        eventDate = '26 March 2025 (Sat), 18:00',
    } = location.state || {};

    const [isRefundable, setIsRefundable] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeConditions, setAgreeConditions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const selectedTickets = Object.entries(ticketQuantities).filter(([_, qty]) => qty > 0);
    const subtotal = selectedTickets.reduce((sum, [key, qty]) => sum + prices[key] * qty, 0);
    const deliveryCost = deliveryFees[deliveryMethod] || 0;
    const refundableFee = isRefundable ? 6.72 : 0;
    const total = subtotal + deliveryCost + refundableFee;
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

    const handleSubmit = () => {
        if (isRefundable) {
            const refundData = {
                originalPayment: total,
                refundAmount: subtotal,
                purchasedTickets: selectedTickets.map(([key, qty]) => `x${qty} ${ticketTypes[key]}`).join(', ')
            };
            localStorage.setItem('refundInfo', JSON.stringify(refundData));
        }
        navigate('./finish');
    };

    const handleCardInput = (e, type) => {
        let value = e.target.value;

        if (type === 'name') {
            value = value.toUpperCase();
            setCardName(value);
        } else if (type === 'number') {
            value = value.replace(/\D/g, '').slice(0, 16); // numbers only, max 16 digits
            const formatted = value.replace(/(.{4})/g, '$1 ').trim(); // group every 4 digits
            setCardNumber(formatted);
        } else if (type === 'expiry') {
            value = value.replace(/[^\d]/g, '');
            if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
            e.target.value = value;
        } else if (type === 'cvv') {
            value = value.replace(/\D/g, '');
            e.target.value = value;
        }
    };


    return (
        <div className={styles['payment-container']}>
            <NavbarUser />

            <div className={styles['progress-bar']}>
                {['Seat Selection', 'Confirmation', 'Payment', 'Finish'].map((step, index) => (
                    <div
                        key={step}
                        className={
                            styles['step'] +
                            (index < 2 ? ' ' + styles['completed'] : '') +
                            (index === 2 ? ' ' + styles['active'] : '')
                        }
                    >
                        {step}
                    </div>
                ))}
            </div>

            <div className={styles['order-summary-box']}>
                <div className={styles['summary-inner']}>
                    <img src={eventImage} alt="Event Poster" className={styles['payment-event-img']} />
                    <div className={styles['summary-details']}>
                        <h2 className={styles['section-title-center']}>Order Summary</h2>
                        {selectedTickets.map(([key, qty]) => (
                            <div key={key}>
                                <span>{ticketTypes[key]} — Qty: {qty}</span>
                                <span className={styles['price']}>${(prices[key] * qty).toLocaleString()}</span>
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
                            <strong>${total.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['refundable-section']}>
                <h3 className={styles['section-title-center']}>Refundable Ticket</h3>
                <p>
                    Upgrade your booking for just <strong>$6.72</strong> and receive a 100% refund
                    if you cannot attend for one of the many reasons in our{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('./refund-policy'); }}>Terms & Conditions</a>.
                </p>
                <div className={styles['radio-group']}>
                    <label>
                        <input type="radio" name="refund" onChange={() => setIsRefundable(true)} />
                        Refundable Ticket
                    </label>
                    <label>
                        <input type="radio" name="refund" checked={!isRefundable} onChange={() => setIsRefundable(false)} />
                        Non-Refundable Ticket
                    </label>
                </div>
            </div>

            <div className={styles['payment-method-section']}>
                <h3 className={styles['section-title-center']}>Select Payment Method</h3>

                <div className={styles['payment-options']}>
                    <img src="/images/credit-card-icon.png" alt="Credit Card" onClick={() => setPaymentMethod('card')} />
                    <img
                        src="/images/afterpay.jpg"
                        alt="Afterpay"
                        onClick={() => {
                            setPaymentMethod('afterpay');
                            alert('Redirecting to Afterpay...');
                            window.location.href = 'https://portal.afterpay.com/checkout';
                        }}
                    />
                    <img
                        src="/images/paypal.jpg"
                        alt="PayPal"
                        onClick={() => {
                            setPaymentMethod('paypal');
                            alert('Redirecting to PayPal...');
                            window.location.href = 'https://www.paypal.com/checkoutnow';
                        }}
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
                            <input
                                type="text"
                                placeholder="NAME ON CARD"
                                value={cardName}
                                onChange={(e) => handleCardInput(e, 'name')}
                            />
                            <input
                                type="text"
                                placeholder="CARD NUMBER"
                                value={cardNumber}
                                onChange={(e) => handleCardInput(e, 'number')}
                            />

                            <div className={styles['card-form-row']}>
                                <input type="text" placeholder="MM/YY" maxLength={5} onInput={(e) => handleCardInput(e, 'expiry')} />
                                <input type="text" placeholder="CVV" maxLength={3} onInput={(e) => handleCardInput(e, 'cvv')} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles['button-group']}>
                <button onClick={() => navigate(-1)}>Back</button>
                <button disabled={!isSubmitEnabled} onClick={handleSubmit}>
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default Payment;