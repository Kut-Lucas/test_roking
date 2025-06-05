import React, { useState } from 'react';
import axios from 'axios';
import './AddAnnouncement.css'; // Optional: Add styling if needed


const AdminInsurance = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('insuranceFile', file);

    try {
      await axios.post('https://roking-server.onrender.com/api/upload-insurance', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Insurance uploaded successfully');
    } catch (error) {
      console.error('Error uploading insurance:', error);
      alert('Error uploading insurance');
    }
  };

  return (
    <div>
      <h1>Upload Insurance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Insurance Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Insurance PDF:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="application/pdf"
            required
          />
        </div>
        <button type="submit">Upload Insurance</button>
      </form>
    </div>
  );
};

export default AdminInsurance;
