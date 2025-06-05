import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="footer-container">
        <div className="footer-left">
          <h4>About Us</h4>
          <p>We are a non-profit organization dedicated to welfare and community service.</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/management">Management</a></li>

          </ul>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Email: info@rokingwelfare.org</p>
          <p>Phone: +254722514810</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Roking Welfare Association. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
