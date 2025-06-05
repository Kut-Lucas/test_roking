import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [expanded, setExpanded] = useState({
    supportYourAssociation: false,
    killYourAssociation: false,
    associationSupportYou: false,
  });

  const toggleExpand = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="support-container">
      <h1 className="support-title">Association Guidelines</h1>

      {/* How to Support Your Association */}
      <div className="support-section">
        <h2 onClick={() => toggleExpand('supportYourAssociation')} className="support-header">
          {expanded.supportYourAssociation ? '▼' : '▶'} How to Support Your Association
        </h2>
        {expanded.supportYourAssociation && (
          <ul className="support-list">
            <li>Pay dues</li>
            <li>Attend meetings</li>
            <li>Suggest ideas</li>
            <li>Volunteer to serve</li>
            <li>Give donations</li>
            <li>Offer constructive criticism</li>
            <li>Maintain good relationships</li>
          </ul>
        )}
      </div>

      {/* How to Kill Your Association */}
      <div className="support-section">
        <h2 onClick={() => toggleExpand('killYourAssociation')} className="support-header">
          {expanded.killYourAssociation ? '▼' : '▶'} How to Kill Your Association
        </h2>
        {expanded.killYourAssociation && (
          <ul className="support-list">
            <li>Don't pay dues</li>
            <li>Don't attend meetings</li>
            <li>Don't suggest ideas</li>
            <li>Refuse to serve</li>
            <li>Gossip or backbite</li>
            <li>Criticize destructively</li>
            <li>Don't maintain good relationships</li>
            <li>Expose confidential information</li>
            <li>Constantly complain</li>
          </ul>
        )}
      </div>

      {/* How Your Association Can Support You */}
      <div className="support-section">
        <h2 onClick={() => toggleExpand('associationSupportYou')} className="support-header">
          {expanded.associationSupportYou ? '▼' : '▶'} How Your Association Can Support You
        </h2>
        {expanded.associationSupportYou && (
          <ul className="support-list">
            <li>Patronize your services or products</li>
            <li>Show support during difficult times (bereavement, etc.)</li>
            <li>Attend your functions (birthdays, weddings, etc.)</li>
            <li>Support the unemployed, sick, or needy</li>
            <li>Connect you with helpful resources</li>
            <li>Share authentic job vacancies and ideas for survival</li>
          </ul>
        )}
      </div>

      {/* Closing Note */}
      <div className="support-note">
        <p>
          Remember, a successful association requires active participation, support, and positivity from its members!
        </p>
        <p>
          A positive change begins with you as it begins with me, and the time is now. Remain blessed, and be open to ask when in need.
        </p>
      </div>
    </div>
  );
};

export default Support;
