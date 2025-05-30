import React, { useState } from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import styles from './WaitingList3.module.css';
import { useNavigate } from 'react-router-dom';
//run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const WaitingList3 = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    // State to manage the count of tickets
    const [count, setCount] = useState(0);

    const handleDecrement = () => {
        if (count > 0) setCount(count - 1);
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };
    return (
        <div>
            <NavbarUser />
            <div className={styles['event-detail-container-3']}>
                <button className={styles['back-button-3']} onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {/* LEFT COLUMN: TEXT */}
                <div className={styles['text-section-3']}>
                    <h1 className={styles['title-3']}>POTTERY WORKSHOP</h1>
                    <p className={styles['date-3']}>
                        <FontAwesomeIcon icon={faCalendar} className={styles['icon-spacing']} />
                        Sunday, 10 September 2024
                        10am – 12pm
                    </p>
                    <p className={styles['disclaimer-3']}>
                        By clicking "Join Waitlist", I accept the{" "}
                        <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and have read the{" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.<br />
                        I agree that <strong>Ticket Please?</strong> may{" "}
                        <a href="/info-sharing" target="_blank" rel="noopener noreferrer">share my information</a> with the event organizer.
                    </p>
                    <h2 className={styles['contact-title-3']}>Contact Information</h2>

                    <form className={styles['contact-form-3']}>
                        <div className={styles['name-fields']}>
                            <div className={styles['input-wrapper']}>
                                <label>
                                    First Name <span className={styles['required']}>*</span>
                                </label>
                                <input type="text" name="firstName" />
                            </div>

                            <div className={styles['input-wrapper']}>
                                <label>
                                    Last Name <span className={styles['required']}>*</span>
                                </label>
                                <input type="text" name="lastName" />
                            </div>
                        </div>

                        <div className={`${styles['input-wrapper']} ${styles['long']}`}>
                            <label>
                                Email <span className={styles['required']}>*</span>
                            </label>
                            <input type="email" name="email" />
                        </div>

                        <div className={`${styles['input-wrapper']} ${styles['long']}`}>
                            <label>
                                Phone Number <span className={styles['required']}>*</span>
                            </label>
                            <input type="tel" name="phone" />
                        </div>
                    </form>
                    <p className={styles['waitlist-disclaimer-3']}>
                        Ticket availability is determined by the event organizer. Being added to the waitlist does not guarantee
                        that you will be able to purchase a ticket in the future. Each waitlist entry only allows you to purchase
                        an individual ticket when the event organizer releases ticket.
                    </p>
                </div>

                {/* RIGHT COLUMN: IMAGE */}
                <div className={styles['poster-container-3']}>
                    <img
                        src="/images/pottery.jpg"
                        alt="Event Poster"
                        className={styles['event-poster-3']}
                    />

                    {/* ✅ ORDER SUMMARY GOES DIRECTLY BELOW IMAGE */}
                    <div className={styles['order-summary-3']}>
                        <h3 className={styles['order-title-3']}>Order Summary</h3>
                        <div className={styles['order-details-3']}>
                            <div>1 x Waitlist Entry</div>
                            <div>A$0.00</div>
                        </div>
                        <div className={`${styles['order-details-3']} ${styles['total']}`}>
                            <strong>Total</strong>
                            <strong>A$0.00</strong>
                        </div>
                        <button className={styles['checkout-btn-3']}>CHECKOUT</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WaitingList3