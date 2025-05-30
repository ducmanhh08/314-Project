import React, { useState } from 'react';
import './ProfileUpload.module.css';

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
      className="upload-box"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {image ? (
        <img src={image} alt="Profile Preview" className="profile-preview" />
      ) : (
        <>
          <div className="upload-icon">👤</div>
          <div className="upload-text">ADD A PROFILE IMAGE</div>
          <div className="upload-subtext">Drag and drop or choose a file to upload</div>
          <input type="file" accept="image/*" onChange={handleChange} />
        </>
      )}
    </div>
  );
};

export default ProfileUpload;