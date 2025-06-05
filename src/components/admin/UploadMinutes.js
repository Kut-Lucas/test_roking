
import React, { useState } from 'react';
import axios from 'axios';
import './UploadMinutes.css'; // Import your CSS file

const UploadMinutes = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [file, setFile] = useState(null); // Change from fileUrl to file

  const handleUpload = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('meeting_title', meetingTitle);
    formData.append('meeting_date', meetingDate);
    formData.append('file', file); // Append the selected file

    try {
      await axios.post('https://roking-server.onrender.com/api/uploadMinutes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Minutes uploaded successfully');
      setMeetingTitle('');
      setMeetingDate('');
      setFile(null);
    } catch (err) {
      console.error('Error uploading minutes:', err);
      alert('Failed to upload minutes');
    }
  };

  return (
    <div className="upload-minutes-container">
      <h2>Upload Meeting Minutes</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label>Meeting Title:</label>
          <input
            type="text"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Meeting Date:</label>
          <input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>PDF File:</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])} // Handle file selection
            required
          />
        </div>
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default UploadMinutes;
