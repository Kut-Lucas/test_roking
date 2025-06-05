// export default AdminWelcomePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminWelcomePage.css';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const AdminWelcomePage = () => {
  const [pendingUsers, setPendingUsers] = useState(0);
  const [approvedUsers, setApprovedUsers] = useState(0);
  const [rejectedUsers, setRejectedUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend using axios
    axios.get('https://roking-server.onrender.com/api/users/status', {
      withCredentials: true,  // Include credentials in the request
    })
      .then(response => {
        const { pending, approved, rejected } = response.data;
        setPendingUsers(pending);
        setApprovedUsers(approved);
        setRejectedUsers(rejected);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          navigate('/login');
        } else {
          console.error('Error fetching user data:', error);
        }
      });
  }, [navigate]);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-welcome-page">
      <h1 className='h1_welcome'>
        <span className='span_red'>Roking</span>
        <span className='span_blue'> Login </span>
        <span className='span_green'>Authorization</span>
      </h1>
      <div className="button-container">
        <div className="button pending" onClick={() => navigateTo('/admin-dashboard/pending-users')}>
          <FaUsers className="icon" />
          <div className="text">
            <h3>{pendingUsers} Pending Users</h3>
          </div>
        </div>
        <div className="button approved" onClick={() => navigateTo('/admin-dashboard/approved-users')}>
          <FaUserCheck className="icon" />
          <div className="text">
            <h3>{approvedUsers} Approved Users</h3>
          </div>
        </div>
        <div className="button rejected" onClick={() => navigateTo('/admin-dashboard/rejected-users')}>
          <FaUserTimes className="icon" />
          <div className="text">
            <h3>{rejectedUsers} Rejected Users</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomePage;

