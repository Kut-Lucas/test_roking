
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAbout.css'; // Import the CSS file

function AdminAbout() {
    const [about, setAbout] = useState({ history: '', mission: '', vision: '' });

    useEffect(() => {
        axios.get('https://roking-server.onrender.com/api/about')
            .then(response => setAbout(response.data))
            .catch(error => console.error('Error fetching about data:', error));
    }, []);

    const handleChange = (e) => {
        setAbout({ ...about, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('https://roking-server.onrender.com/api/about', about)
            .then(response => alert(response.data.message))
            .catch(error => console.error('Error updating about data:', error));
    };

    return (
        <div className="admin-about-container">
            <form onSubmit={handleSubmit} className="admin-about-form">
                <div className="form-group">
                    <label>History</label>
                    <textarea 
                        name="history" 
                        value={about.history} 
                        onChange={handleChange} 
                        className="textarea-input"
                    />
                </div>
                <div className="form-group">
                    <label>Mission</label>
                    <textarea 
                        name="mission" 
                        value={about.mission} 
                        onChange={handleChange} 
                        className="textarea-input"
                    />
                </div>
                <div className="form-group">
                    <label>Vision</label>
                    <textarea 
                        name="vision" 
                        value={about.vision} 
                        onChange={handleChange} 
                        className="textarea-input"
                    />
                </div>
                <button type="submit" className="submit-button">Update About Information</button>
            </form>
        </div>
    );
}

export default AdminAbout;
