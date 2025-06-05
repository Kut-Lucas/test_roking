
import React, { useState } from 'react';
import axios from 'axios';
import './AdminEvents.css'; // Import the CSS file

const AdminEvents = () => {
  const [category, setCategory] = useState('Meeting');
  const [eventBrief, setEventBrief] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageBrief, setImageBrief] = useState('');

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://41.57.106.76:8445/events', {
        category,
        brief: eventBrief
      });
      const eventId = response.data.id;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('brief', imageBrief);

        await axios.post(`http://41.57.106.76:8445/events/${eventId}/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event');
    }
  };

  return (
    <div className="admin-events-container">
      <h1>Add Event</h1>
      <form onSubmit={handleEventSubmit}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Meeting">Meeting</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Event Brief:
          <textarea value={eventBrief} onChange={(e) => setEventBrief(e.target.value)}></textarea>
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </label>
        <label>
          Image Brief:
          <textarea value={imageBrief} onChange={(e) => setImageBrief(e.target.value)}></textarea>
        </label>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AdminEvents;
