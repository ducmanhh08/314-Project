import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './CancelEvents.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';

const CancelEvents = () => {
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [event, setEvent] = useState(null);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');

  const handleCancel = async () => {
    if (!reason || !explanation.trim()) {
      alert('Please provide both a reason and an explanation.');
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this event? This action cannot be undone.")) {
      return;
    }
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        alert('Event cancelled and deleted.');
        window.location.href = '/homepage/my-events'; // or use navigate if using react-router
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to cancel event.');
      }
    } catch (err) {
      alert('Error cancelling event.');
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/event/${eventId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setEvent(data);
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  return (
    <>
    <NavbarUser /> {/* Navbar component */}
      <div className={styles.container}> {/* Main container */}
        
        {/* Back to homepage link */}
        <a href="/" className={styles['back-link']}>←</a>

        {/* Section Title */}
        <h2 className={styles.title}>Event Overview</h2>

        {/* Static Event Information */}
        <div className={styles['event-info']}>
          <p><strong>Event Name:</strong> Annual Tech Conference 2025</p>
          <p><strong>Date & Time:</strong> 20 November 2025, 9:00 AM</p>
          <p><strong>Location:</strong> Sydney Convention Center</p>
        </div>

        {/* Informational text about notifications and refunds */}
        <div className={styles['info-text']}>
          <h4 className={styles['notify-title']}>Notify Attendees</h4>
          <p className={styles['notification-text']}>
          By canceling this event, attendees will receive notification via email.
          </p>
        </div>
        
        {/* Dropdown for cancellation reason */}
        <div className={styles.section}>
          <label><strong>Cancellation Reason</strong></label><br />
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={styles.select}
          >
            <option value="">–Select reasons–</option>
            <option value="low_tickets">Low ticket sales</option>
            <option value="unforeseen">Unforeseen circumstances</option>
            <option value="venue_issues">Venue issues</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Textarea for explanation input */}
        <div className={styles.section}>
          <textarea
            className={styles.textarea}
            placeholder="Please provide a brief explanation for canceling this event."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        {/* Informational text about notifications and refunds */}
        <div className={styles['info-text']}>
          <h4 className={styles['refund-title']}>Refund Handling</h4>
          <p className="refund-text">
          Refunds will be initiated automatically via payment gateway.
          </p>
        </div>

        {/* Warning block with icon and message */}
        <div className={styles.warning}>
          <span className={styles['warning-icon']}>⚠️</span>
          <p><strong>Are you sure you want to cancel this event? This action cannot be undone.</strong></p>
        </div>

        {/* Row of action buttons */}
        <div className={styles['button-row']}>
          <button className={styles['back-btn']}>Back</button>
          <button className={styles['cancel-btn']} onClick={handleCancel}>Cancel Event</button>
        </div>
      </div>
    </>
    );
  };

export default CancelEvents;
