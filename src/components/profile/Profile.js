import React from 'react';
import PropTypes from 'prop-types';

import '../css/Profile.css';

const Profile = ({ name, nameColor, textColor, profile, handleClick, handleChange }) => (
  <div className="profile-card">
    <h3>Profile</h3>
    <div className="profile-entry">
      <strong style={{ marginRight: '10px' }}>User Name:</strong>
      <input name="name" type="text" value={name || ''} placeholder="user name" className="profile-input" onChange={handleChange} />
    </div>
    <div className="profile-entry">
      <strong style={{ marginRight: '10px' }}>Email:</strong>
      <input name="email" type="text" value={profile.email || ''} placeholder="email" disabled className="profile-input" onChange={handleChange} />
    </div>
    <div className="profile-entry">
      <strong style={{ marginRight: '10px' }}>Name Color:</strong>
      <input name="nameColor" type="text" value={nameColor || ''} placeholder="name color" className="profile-input" onChange={handleChange} />
    </div>
    <div className="profile-entry">
      <strong style={{ marginRight: '10px' }}>Text Color:</strong>
      <input name="textColor" type="text" value={textColor || ''} placeholder="text color" className="profile-input" onChange={handleChange} />
    </div>
    <div className="profile-entry">
      <button className="edit-button" onClick={handleClick}>Update Profile</button>
    </div>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  nameColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Profile;
