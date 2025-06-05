
// Constitution.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Constitution.css'; // Import the CSS file

const Constitution = () => {
  const [constitutions, setConstitutions] = useState([]);

  useEffect(() => {
    const fetchConstitutions = async () => {
      try {
        const response = await axios.get('https://41.57.106.76:8445/api/getConstitutions');
        setConstitutions(response.data);
      } catch (err) {
        console.error('Error fetching constitutions:', err);
      }
    };

    fetchConstitutions();
  }, []);

  return (
    <div className="constitution">
      <h2>Constitutions</h2>
      <div className="constitution-container">
        {constitutions.map((item) => (
          <div key={item.id} className="constitution-item">
            <h3>{item.title}</h3>
            <iframe
              src={`https://41.57.106.76:8445/uploads/${item.file_url}`}
              title={item.title}
              className="constitution-iframe"
            ></iframe>
            <p>Uploaded on: {new Date(item.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Constitution;
