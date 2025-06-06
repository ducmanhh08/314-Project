import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import styles from './RefundRequest.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const RefundRequest = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [refundInfo, setRefundInfo] = useState(null);
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [agreed, setAgreed] = useState(false);
    const { fetchTicketCount } = useOutletContext();

    useEffect(() => {
        const stored = localStorage.getItem('refundableTicket');
        if (stored) {
        setRefundInfo(JSON.parse(stored));
        }
    }, []);

    const handleSubmit = async () => {
        if (!agreed) return;
        try {
            // Call Flask backend to delete the ticket
            const response = await fetch(`${API_BASE_URL}/ticket/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                if (fetchTicketCount) fetchTicketCount(); 
                alert('Your refund request has been sent!');
                navigate('/homepage/my-tickets');
            } else {
                alert('Failed to delete ticket.');
            }
        } catch (error) {
            alert('There was an error processing your refund.');
        }
    };

    return (
        // #region Code before CSS Module
        // <div className="refund-request-page">
        //     <NavbarUser />
        //     <div className="content">
        //         <a href="#" className="back-link" onClick={e => { e.preventDefault(); navigate('/homepage'); }}>← Homepage</a>
        //         <h2 className="refund-title">Refund Request</h2>

        //         <div className="refund-table">
        //             <div><strong>Email</strong></div>
        //             <div><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>

        //             <div><strong>Event</strong></div>
        //             <div>{refundInfo?.eventTitle}</div>

        //             <div><strong>Date</strong></div>
        //             <div>{refundInfo?.eventDate}</div>

        //             <div><strong>Original Payment</strong></div>
        //             <div>${(refundInfo?.subtotal || 0).toLocaleString()}</div>

        //             <div><strong>Purchased Tickets</strong></div>
        //             <div>
        //                 {refundInfo?.selectedTickets?.map(([key, qty]) => (
        //                 <div key={key}>x{qty} {key.replace(/^\w/, c => c.toUpperCase())} Package</div>
        //                 ))}
        //             </div>

        //             <div><strong>Refund Amount</strong></div>
        //             <div>${(refundInfo?.refundAmount || 0).toLocaleString()}</div>
        //         </div>

        //         <div className="comment-section">
        //         <label>Refund Reason</label>
        //         <textarea
        //             placeholder="Optional comment"
        //             value={comment}
        //             onChange={e => setComment(e.target.value)}
        //         />
        //         <input type="file" />
        //         </div>

        //         <p className="refund-policy">
        //         Refunds can take up to several days to process. All tickets in this order will be cancelled. 
        //         We cannot issue partial refunds or refund to a different account. You must agree to proceed.
        //         </p>

        //         <label className="agree-checkbox">
        //         <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        //         I have read and agree to refund policy.
        //         </label>

        //         <button className="send-request-btn" onClick={handleSubmit} disabled={!agreed}>
        //         Send request
        //         </button>
        //     </div>
        // </div>
        // #endregion
        <div className={styles['refund-request-page']}>
            <div className={styles['content']}>
                <a href="#" className={styles['back-link']} onClick={e => { e.preventDefault(); navigate('/homepage'); }}>← Homepage</a>
                <h2 className={styles['refund-title']}>Refund Request</h2>

                <div className={styles['refund-table']}>
                    <div><strong>Email</strong></div>
                    <div><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>

                    <div><strong>Event</strong></div>
                    <div>{refundInfo?.eventTitle}</div>

                    <div><strong>Date</strong></div>
                    <div>{refundInfo?.registration_date ? new Date(refundInfo.registration_date).toLocaleString() : ''}</div>

                    <div><strong>Original Payment</strong></div>
                    <div>${(refundInfo?.subtotal || 0).toLocaleString()}</div>

                    <div><strong>Purchased Tickets</strong></div>
                    <div>
                        {/* {refundInfo?.selectedTickets?.map(([key, qty]) => (
                        <div key={key}>x{qty} {key.replace(/^\w/, c => c.toUpperCase())} Package</div>
                        ))} */}
                    </div>

                    <div><strong>Refund Amount</strong></div>
                    <div>${(refundInfo?.subtotal || 0).toLocaleString()}</div>
                </div>

                <div className={styles['comment-section']}>
                <label>Refund Reason</label>
                <textarea
                    placeholder="Optional comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <input type="file" />
                </div>

                <p className={styles['refund-policy']}>
                Refunds can take up to several days to process. All tickets in this order will be cancelled. 
                We cannot issue partial refunds or refund to a different account. You must agree to proceed.
                </p>

                <label className={styles['agree-checkbox']}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                I have read and agree to refund policy.
                </label>

                <button className={styles['send-request-btn']} onClick={handleSubmit} disabled={!agreed}>
                Send request
                </button>
            </div>
        </div>
    );
};

export default RefundRequest;
