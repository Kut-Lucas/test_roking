// Announcement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Announcement.css'; // Optional: Add styling if needed

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('https://roking-server.onrender.com/api/getAnnouncements');
        setAnnouncements(response.data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcement">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((item) => (
          <li key={item.id}>
            <h3>{item.reference}</h3>
            <p>{item.announcement}</p>
            <p className="timestamp">Created on: {new Date(item.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
