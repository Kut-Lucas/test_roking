// UploadConstitution.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadConstitution.css'; // Optional: Add styling if needed

const UploadConstitution = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Title and file are required.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await axios.post('http://41.57.106.76:8445/api/uploadConstitution', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setFile(null);
      setError('');
      alert('Constitution uploaded successfully!');
    } catch (err) {
      console.error('Error uploading constitution:', err);
      setError('Failed to upload constitution.');
    }
  };

  return (
    <div className="upload-constitution">
      <h2>Upload Constitution</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>PDF:</label>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default UploadConstitution;
