import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import styles from './PaymentStyles.module.css';
import { authFetch } from '../../components/authFetch';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchTicketCount } = useOutletContext();

    const [isRefundable, setIsRefundable] = useState(location.state?.isRefundable || false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeConditions, setAgreeConditions] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

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

    const selectedTickets = ticketTypes.filter(t => ticketQuantities[t.key] > 0);
    const hasRefundable = selectedTickets.some(t => t.refundable);
    const refundableFee = isRefundable ? 6.50 : 0;
    const totalWithRefundable = total + refundableFee;
    const isSubmitEnabled = agreeTerms && agreeConditions;

    useEffect(() => {
        if (isRefundable) {
            const refundData = { subtotal, selectedTickets, refundAmount: subtotal, eventTitle, eventDate };
            localStorage.setItem('refundableTicket', JSON.stringify(refundData));
        } else {
            localStorage.removeItem('refundableTicket');
        }
    }, [isRefundable, subtotal, selectedTickets, eventTitle, eventDate]);

    const handleSubmit = () => {
        const ticketsToCreate = selectedTickets.map(t => ({
            event_id: eventId,
            type: t.label,
            price: t.price,
            delivery_method: deliveryMethod,
            is_refundable: isRefundable,
            quantity: ticketQuantities[t.key],
        }));

        authFetch(`${API_BASE_URL}/api/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tickets: ticketsToCreate }),
        })
            .then(response => response.json())
            .then(() => {
                if (fetchTicketCount) fetchTicketCount(); // <-- call it here
                navigate('./finish');
            })
            .catch(() => alert('Failed to create tickets!'));
    };

    return (
        <div className={styles.PaymentStyles__container}>
            <div className={styles.PaymentStyles__progressBar}>
                <div className={`${styles.PaymentStyles__step} ${styles.PaymentStyles__stepCompleted}`}>Seat Selection</div>
                <div className={`${styles.PaymentStyles__step} ${styles.PaymentStyles__stepCompleted}`}>Confirmation</div>
                <div className={`${styles.PaymentStyles__step} ${styles.PaymentStyles__stepActive}`}>Payment</div>
                <div className={styles.PaymentStyles__step}>Finish</div>
            </div>

            <div className={styles.PaymentStyles__orderSummary}>
                <div className={styles.PaymentStyles__summaryInner}>
                    <img
                        src={eventImage.startsWith('/images/events/') ? eventImage : `${API_BASE_URL}${eventImage}`}
                        alt="Event Poster"
                        className={styles.PaymentStyles__eventImg}
                    />
                    <div className={styles.PaymentStyles__summaryDetails}>
                        <h2 className={styles.PaymentStyles__sectionTitle}>Order Summary</h2>
                        {selectedTickets.map(t => (
                            <div key={t.key}>
                                <span>{t.label} — Qty: {ticketQuantities[t.key]}</span>
                                <span className={styles.PaymentStyles__price}>${(t.price * ticketQuantities[t.key]).toLocaleString()}</span>
                            </div>
                        ))}
                        <div>
                            <span>Delivery: {deliveryMethod}</span>
                            <span className={styles.PaymentStyles__price}>${deliveryCost.toFixed(2)}</span>
                        </div>
                        {isRefundable && (
                            <div>
                                <span>Refundable Ticket</span>
                                <span className={styles.PaymentStyles__price}>${refundableFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div className={styles.PaymentStyles__totalLine}>
                            <strong>Total:</strong>
                            <strong>${totalWithRefundable.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {hasRefundable && (
                <div className={styles.PaymentStyles__refundable}>
                    <h3 className={styles.PaymentStyles__sectionTitle}>Refundable Ticket</h3>
                    <p>
                        Upgrade your booking for just <strong>$6.50</strong> and receive a 100% refund if you cannot attend for one of the many reasons in our <a href="#" onClick={e => { e.preventDefault(); navigate('./refund-policy'); }}>Terms & Conditions</a>.
                    </p>
                    <div className={styles.PaymentStyles__radioGroup}>
                        <label className={styles.PaymentStyles__radioLabel}>
                            <input
                                className={styles.PaymentStyles__radioInput}
                                type="radio"
                                name="refund"
                                checked={isRefundable}
                                onChange={() => setIsRefundable(true)}
                            />
                            Refundable Ticket
                        </label>
                        <label className={styles.PaymentStyles__radioLabel}>
                            <input
                                className={styles.PaymentStyles__radioInput}
                                type="radio"
                                name="refund"
                                checked={!isRefundable}
                                onChange={() => setIsRefundable(false)}
                            />
                            Non-Refundable Ticket
                        </label>
                    </div>
                </div>
            )}

            <div className={styles.PaymentStyles__paymentSection}>
                <h3 className={styles.PaymentStyles__sectionTitle}>Select Payment Method</h3>
                <div className={styles.PaymentStyles__paymentOptions}>
                    <button
                        className={styles.PaymentStyles__paymentButton}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Credit Card
                    </button>
                    <img
                        src="/images/afterpay.jpg"
                        alt="Afterpay"
                        onCgitlick={() => alert('You will be directed to AfterPay')}
                    />
                    <img
                        src="/images/paypal.jpg"
                        alt="PayPal"
                        onClick={() => alert('You will be directed to PayPal')}
                    />
                    </div>
                <div className={styles.PaymentStyles__checkboxes}>
                    <label className={styles.PaymentStyles__checkboxLabel}>
                        <input
                        className={styles.PaymentStyles__checkboxInput}
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        By continuing to payment, you agree to our Terms, Privacy Policy, and Collection Statement.
                    </label>
                    <label className={styles.PaymentStyles__checkboxLabel}>
                        <input
                        className={styles.PaymentStyles__checkboxInput}
                        type="checkbox"
                        checked={agreeConditions}
                        onChange={(e) => setAgreeConditions(e.target.checked)}
                        />
                        I have read and agree to the event’s terms and conditions.
                    </label>

                    {paymentMethod === 'card' && (
                        <div className={styles.PaymentStyles__cardForm}>
                        <label className={styles.PaymentStyles__cardFormLabel}>Enter your payment details:</label>
                        <input className={styles.PaymentStyles__cardFormInput} type="text" placeholder="Name on card" />
                        <input className={styles.PaymentStyles__cardFormInput} type="text" placeholder="Card number" />
                        <div className={styles.PaymentStyles__cardFormRow}>
                            <input className={styles.PaymentStyles__cardFormInput} type="text" placeholder="MM/YY" maxLength={5} />
                            <input className={styles.PaymentStyles__cardFormInput} type="text" placeholder="CVV" maxLength={4} pattern="\d*" />
                        </div>
                    </div>
                )}
                </div>
            </div>

            <div className={styles.PaymentStyles__buttonGroup}>
                <button className={styles.PaymentStyles__button} onClick={() => navigate(-1)}>Back</button>
                <button className={styles.PaymentStyles__button} disabled={!isSubmitEnabled} onClick={handleSubmit}>
                    Submit Payment
                </button>
            </div>
        </div>
    );
};

export default Payment;
