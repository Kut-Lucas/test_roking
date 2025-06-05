
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import myImage2 from "./images/rokingLogo.jpeg";

function Main() {
  const [executiveManagers, setExecutiveManagers] = useState([]);

  // Fetch executive managers data from the database
  useEffect(() => {
    axios.get('https://41.57.106.76:8445/api/management') // Update with your actual API endpoint
      .then(response => {
        // Filter only Executive Committee data
        const execManagers = response.data.filter(manager => manager.committee_name === 'Executive Committee');
        setExecutiveManagers(execManagers);
      })
      .catch(error => {
        console.error('Error fetching executive committee data:', error);
      });
  }, []);

  return (
    <>
      <section className="section1">
        <h1 className="myheading">Welcome to Roking Welfare Association</h1>
        <p className="myheading2 flex-h2"><span className="red">Herruok</span> <span className="blue">Lourruok</span> <span className="green">Gerruok</span></p>
        <img src={myImage2} alt="Roking Logo" className="images" />
      </section>

      <section className="section2">
        <div className="management-container">
          <div className="executive-managers">
            <h2 className="exec__h2">Executive Committee</h2>
            <div className="manager-list">
              {executiveManagers.length > 0 ? (
                executiveManagers.map((manager, index) => (
                  <div key={index} className="manager-card">
                    <img src={`https://41.57.106.76:8445${manager.photo_url}`} alt={manager.firstname} className="manager-image" />
                    <h3>{`${manager.firstname} ${manager.middlename} ${manager.lastname}`}</h3>
                    <p className="manager-role">{manager.user_role_name}</p>
                    <p className="manager-description">{manager.about}</p>
                  </div>
                ))
              ) : (
                <p>Loading executive committee data...</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
