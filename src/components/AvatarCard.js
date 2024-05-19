// AvatarCard.js
import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';

const AvatarCard = ({ avatar }) => {
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);

  return (
    <div className="avatar-card">
      <img src={avatar.picture.medium} alt={avatar.name.first} />
      <h3>{avatar.name.first} {avatar.name.last}</h3>
      <button onClick={() => setShowModal(true)} className='edit-profile-button'>Edit Profile</button>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill.name} - {skill.rating}</li>
        ))}
      </ul>
      {showModal && (
        <EditProfileModal
          avatar={avatar}
          skills={skills}
          setSkills={setSkills}
          show={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AvatarCard;