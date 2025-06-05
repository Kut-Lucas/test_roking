

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faChevronDown, faChevronUp, faFileAlt, faBook, faCalendarDays, faPeopleRoof, faScroll, faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';


function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null); // Single state to track open submenu
  const navigate = useNavigate();

  // Function to toggle submenu
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // Function to close the submenu if clicked outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.admin__sidebar')) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Functions to handle navigation
  const navigateTo = (path) => () => navigate(path);

  return (
    <div className="admin__sidebar">
      <ul className="admin__sidebar-menu">

        <li><button className="admin__menu-item" onClick={navigateTo('/admin-dashboard/profile')}><FontAwesomeIcon icon={faUser} className="admin__icon_drops" />   Profile</button></li>

        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('users')}>
            <FontAwesomeIcon icon={faUsers} className="admin__icon" />
            Users
            <FontAwesomeIcon icon={openMenu === 'users' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'users' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/pending-users')}><FaUsers className="admin__icon_drops" /> Pending</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/approved-users')}><FaUserCheck className="admin__icon_drops" /> Approved</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/rejected-users')}><FaUserTimes className="admin__icon_drops" /> Rejected</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('contributions')}>
            <FontAwesomeIcon icon={faFileAlt} className="admin__icon" />
            Contributions
            <FontAwesomeIcon icon={openMenu === 'contributions' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'contributions' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/contribution')}>Contributions</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/upload-contribution')}>Upload Contributions</button></li>
            </ul>
          )}
        </li>

        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('constitution')}>
            <FontAwesomeIcon icon={faBook} className="admin__icon" />
            Constitution
            <FontAwesomeIcon icon={openMenu === 'constitution' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'constitution' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/constitution')}>Constitution</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/upload-constitution')}>Upload Constitution</button></li>
            </ul>
          )}
        </li>
        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('insurance')}>
            <FontAwesomeIcon icon={faFileAlt} className="admin__icon" />
            Insurance
            <FontAwesomeIcon icon={openMenu === 'insurance' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'insurance' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/insurance')}>Insurance</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/upload-insurance')}>Upload Insurance</button></li>
            </ul>
          )}
        </li>

        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('announcement')}>
            <FontAwesomeIcon icon={faScroll} className="admin__icon" />
            Announcements
            <FontAwesomeIcon icon={openMenu === 'announcement' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'announcement' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/announcement')}>Announcements</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/add-announcement')}>Add Announcement</button></li>
            </ul>
          )}
        </li>

        <li>
          <button className="admin__menu-item" onClick={() => toggleMenu('minutes')}>
            <FontAwesomeIcon icon={faFileAlt} className="admin__icon" />
            Minutes
            <FontAwesomeIcon icon={openMenu === 'minutes' ? faChevronUp : faChevronDown} className="admin__toggle-icon" />
          </button>
          {openMenu === 'minutes' && (
            <ul className="admin__submenu">
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/minutes')}>Minutes</button></li>
              <li><button className="admin__submenu-item" onClick={navigateTo('/admin-dashboard/upload-minutes')}>Upload Minutes</button></li>
            </ul>
          )}
        </li>

        <li><button className="admin__menu-item" onClick={navigateTo('/admin-dashboard/admin-management')}><FontAwesomeIcon icon={faPeopleRoof} className="admin__icon" /> Edit Management</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/admin-dashboard/admin-events')}><FontAwesomeIcon icon={faCalendarDays} className="admin__icon" /> Edit Events</button></li>
        <li><button className="admin__menu-item" onClick={navigateTo('/admin-dashboard/admin-about')}><FontAwesomeIcon icon={faPersonCircleQuestion} className="admin__icon" /> Edit About</button></li>
        {/* <li><button className="admin__menu-item" onClick={navigateTo('/add-admin')}><FontAwesomeIcon icon={faBook} className="admin__icon" /> Add Admin</button></li> */}

      </ul>
    </div>
  );
}

export default Sidebar;

