
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState({
    history: '',
    mission: '',
    vision: ''
  });

  useEffect(() => {
    axios.get('http://41.57.106.76:8445/about')
      .then(response => {
        setAboutData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the about data!', error);
      });
  }, []);

  return (
    <div id="about" className="about-container">
      <h1 className="about-title">About Us</h1>

      <div className="about-section" id='history'>
        <h2>History</h2>
        <p>{aboutData.history}</p>
      </div>

      <div className="about-section" id='mission'>
        <h2>Mission</h2>
        <p>{aboutData.mission}</p>
      </div>

      <div className="about-section" id='vision'>
        <h2>Vision</h2>
        <p>{aboutData.vision}</p>
      </div>
    </div>
  );
};

export default About;
