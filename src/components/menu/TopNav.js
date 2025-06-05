
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust path as needed
import axios from 'axios'; // Ensure axios is installed and imported
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './TopNav.css'; // Import the CSS file
import logo from './images/roking.png';

const TopNav = () => {
  const { auth, logout } = useContext(AuthContext); // Get auth data and logout function from context
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    console.log('Authentication Status:', auth.isAuthenticated); // Debug logging
    if (auth.isAuthenticated) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get('http://41.57.106.76:8445/api/getUserName');
          console.log('User Name Response:', response.data); // Debug logging
          if (response.data.user) {
            setUserName(response.data.user.firstName);
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      };
      fetchUserName();
    }
  }, [auth.isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post('http://41.57.106.76:8445/api/logout'); // Send logout request
      logout(); // Call logout function from context
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="topnav">
      <div className="logo">
        <img src={logo} alt="Logo" className="logged__logo-img" />
      </div>
      <div className="greeting">
        Welcome, {userName}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNav;
