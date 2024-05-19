import React, { useState, useEffect } from 'react';
import SkillsDropdown from './SkillsDropdown'

const SkillsTable = ({ skills, onAddSkill, onSkillChange, onSkillAction }) => {
  const [skillsData, setSkillsData] = useState(skills);
  const [selectedOption, setSelectedOption] = useState('skill');

  useEffect(() => {
    setSkillsData(skills);
  }, [skills]);

  const onDropDownChange = (value) => {
    setSelectedOption(value);
  };

  const filterData = (query) => {
    const filteredSkills = skills.filter(item =>
      selectedOption === 'skill'
        ? item.name.includes(query)
        : item.rating.includes(query)
    );
    setSkillsData(query ? filteredSkills : skills);
  }


  return (
    <div className="skill-table-container">
      <SkillsDropdown onDropDownChange={onDropDownChange} filterData={filterData} />
      <br/>
      <br/>
      <table className="skill-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => onSkillChange(index, 'name', e.target.value)}
                  disabled={!skill.isEditing}
                  className={`input-field ${!skill.nameIsValid ? 'error' : ''}`}
                  
                />
              </td>
              <td>
                <input
                  type="text"
                  value={skill.rating}
                  onChange={(e) => onSkillChange(index, 'rating', e.target.value)}
                  disabled={!skill.isEditing}
                  className={`input-field ${!skill.ratingIsValid ? 'error' : ''}`}
                />
              </td>
              <td>
                {skill.isEditing ? (
                  <button onClick={() => onSkillAction(index, 'apply')} className="action-button">{!skill.isUpdated ? 'Apply' : 'Update'}</button>
                ) : (
                  <>
                    <button onClick={() => onSkillAction(index, 'edit')} className="action-button">Edit</button>
                  </>
                )}
                <button onClick={() => onSkillAction(index, 'delete')} className="action-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <button onClick={onAddSkill} className="add-skill-button">Add Skill</button>
    </div>
  );
};

export default SkillsTable;