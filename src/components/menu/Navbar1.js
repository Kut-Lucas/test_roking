import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
import logo from './images/roking.png';
import './Navbar1.css'; // Import the unified CSS file

const Navbar1 = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isResponsiveClose, setResponsiveClose] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setResponsiveClose(!isResponsiveClose);
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let menuClass = ["navbar-menu"];
    if (isMenuOpen) {
        menuClass.push('menu-open');
    }

    return (
        <>
            <div className="navbar-header">
                <div className="navbar-contact-left">
                    <div className="navbar-email">
                        <i className="fa fa-envelope"></i>
                        <span className='social-none'>info@rokingfriends.com</span>
                    </div>
                    <div className="navbar-call">
                        <i className="fa fa-phone-alt"></i>
                        <span className='social-none'>+254722514810</span>
                    </div>
                </div>
                <div className="navbar-social-right">
                    <div className="navbar-twitter">
                        <i className="fab fa-twitter"></i>
                        <span className="social-description social-none">twitter</span>
                    </div>
                    <div className="navbar-facebook">
                        <i className="fab fa-facebook"></i>
                        <span className="social-description social-none">facebook</span>
                    </div>
                </div>
            </div>

            <header className="navbar-main-header">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <NavLink exact to="/" className="logo-link" id='logo-link'>
                            <img src={logo} alt="logo" />
                            <h3>Herruok Gerruok Lourruok</h3>
                        </NavLink>
                    </div>
                    <div className="navbar-menus">
                        <nav className="navbar-navigation" ref={dropdownRef}>
                            {isResponsiveClose ? (
                                <span className="navbar-menu-toggle" onClick={toggleMenu}>
                                    <FiXCircle />
                                </span>
                            ) : (
                                <span className="navbar-menu-toggle" onClick={toggleMenu}>
                                    <FiAlignRight />
                                </span>
                            )}
                            <ul className={menuClass.join(' ')}>
                                <li className="navbar-menu-item">
                                    <NavLink exact to="/" className="menu-link">Home</NavLink>
                                </li>

                                <li className="navbar-menu-item navbar-submenu" onClick={() => toggleDropdown('about')}>
                                    <Link href="#about">About Us <FiChevronDown /></Link>
                                    <ul className={`navbar-submenu-list ${openDropdown === 'about' ? 'submenu-open' : ''}`}>
                                        <li><NavLink to="/about#history" className="menu-link">History</NavLink></li>
                                        <li><NavLink to="/about#vision" className="menu-link">Vision</NavLink></li>
                                        <li><NavLink to="/about#mission" className="menu-link">Mission</NavLink></li>
                                    </ul>
                                </li>
                                <li className="navbar-menu-item navbar-submenu" onClick={() => toggleDropdown('events')}>
                                    <Link to="#">Events Pics <FiChevronDown /></Link>
                                    <ul className={`navbar-submenu-list ${openDropdown === 'events' ? 'submenu-open' : ''}`}>
                                        <li><NavLink to="/events#meetings" className="menu-link">Meeting Pics</NavLink></li>
                                        <li><NavLink to="/events#other" className="menu-link">Other Activities</NavLink></li>
                                    </ul>
                                </li>
                                <li className="navbar-menu-item navbar-submenu" onClick={() => toggleDropdown('management')}>
                                    <Link to="#">Management <FiChevronDown /></Link>
                                    <ul className={`navbar-submenu-list ${openDropdown === 'management' ? 'submenu-open' : ''}`}>
                                        <li><NavLink to="/management#exec" className="menu-link">Executive Committee</NavLink></li>
                                        <li><NavLink to="/management#others" className="menu-link">Welfare Committee</NavLink></li>
                                    </ul>
                                </li>




                                <li className="navbar-menu-item">
                                    <NavLink to="/login" className="login-btn-one" id='login-btn-one'>Login</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar1;

