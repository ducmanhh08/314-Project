import React from 'react';
import styles from './MyEvents.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';
import {Link} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const MyEvents = () => {
    const navigate = useNavigate();

    const handeBackClick = () => {
    navigate('/');
};

    return (
        // <div>
        //     <NavbarUser />
        //     <div className="my-events-container">
        //         <div className="back-button">
        //             <Link to="/homepage" className="back-button">
        //                 <FaArrowLeft /> <span>Homepage</span>
        //             </Link>
        //         </div>
        //         <h2>My Events</h2>
        //         <div className="event-card">
        //             <div className="event-images">
        //                 <img src="/images/techspo.jpg" alt="Techspo" />
        //             </div>

        //             <div className="event-details">
        //                 <h3>Annual Tech Conference</h3>
        //                 <p>20 November 2025</p>
        //                 <p>Sydney Convention Center</p>
        //             </div>

        //             <div className="event-actions">
        //                 <button onClick={() => navigate('/homepage/my-events/attendee')}>View Participants</button>
        //                 <button onClick={() => navigate('/homepage/my-events/finnace-report')}>View Finance</button>
        //                 <button className="cancel" onClick={() => navigate('/homepage/my-events/cancel-events')}>Cancel Events</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
                <div>
            <NavbarUser />
            <div className={styles.myEventsContainer}>
                <div className={styles.backButton}>
                    <Link to="/homepage" className={styles.backButton}>
                        <FaArrowLeft /> <span>Homepage</span>
                    </Link>
                </div>
                <h2 className={styles.heading}>My Events</h2>
                <div className={styles.eventCard}>
                    <div className={styles.eventImages}>
                        <img src="/images/techspo.jpg" alt="Techspo" />
                    </div>

                    <div className={styles.eventDetails}>
                        <h3>Annual Tech Conference</h3>
                        <p>20 November 2025</p>
                        <p>Sydney Convention Center</p>
                    </div>

                    <div className={styles.eventActions}>
                        <button onClick={() => navigate('/homepage/my-events/attendee')}>View Participants</button>
                        <button onClick={() => navigate('/homepage/my-events/finnace-report')}>View Finance</button>
                        <button className={styles.cancel} onClick={() => navigate('/homepage/my-events/cancel-events')}>Cancel Events</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
