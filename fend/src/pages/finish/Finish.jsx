import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Finish.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';


const Finish = () => {
    const navigate = useNavigate();
    return (
        //#region Code before CSS Module
        // <div className="finish-page">
        //     <NavbarUser />

        //     <div className="progress-bar">
        //         <div className="step completed">Seat Selection</div>
        //         <div className="step completed">Confirmation</div>
        //         <div className="step completed">Payment</div>
        //         <div className="step active">Finish</div>
        //     </div>

        //     <div className="success-box">
        //         <img src="/images/checkmark.jpg" alt="Success Checkmark" className="success-check" />
        //         <h2>Payment Succeeded</h2>
        //         <p>Thanks for your purchase! A payment from Ticket Please will appear on your statement.</p>

        //         <button className="explore-btn" onClick={() => navigate('/homepage')}>
        //             Explore More
        //         </button>
        //     </div>
        // </div>
        //#endregion
        <div className={styles['finish-page']}>

            <div className={styles['progress-bar']}>
                <div className={`${styles['step']} ${styles['completed']}`}>Seat Selection</div>
                <div className={`${styles['step']} ${styles['completed']}`}>Confirmation</div>
                <div className={`${styles['step']} ${styles['completed']}`}>Payment</div>
                <div className={`${styles['step']} ${styles['active']}`}>Finish</div>
            </div>

            <div className={styles['success-box']}>
                <img src="/images/checkmark.jpg" alt="Success Checkmark" className={styles['success-check']} />
                <h2>Payment Succeeded</h2>
                <p>Thanks for your purchase! A payment from Ticket Please will appear on your statement.</p>

                <button className={styles['explore-btn']} onClick={() => navigate('/homepage')}>
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default Finish;
