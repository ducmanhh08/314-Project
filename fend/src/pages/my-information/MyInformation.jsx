import React, { useState } from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import ProfileUpload from '../my-information/ProfileUpload';
import './MyInformation.module.css';

function AccountInfo() {
  const [useHomeForBilling, setUseHomeForBilling] = useState(true);
  const [useBillingForShipping, setUseBillingForShipping] = useState(true);

  return (
    <div className="account-info-container">
      <header>
        <button className="back-button">←Homepage</button>
        <h1>Account Information</h1>
      </header>



      <section className="form-section">
        <h2>Photo Profile</h2>
        <section className="profile-photo-section">
          <ProfileUpload />
        </section>
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

          {/* Home Address */}
       <section className="form-section">
        <h2>Home Address</h2>
        <div className="address-and-checkboxes">
          <div className="two-column">
            <input placeholder="Address" className='a' />
            <input placeholder="City" className='a' />
            <input placeholder="Country" className='a' />
            <input placeholder="Postcode" className='a' />
            <input placeholder="Territory" className='a' />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useHomeForBilling}
                onChange={() => setUseHomeForBilling(!useHomeForBilling)}
              />
              Billing address is the same as home address
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useBillingForShipping}
                onChange={() => setUseBillingForShipping(!useBillingForShipping)}
              />
              Shipping address is the same as billing address
            </label>
          </div>
        </div>
      </section>


      {/* Billing Address (conditionally shown) */}
      {!useHomeForBilling && (
        <section className="form-section">
          <h2>Billing Address</h2>
          <div className="two-column">
            <input placeholder="Address" className='a' />
            <input placeholder="City" className='a' />
            <input placeholder="Country" className='a' />
            <input placeholder="Postcode" className='a' />
            <input placeholder="Territory" className='a' />
          </div>
        </section>
      )}


      {/* Conditionally Show Shipping Address */}
      {!useBillingForShipping && (
        <section className="form-section">
          <h2>Shipping Address</h2>
          <div className="two-column">
            <input placeholder="Address" className='a' />
            <input placeholder="City" className='a' />
            <input placeholder="Country" className='a' />
            <input placeholder="Postcode" className='a' />
            <input placeholder="Territory" className='a' />
          </div>
        </section>
      )}


      <button className="save-button">Save</button>
    </div>
  );
}

export default AccountInfo;