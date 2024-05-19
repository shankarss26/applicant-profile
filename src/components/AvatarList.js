// AvatarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvatarCard from './AvatarCard';

const AvatarList = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      setAvatars(response.data.results);
    };
    fetchAvatars();
  }, []);

  return (
    <div>
      {avatars.map((avatar, index) => (
        <AvatarCard key={index} avatar={avatar} />
      ))}
    </div>
  );
};

export default AvatarList;