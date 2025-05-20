import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Finish.css';
import NavbarUser from '../../components/Navbar/NavbarUser';


const Finish = () => {
    const navigate = useNavigate();
    return (
        <div className="finish-page">
            <NavbarUser />

            <div className="progress-bar">
                <div className="step completed">Seat Selection</div>
                <div className="step completed">Confirmation</div>
                <div className="step completed">Payment</div>
                <div className="step active">Finish</div>
            </div>

            <div className="success-box">
                <img src="/images/checkmark.jpg" alt="Success Checkmark" className="success-check" />
                <h2>Payment Succeeded</h2>
                <p>Thanks for your purchase! A payment from Ticket Please will appear on your statement.</p>

                <button className="explore-btn" onClick={() => navigate('/homepage')}>
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default Finish;
