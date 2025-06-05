
import React, { useState } from 'react';
import axios from 'axios';
import './UploadContribution.css';

function UploadContribution() {
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason || !file) {
      setError('Please provide both a reason and a file.');
      return;
    }

    const formData = new FormData();
    formData.append('reason', reason);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/contributions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('Contribution uploaded successfully!');
        setReason('');
        setFile(null);
        setError('');
      } else {
        setError('Failed to upload contribution.');
      }
    } catch (err) {
      setError('An error occurred while uploading the contribution.');
    }
  };

  return (
    <div className="upload-contribution-container">
      <div className="upload-contribution">
        <h2>Upload Contribution</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reason for Contribution:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>File:</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="file-input" 
            />
          </div>
          <button type="submit" className="submit-button">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadContribution;
