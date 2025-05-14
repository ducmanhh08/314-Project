import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
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
        eventTitle = 'Weekend with ADELE',
        eventDate = '26 March 2025 (Sat), 18:00',
    } = location.state || {};

    const [isRefundable, setIsRefundable] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeConditions, setAgreeConditions] = useState(false);

    const selectedTickets = Object.entries(ticketQuantities).filter(([_, qty]) => qty > 0);
    const subtotal = selectedTickets.reduce((sum, [key, qty]) => sum + prices[key] * qty, 0);
    const deliveryCost = deliveryFees[deliveryMethod] || 0;
    const refundableFee = isRefundable ? 6.72 : 0;
    const total = subtotal + deliveryCost + refundableFee;
    const isSubmitEnabled = agreeTerms && agreeConditions;

    return (
        <div className="payment-container">
            <NavbarUser />

            <div className="progress-bar">
                <div className="step completed">Seat Selection</div>
                <div className="step completed">Confirmation</div>
                <div className="step active">Payment</div>
                <div className="step">Finish</div>
            </div>

            <div className="order-summary-box">
                <div className="summary-inner">
                    <img src="/images/adele.jpg" alt="Event Poster" className="payment-event-img" />
                    <div className="summary-details">
                        <h2 className="section-title-center">Order Summary</h2>
                        {selectedTickets.map(([key, qty]) => (
                            <div key={key}>
                                <span>{ticketTypes[key]} — Qty: {qty}</span>
                                <span className="price">${(prices[key] * qty).toLocaleString()}</span>
                            </div>
                        ))}
                        <div>
                            <span>Delivery: {deliveryMethod}</span>
                            <span className="price">${deliveryCost.toFixed(2)}</span>
                        </div>
                        {isRefundable && (
                            <div>
                                <span>Refundable Ticket</span>
                                <span className="price">${refundableFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="total-line">
                            <strong>Total:</strong>
                            <strong>${total.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="refundable-section">
                <h3 className="section-title-center">Refundable Ticket</h3>
                <p>
                    Upgrade your booking for just <strong>$6.72</strong> and receive a 100% refund
                    if you cannot attend for one of the many reasons in our <a href="#">Terms & Conditions</a>.
                </p>
                <div className="radio-group">
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

            <div className="payment-method-section">
            <h3 className="section-title-center">Select Payment Method</h3>

            <div className="payment-options">
                <button className="payment-icon-button">Credit Card</button>
                <img
                src="/images/afterpay.jpg"
                alt="Afterpay"
                className="payment-icon"
                onClick={() => setSelectedMethod('afterpay')}
                />
                <img
                src="/images/paypal.jpg"
                alt="PayPal"
                className="payment-icon"
                onClick={() => setSelectedMethod('paypal')}
                />
            </div>

            <div className="checkboxes">
                <label>
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                By continuing to payment, you agree to our Terms, Privacy Policy, and Collection Statement.
                </label>
                <label>
                <input type="checkbox" checked={agreeConditions} onChange={(e) => setAgreeConditions(e.target.checked)} />
                I have read and agree to the event’s terms and conditions.
                </label>
            </div>
            </div>


            <div className="button-group">
                <button onClick={() => navigate(-1)}>Back</button>
                <button disabled={!isSubmitEnabled}>Submit Payment</button>
            </div>
        </div>
    );
};

export default Payment;
