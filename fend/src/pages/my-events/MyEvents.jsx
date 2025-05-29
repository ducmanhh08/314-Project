import React, { useEffect, useState } from 'react';
import styles from './MyEvents.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            // const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/my_events');
            //     , {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // });
            const data = await response.json();
            setEvents(data);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        // #region Code before CSS Module
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
        // #endregion
        <div>
            <div className={styles['my-events-container']}>
                <div className={styles['back-button']}>
                    <Link to="/homepage" className={styles['back-button']}>
                        <FaArrowLeft /> <span>Homepage</span>
                    </Link>
                </div>
                <h2>My Events</h2>
                {/* <div className={styles['event-card']}>
                    <div className={styles['event-images']}>
                        <img src="/images/techspo.jpg" alt="Techspo" />
                    </div>

                    <div className={styles['event-details']}>
                        <h3>Annual Tech Conference</h3>
                        <p>20 November 2025</p>
                        <p>Sydney Convention Center</p>
                    </div>

                    <div className={styles['event-actions']}>
                        <button onClick={() => navigate('/homepage/my-events/attendee')}>View Participants</button>
                        <button onClick={() => navigate('/homepage/my-events/finnace-report')}>View Finance</button>
                        <button className={styles['cancel']} onClick={() => navigate('/homepage/my-events/cancel-events')}>Cancel Events</button>
                    </div>
                </div> */}
                {loading ? (
                    <p>Loading...</p>
                ) : events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map(event => (
                        event && event.image_url ? (
                            <div className={styles['event-card']} key={event.id}>
                                <div className={styles['event-images']}>
                                    <img src={`http://localhost:5000${event.image_url}`} alt={event.title} />
                                </div>
                                <div className={styles['event-details']}>
                                    <h3>{event.title}</h3>
                                    <p>{new Date(event.date).toLocaleDateString()}</p>
                                    <p>{event.location}</p>
                                </div>
                                <div className={styles['event-actions']}>
                                    {/* <button onClick={() => navigate(`/homepage/my-events/attendee?id=${event.id}`)}>View Participants</button>
                                    <button onClick={() => navigate(`/homepage/my-events/finnace-report?id=${event.id}`)}>View Finance</button>
                                    <button className={styles['cancel']} onClick={() => navigate(`/homepage/my-events/cancel-events?id=${event.id}`)}>Cancel Events</button> */}
                                    <button onClick={() => navigate(`/homepage/my-events/attendee/${event.id}`)}>View Participants</button>
                                    <button onClick={() => navigate(`/homepage/my-events/finnace-report/${event.id}`)}>View Finance</button>
                                    <button className={styles['cancel']} onClick={() => navigate(`/homepage/my-events/cancel-events?id=${event.id}`)}>Cancel Events</button>
                                </div>
                            </div>
                        ) : null
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEvents;
