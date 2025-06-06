import { useEffect, useState } from 'react';
import styles from './EventDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EventDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/event/${id}`)
            .then(res => {return res.json();})
            .then(data => {setEvent(data);});
    }, [id]);

    if (!event) {
        return (
            <div>
                <div className={styles['event-detail-container']}>
                    <p>Loading event details...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles['event-detail-container']}>
                <div className={styles['poster-container']}>
                    <img
                        src={event.image_url?.startsWith('/images/events/') ? event.image_url : `${API_BASE_URL}${event.image_url}`}
                        alt="Event Poster"
                        className={styles['event-poster']}
                    />
                </div>

                <h1>{event.title}</h1>

                <div className={styles['event-info']}>
                    <table>
                        <thead>
                            <tr>
                                <th>Event Date & Time</th>
                                <th>Event Name</th>
                                <th>Venue Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{new Date(event.date).toLocaleString()}</td>
                                <td>{event.title}</td>
                                <td>{event.location}</td>
                                <td>
                                    <button
                                        className={styles['find-ticket-btn']}
                                        onClick={() => {
                                            const token = sessionStorage.getItem("token") || localStorage.getItem("token");
                                            if (!token) {
                                                navigate("/login");
                                                return;
                                            }
                                            navigate(`/homepage/event/${event.id}/seat-selection`, {
                                                state: {
                                                    image: event.image_url?.startsWith('http')
                                                        ? event.image_url
                                                        : `${API_BASE_URL}${event.image_url}`,
                                                    title: event.title,
                                                    date: event.date,
                                                }
                                            })
                                        }}
                                    >
                                        Find Tickets
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles['event-details']}>
                    <h2>Event Details</h2>
                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>

                <div className={styles['ticket-section']}>
                    <div className={styles['pricing-container']}>
                        <div className={styles['pricing-list']}>
                            <h2>Ticket Pricing</h2>
                            {event.ticket_price && Object.entries(event.ticket_price).length > 0 ? (
                                Object.entries(event.ticket_price).map(([type, info]) => (
                                    <div className={styles['category-price']} key={type}>
                                        <span className={styles['tier']}>{type}</span>
                                        <span className={styles['price']}>
                                            {info.refundable && (
                                                <span className={styles['refundable']} style={{ color: 'green', fontSize: '0.9em', marginRight: 15, fontWeight: 300 }}>
                                                    (Refundable)
                                                </span>
                                            )}
                                            ${info.price}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div>No ticket types available.</div>
                            )}
                        </div>
                        <div className={styles['seat-plan']}>
                            <img
                                src="/images/seat-plan.jpg"
                                alt="Seat Plan"
                                className={styles['seat-plan-image']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};;

export default EventDetail;