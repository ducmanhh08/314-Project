import { useState } from 'react';
import ProfileUpload from './ProfileUpload';
import styles from './MyInformation.module.css';

function AccountInfo() {
  const [useHomeForBilling, setUseHomeForBilling] = useState(true);
  const [useBillingForShipping, setUseBillingForShipping] = useState(true);

  return (
    <div className={styles['accountInfoContainer']}>
      <header>
        <button className={styles['backButton']}>←Homepage</button>
        <h1>Account Information</h1>
      </header>

      <section className={styles['formSection']}>
        <h2>Photo Profile</h2>
        <section className={styles['profilePhotoSection']}>
          <ProfileUpload />
        </section>
        <h2>Contact Information</h2>
        <div className={styles['twoColumn']}>
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
      <section className={styles['formSection']}>
        <h2>Home Address</h2>
        <div className={styles['addressAndCheckboxes']}>
          <div className={styles['twoColumn']}>
            <input placeholder="Address" className={styles['a']} />
            <input placeholder="City" className={styles['a']} />
            <input placeholder="Country" className={styles['a']} />
            <input placeholder="Postcode" className={styles['a']} />
            <input placeholder="Territory" className={styles['a']} />
          </div>

          <div className={styles['checkboxGroup']}>
            <label className={styles['checkboxLabel']}>
              <input
                type="checkbox"
                checked={useHomeForBilling}
                onChange={() => setUseHomeForBilling(!useHomeForBilling)}
              />
              Billing address is the same as home address
            </label>

            <label className={styles['checkboxLabel']}>
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
        <section className={styles['formSection']}>
          <h2>Billing Address</h2>
          <div className={styles['twoColumn']}>
            <input placeholder="Address" className={styles['a']} />
            <input placeholder="City" className={styles['a']} />
            <input placeholder="Country" className={styles['a']} />
            <input placeholder="Postcode" className={styles['a']} />
            <input placeholder="Territory" className={styles['a']} />
          </div>
        </section>
      )}

      {/* Conditionally Show Shipping Address */}
      {!useBillingForShipping && (
        <section className={styles['formSection']}>
          <h2>Shipping Address</h2>
          <div className={styles['twoColumn']}>
            <input placeholder="Address" className={styles['a']} />
            <input placeholder="City" className={styles['a']} />
            <input placeholder="Country" className={styles['a']} />
            <input placeholder="Postcode" className={styles['a']} />
            <input placeholder="Territory" className={styles['a']} />
          </div>
        </section>
      )}

      <button className={styles['saveButton']}>Save</button>
    </div>
  );
}

export default AccountInfo;