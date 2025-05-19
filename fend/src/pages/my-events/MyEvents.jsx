import React from 'react';
import './MyEvents.css';
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
        <div>
            <NavbarUser />
            <div className="my-events-container">
                <div className="back-button">
                    <Link to="/" className="back-button">
                        <FaArrowLeft /> <span>Homepage</span>
                    </Link>
                </div>
                <h2>My Events</h2>
                <div className="event-card">
                    <div className="event-images">
                        <img src="/images/techspo.jpg" alt="Techspo" />
                    </div>

                    <div className="event-details">
                        <h3>Annual Tech Conference</h3>
                        <p>20 November 2025</p>
                        <p>Sydney Convention Center</p>
                    </div>

                    <div className="event-actions">
                        <button>View Participants</button>
                        <button>View Finance</button>
                        <button className="cancel">Cancel Events</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
