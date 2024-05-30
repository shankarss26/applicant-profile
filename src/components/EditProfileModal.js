// EditProfileModal.js
import React, { useState } from 'react';
import SkillsTable from './SkillsTable';
import './Modal.css';

const EditProfileModal = ({ avatar, skills, setSkills, closeModal, show }) => {
  const [newSkills, setNewSkills] = useState(skills);


  const handleAddSkill = () => {
    if ((newSkills.length - 1) >= 0 && newSkills[newSkills.length - 1].name === '' && newSkills[newSkills.length - 1].rating === '') {
      setNewSkills(newSkills.map((skill, i) => (
        i === newSkills.length - 1 ? { ...skill, ratingIsValid: false, nameIsValid: false } : skill
      )));
      return;
    }
    setNewSkills([...newSkills, { name: '', rating: '', isEditing: true, ratingIsValid: true, nameIsValid: true }]);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = newSkills.map((skill, i) => (
      i === index ? { ...skill, [field]: value, isUpdated: true } : skill
    ));
    setNewSkills(updatedSkills);
  };

  const handleSkillAction = (index, action) => {
    if (validateFields(index, action)) {
      if (action === 'apply') {
        setNewSkills(newSkills.map((skill, i) => (
          i === index ? { ...skill, isEditing: false, ratingIsValid: true, nameIsValid: true } : skill
        )));
      } else if (action === 'delete') {
        setNewSkills(newSkills.filter((_, i) => i !== index));
      } else if (action === 'edit') {
        setNewSkills(newSkills.map((skill, i) => (
          i === index ? { ...skill, isEditing: true } : skill
        )));
      }
    }
  };

  const handleApply = () => {
    setSkills(newSkills);
    closeModal();
  };


  const validateFields = (index, action) => {
    let valid = true;
    if (action !== 'apply') {
      return valid;
    }
    if (newSkills[index].rating === '' && newSkills[index].name === '') {
      setNewSkills(newSkills.map((skill, i) => (
        i === index ? { ...skill, ratingIsValid: false, nameIsValid: false } : skill
      )));
      valid = false;
    } else if (newSkills[index].rating === '') {
      setNewSkills(newSkills.map((skill, i) => (
        i === index ? { ...skill, ratingIsValid: false, nameIsValid: true } : skill
      )));
      valid = false;
    } else if (newSkills[index].name === '') {
      setNewSkills(newSkills.map((skill, i) => (
        i === index ? { ...skill, nameIsValid: false, ratingIsValid: true } : skill
      )));
      valid = false;
    }
    return valid;
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`} >
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeModal}>&times;</span>
        </div>
        <div className="modal-body">
          <div className="image-container">
            <img src={avatar.picture.large} alt={avatar.name.first} />
          </div>
          <div className="content-container">
            <SkillsTable
              skills={newSkills}
              onAddSkill={handleAddSkill}
              onSkillChange={handleSkillChange}
              onSkillAction={handleSkillAction}
            />
            <button onClick={handleApply} className="action-button">Apply</button>
            <button onClick={closeModal} className="action-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>




  );
};

export default EditProfileModal;