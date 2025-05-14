import React from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import './WaitingList.css';
//run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const WaitingList = () => {
    return (
        <div>
            <NavbarUser/>

            <div className="event-detail-container">
                <button className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div className="poster-container">
                    <img
                        src="/images/pottery.jpg"
                        alt="Event Poster"
                        className="event-poster"
                    />
                </div>

                <div className="event-info">
                    
                    <p className="event-date">Sunday, 10 September 2024</p>
                    <h2 className="event-title">POTTERY WORKSHOP</h2>
                    <p className="event-description">
                        Get your hands dirty and your creativity flowing in our relaxing pottery class — perfect for beginners and curious souls alike. All materials included, and you'll leave with a handmade piece of your own.
                    </p>

                    <div className="date-time-section">
                        <h3>Date and Time</h3>
                        <div className="date-time-details">
                            <FontAwesomeIcon icon={faCalendar} />
                            <p>Sunday, 10 September 2024 10 am - 12pm</p>
                        </div>
                    </div>

                    <div className="event-actions">
                        <div className="price-tag">FREE</div>
                        <button className="join-waiting-list-button">JOIN WAITING LIST</button>
                    </div>

                </div>
            </div>
        </div>
    );
};;

export default WaitingList;