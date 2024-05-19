

const SkillsDropdown = ({ onDropDownChange, filterData }) => {
    return (
        <>
            <select onChange={(e) => onDropDownChange(e.target.value)} className="input-field" style={{ width: '40%' }}>
                <option value="skill">Skill</option>
                <option value="rating">Rating</option>
            </select>
            <input type="text" placeholder="Search..." className="input-field" onChange={(e) => filterData(e.target.value)} style={{ width: '50%', marginLeft: '15px' }} />
        </>
    );
};

export default SkillsDropdown;
