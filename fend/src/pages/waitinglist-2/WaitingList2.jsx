import React, { useState } from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import styles from './WaitingList2.module.css';
import { useNavigate } from 'react-router-dom';
//run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const WaitingList2 = () => {
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

            <div className={styles['event-detail-container-2']}>
                <button className={styles['back-button-2']} onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {/* LEFT COLUMN: TEXT */}
                <div className={styles['text-section-2']}>
                    <h1 className={styles['title-2']}>POTTERY WORKSHOP</h1>
                    <p className={styles['date-2']}>
                        <FontAwesomeIcon icon={faCalendar} className={styles['icon-spacing']} />
                        Sunday, 10 September 2024 10am – 12pm
                    </p>

                    <div className={styles['ticket-row']}>
                        <span>General Admission</span>
                        <div className={styles['ticket-controls']}>
                            <button onClick={handleDecrement}>-</button>
                            <span>{count}</span>
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>

                    <div className={styles['status-row']}>
                        <span>Free</span>
                        <span className={styles['sold-out']}>SOLD OUT</span>
                    </div>
                </div>

                {/* RIGHT COLUMN: IMAGE */}
                <div className={styles['poster-container-2']}>
                    <img
                        src="/images/pottery.jpg"
                        alt="Event Poster"
                        className={styles['event-poster-2']}
                        width="400"
                        height="600"
                    />
                </div>
            </div>

            {/* Sticky Button at Bottom */}
            <div className={styles['button-container']}>
                <button className={styles['join-button']} onClick={() => navigate('/homepage/my-tickets/waiting-list3')}>JOIN WAITING LIST</button>
            </div>
        </div>
    );
};

export default WaitingList2;