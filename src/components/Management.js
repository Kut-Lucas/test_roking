
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Management.css';

const Management = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    axios.get('https://roking-server.onrender.com/api/management')
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        console.error('Error fetching management data:', error);
      });

    // Handle scrolling to sections based on hash
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="management-container">
      <h1 className="management-title">Management</h1>

      {/* Executive Committee */}
      <div className="executive-managers" id="exec">
        <h2 className="exec__h2">Executive Committee</h2>
        <div className="manager-list" id="exec">
          {managers.filter(manager => manager.committee_name === 'Executive Committee').map((manager, index) => (
            <div key={index} className="manager-card">
              <img src={`https://roking-server.onrender.com${manager.photo_url}`} alt={manager.firstname} className="manager-image" />
              <h3>{`${manager.firstname} ${manager.middlename} ${manager.lastname}`}</h3>
              <p className="manager-role">{manager.user_role_name}</p>
              <p className="manager-description">{manager.about}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Welfare Committee */}
      <div className="other-managers" id="others">
        <h2 className="exec__h2">Welfare Committee</h2>
        <div className="manager-list">
          {managers.filter(manager => manager.committee_name === 'Welfare Committee').map((manager, index) => (
            <div key={index} className="manager-card">
              <img src={`https://roking-server.onrender.com${manager.photo_url}`} alt={manager.firstname} className="manager-image" />
              <h3>{`${manager.firstname} ${manager.middlename} ${manager.lastname}`}</h3>
              <p className="manager-role">{manager.user_role_name}</p>
              <p className="manager-description">{manager.about}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Management;
