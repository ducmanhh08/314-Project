import React, { useState } from 'react';
import styles from './ProfileUpload.module.css';

const ProfileUpload = () => {
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div
      className={styles.uploadBox}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {image ? (
        <img src={image} alt="Profile Preview" className={styles.profilePreview} />
      ) : (
        <>
          <div className={styles.uploadIcon}>👤</div>
          <div className={styles.uploadText}>ADD A PROFILE IMAGE</div>
          <div className={styles.uploadSubtext}>Drag and drop or choose a file to upload</div>
          <input type="file" accept="image/*" onChange={handleChange} className={styles.fileInput} />
        </>
      )}
    </div>
  );
};

export default ProfileUpload;
