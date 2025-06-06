import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../components/authFetch';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
    // For toggling status color on selection
    const navigate = useNavigate();
    const [refundStatus, setRefundStatus] = useState('approved');
    const [events, setEvents] = useState([]);
    const [userName, setUserName] = useState('');

    const handleStatusChange = (e) => {
        setRefundStatus(e.target.value);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            navigate('/');
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await authFetch('${API_BASE_URL}/my_events')
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        };
        fetchEvents();

        const fetchUserName = async () => {
            const response = await authFetch('${API_BASE_URL}/me');
            if (response.ok) {
                const data = await response.json();
                setUserName(data.name);
            }
        };
        fetchUserName();
    }, []);

    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= nextMonth;
    });

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <img src="/images/logo-dark.png" alt="Logo" className={styles.logo} onClick={() => navigate('/dashboard')} />
                <a href="" onClick={() => navigate('./my-events')}>My Events</a>
                <a href="#">Ticket Sales</a>
                <a href="#">Refund Request</a>
                <a href="" onClick={() => navigate('./my-info')}>My Profile</a>
                <a className={styles.logout} onClick={handleLogout}>Logout</a>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Welcome Back, {(userName && userName.split(' ')[0]) || "User"}!</h1>
                    <div className={styles["create-event-container"]}>
                        <p>CREATE NEW<br />EVENTS</p>
                        <button className={styles["create-event-button"]} onClick={() => navigate('./create-event')}>
                            <span className={styles["plus-icon"]}>+</span>
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <p>TOTAL EVENTS CREATED</p>
                        <h2>{events.length}</h2>
                    </div>
                    <div className={styles.card}>
                        <p>TICKET SOLD</p>
                        <h2>259</h2>
                    </div>
                    <div className={styles.card}>
                        <p>UPCOMING EVENTS</p>
                        <h2>{upcomingEvents.length}</h2>
                    </div>
                    <div className={styles.card}>
                        <p>PENDING REFUND REQUEST</p>
                        <h2>4</h2>
                    </div>
                </div>

                {/* My Events */}
                <div className={styles.myEvents}>
                    <h2 className={styles.sectionTitle}>My Events</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Event Title</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DJ McQuire World Tour</td>
                                <td>April 21, 2025 - 20:00</td>
                                <td>Upcoming</td>
                                <td><button className={styles.viewButton}>View</button></td>
                            </tr>
                            <tr>
                                <td>Sarah's Workshop</td>
                                <td>May 4, 2025 - 15:00</td>
                                <td>35/300</td>
                                <td><button className={styles.viewButton}>View</button></td>
                            </tr>
                            <tr>
                                <td>John's Gardening Workshop</td>
                                <td>May 15, 2025 - 09:00</td>
                                <td>50/50</td>
                                <td><button className={styles.viewButton}>View</button></td>
                            </tr>
                            <tr>
                                <td>Breakfast Club</td>
                                <td>June 18, 2025 - 07:00</td>
                                <td>Cancelled</td>
                                <td><button className={styles.viewButton}>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Analytics & Refund Request */}
                <div className={styles.analyticsContainer}>
                    <div>
                        <h2 className={styles.sectionTitle}>Ticket Sales Analytics</h2>
                        <img src="/images/analytics.png" alt="Analytics" className={styles.analyticsImage} />
                    </div>
                    <div className={styles.refundRequest}>
                        <h2 className={styles.sectionTitle}>Refund Request</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Attendee</th>
                                    <th>Events</th>
                                    <th>Ticket</th>
                                    <th>Amount</th>
                                    <th>Requested</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sarah Johnson</td>
                                    <td>DJ McQuire World Tour</td>
                                    <td>VIP x 2</td>
                                    <td>$350.00</td>
                                    <td><span className={styles.pending}>Pending</span></td>
                                    <td>
                                        <select
                                            value={refundStatus}
                                            onChange={handleStatusChange}
                                            className={`${styles.statusDropdown} ${refundStatus === 'approved' ? styles.approved : styles.rejected}`}
                                        >
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
