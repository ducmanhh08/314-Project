import React from 'react';
import './MyInformation.css';

function AccountInfo() {
  return (
    <div className="account-info-container">
      <header>
        <button className="back-button">←Homepage</button>
        <h1>Account Information</h1>
      </header>

      <section className="profile-photo-section">
        <div className="profile-photo-box">
          <div className="photo-placeholder">Profile Photo</div>
          <button className="upload-button">Add a photo</button>
        </div>
      </section>

      <section className="form-section">
        <h2>Contact Information</h2>
        <div className="two-column">
          <input placeholder="First Name" />
          <input placeholder="Surname" />
          <input placeholder="Mobile Phone" />
          <input placeholder="Home Phone" />
          <input placeholder="Job Title" />
          <input placeholder="Company / Organization" />
          <input placeholder="Website" />
          <input placeholder="Blog" />
        </div>
      </section>

      {['Home', 'Billing', 'Shipping', 'Work'].map((type) => (
        <section className="form-section" key={type}>
          <h2>{type} Address</h2>
          <div className="two-column">
            <input placeholder="Address" className='a' />
            <input placeholder="City" className='a' />
            <input placeholder="Country"className='a'  />
            <input placeholder="Postcode" className='a' />
            <input placeholder="Territory" className='a' />
          </div>
        </section>
      ))}

      <section className="form-section">
        <h2>Account Email Address</h2>
        <div className="inline-group">
          <input placeholder='abc@gmail.com' className='b' />
          <button className="change-button">Change</button>
        </div>
      </section>

      <section className="form-section">
        <h2>Your password</h2>
        <div className="last">
          <input placeholder="Current password" type="password" className='c'/>
          <input placeholder="New password" type="password" className='c'/>
          <input placeholder="Re-enter new password" type="password" className='c'/>
        </div>
      </section>

      <button className="save-button">Save</button>
    </div>
  );
}

export default AccountInfo;