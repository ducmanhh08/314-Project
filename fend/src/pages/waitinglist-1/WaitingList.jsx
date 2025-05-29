import React, { useState } from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import styles from './WaitingList.module.css';
//run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const WaitingList = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={styles['page-wrapper']}></div>
            <NavbarUser />

            <div className={styles['event-detail-container']}>
                <button className={styles['back-button']}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div className={styles['poster-container']}>
                    <img
                        src="/images/pottery.jpg"
                        alt="Event Poster"
                        className={styles['event-poster']}
                    />
                </div>

                <div className={styles['event-info']}>

                    <p className={styles['event-date']}>Sunday, 10 September 2024</p>
                    <h2 className={styles['event-title']}>POTTERY WORKSHOP</h2>
                    <p className={styles['event-description']}>
                        Get your hands dirty and your creativity flowing in our relaxing pottery class — perfect for beginners and curious souls alike.
                        <br></br>
                        All materials included, and you'll leave with a handmade piece of your own.
                    </p>

                    <div className={styles['date-time-section']}>
                        <h3>Date and Time</h3>
                        <div className={styles['date-time-details']}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <p>Sunday, 10 September 2024 10am - 12pm</p>
                        </div>
                    </div>

                    <div className={styles['event-actions']}>
                        <div className={styles['price-tag']}>FREE</div>
                        <button className={styles['join-waiting-list-button']} onClick={() => navigate('/homepage/my-tickets/waiting-list2')}>JOIN WAITING LIST</button>
                    </div>

                </div>
            </div>
        </div>
    );
};;

export default WaitingList;