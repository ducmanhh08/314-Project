import { useState } from 'react';
import ProfileUpload from './ProfileUpload';
import styles from './MyInformation.module.css';

function AccountInfo() {
  const [useHomeForBilling, setUseHomeForBilling] = useState(true);
  const [useBillingForShipping, setUseBillingForShipping] = useState(true);

  return (
    <div className={styles.accountInfoContainer}>
      <header className={styles.header}>
        <button className={styles.backButton}>← Homepage</button>
        <h1>Account Information</h1>
      </header>

      <section className={styles.formSection}>
        <h2>Photo Profile</h2>
        <div className={styles.profilePhotoSection}>
          <ProfileUpload />
        </div>

        <h2>Contact Information</h2>
        <div className={styles.twoColumn}>
          <input placeholder="First Name" className={styles.inputField} />
          <input placeholder="Surname" className={styles.inputField} />
          <input placeholder="Mobile Phone" className={styles.inputField} />
          <input placeholder="Home Phone" className={styles.inputField} />
          <input placeholder="Job Title" className={styles.inputField} />
          <input placeholder="Company / Organization" className={styles.inputField} />
          <input placeholder="Website" className={styles.inputField} />
          <input placeholder="Blog" className={styles.inputField} />
        </div>
      </section>

      <section className={styles.formSection}>
        <h2>Home Address</h2>
        <div className={styles.addressAndCheckboxes}>
          <div className={styles.twoColumn}>
            <input placeholder="Address" className={styles.inputField} />
            <input placeholder="City" className={styles.inputField} />
            <input placeholder="Country" className={styles.inputField} />
            <input placeholder="Postcode" className={styles.inputField} />
            <input placeholder="Territory" className={styles.inputField} />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={useHomeForBilling}
                onChange={() => setUseHomeForBilling(!useHomeForBilling)}
              />
              Billing address is the same as home address
            </label>

            <label className={styles.checkboxLabel}>
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

      {/* Conditionally Show Billing Address */}
      {!useHomeForBilling && (
        <section className={styles.formSection}>
          <h2>Billing Address</h2>
          <div className={styles.twoColumn}>
            <input placeholder="Address" className={styles.inputField} />
            <input placeholder="City" className={styles.inputField} />
            <input placeholder="Country" className={styles.inputField} />
            <input placeholder="Postcode" className={styles.inputField} />
            <input placeholder="Territory" className={styles.inputField} />
          </div>
        </section>
      )}

      {/* Conditionally Show Shipping Address */}
      {!useBillingForShipping && (
        <section className={styles.formSection}>
          <h2>Shipping Address</h2>
          <div className={styles.twoColumn}>
            <input placeholder="Address" className={styles.inputField} />
            <input placeholder="City" className={styles.inputField} />
            <input placeholder="Country" className={styles.inputField} />
            <input placeholder="Postcode" className={styles.inputField} />
            <input placeholder="Territory" className={styles.inputField} />
          </div>
        </section>
      )}

      <button className={styles.saveButton}>Save</button>
    </div>
  );
}

export default AccountInfo;
