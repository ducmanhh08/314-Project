import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Finish.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';


const Finish = () => {
    const navigate = useNavigate();

    // Simulate sending invoice + e-ticket email on load
    useEffect(() => {
        const sendEmail = async () => {
            try {
                // In production, you'd call your backend email service here
                console.log('📧 Sending invoice and e-ticket to customer email...');

                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('✅ Email sent!');
            } catch (error) {
                console.error('❌ Failed to send email:', error);
            }
        };

        sendEmail();
    }, []);

    return (
        <div className={styles['finish-page']}>
            <NavbarUser />

            <div className={styles['success-box']}>
                <img src="/images/checkmark.jpg" alt="Success Checkmark" className={styles['success-check']} />
                <h2>Payment Succeeded</h2>
                <p>Thanks for your purchase! A payment from Ticket Please will appear on your statement.</p>
                <p>An invoice and e-ticket have been sent to your registered email.</p>

                <div className={styles['button-group']}>
                    <button className={styles['btn']} onClick={() => navigate('/my-tickets')}>
                        View Ticket
                    </button>
                    <button className={styles['btn']} onClick={() => navigate('/homepage')}>
                        Explore More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Finish;
