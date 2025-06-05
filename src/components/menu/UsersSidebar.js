
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faFileAlt, faBook, faScroll } from '@fortawesome/free-solid-svg-icons';

function UsersSidebar() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Functions to handle navigation
  const navigateTo = (path) => () => navigate(path);

  return (
    <div className="admin__sidebar">
      <ul className="admin__sidebar-menu">
        <li><button className="admin__menu-item" onClick={navigateTo('/announcement')}><FontAwesomeIcon icon={faScroll} className="admin__icon" /> Announcement</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/profile')}><FontAwesomeIcon icon={faUser} className="admin__icon" /> Profile</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/contribution')}><FontAwesomeIcon icon={faFileAlt} className="admin__icon" /> Contributions</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/constitution')}><FontAwesomeIcon icon={faBook} className="admin__icon" /> Constitution</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/insurance')}><FontAwesomeIcon icon={faFileAlt} className="admin__icon" /> Insurance</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/minutes')}><FontAwesomeIcon icon={faFileAlt} className="admin__icon" /> Minutes</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/user-dashboard/members')}><FontAwesomeIcon icon={faUsers} className="admin__icon" /> Members</button></li>
      </ul>
    </div>
  );
}

export default UsersSidebar;
