import React, { useState } from 'react';
import './CancelEvents.css'; // External CSS import
import NavbarUser from '../../components/Navbar/NavbarUser';

const CancelEvents = () => {
  const [reason, setReason] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleCancel = () => {
    if (!reason || !explanation.trim()) {
      alert('Please provide both a reason and an explanation.');
      return;
    }
    alert('Event cancelled.');
  };

  return (
    <>
    <NavbarUser /> {/* Navbar component */}

    <div className="container"> {/* Main container */}

      {/* Back to homepage link */}
      <a href="/homepage" className="back-link">← Homepage</a>

      {/* Section Title */}
      <h2 className="title">Event Overview</h2>

      {/* Static Event Information */}
      <div className="event-info">
        <p><strong>Event Name:</strong> Annual Tech Conference 2025</p>
        <p><strong>Date & Time:</strong> 20 November 2025, 9:00 AM</p>
        <p><strong>Location:</strong> Sydney Convention Center</p>
      </div>

      {/* Dropdown for cancellation reason */}
      <div className="section">
        <label><strong>Cancellation Reason</strong></label><br />
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="select"
        >
          <option value="">–Select reasons–</option>
          <option value="low_tickets">Low ticket sales</option>
          <option value="unforeseen">Unforeseen circumstances</option>
          <option value="venue_issues">Venue issues</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Textarea for explanation input */}
      <div className="section">
        <textarea
          className="textarea"
          placeholder="Please provide a brief explanation for canceling this event."
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>

      {/* Informational text about notifications and refunds */}
      <div className="info-text">
        <h4>Notify Attendees</h4>
        <p>By canceling this event, attendees will receive notification via email.</p>
        <h4>Refund Handling</h4>
        <p>Refunds will be initiated automatically via payment gateway.</p>
      </div>

      {/* Warning block with icon and message */}
      <div className="warning">
        <span className="warning-icon">⚠️</span>
        <p><strong>Are you sure you want to cancel this event? This action cannot be undone.</strong></p>
      </div>

      {/* Row of action buttons */}
      <div className="button-row">
        <button className="back-btn">Back</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel Event</button>
      </div>
    </div>
  </>
  );
};

export default CancelEvents;
