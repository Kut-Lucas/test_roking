// AddAnnouncement.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddAnnouncement.css'; // Optional: Add styling if needed

const AddAnnouncement = () => {
  const [reference, setReference] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://roking-server.onrender.com/api/addAnnouncement', {
        reference,
        announcement,
      });
      setMessage('Announcement added successfully!');
      setReference('');
      setAnnouncement('');
    } catch (error) {
      console.error('Error adding announcement:', error);
      setMessage('Failed to add announcement.');
    }
  };

  return (
    <div className="add-announcement">
      <h2>Add Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reference">Reference</label>
          <input
            type="text"
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="announcement">Announcement</label>
          <textarea
            id="announcement"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Announcement</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAnnouncement;
