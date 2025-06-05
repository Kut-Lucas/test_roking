
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phonenumber: '',
        photo_url: '',
        occupation: '',
        about: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Fetch user profile after login
        axios.get('http://41.57.106.76:8445/api/profile')
            .then(response => {
                // Prepend server URL to the photo URL if it exists
                const profileData = response.data;
                if (profileData.photo_url) {
                    profileData.photo_url = `http://41.57.106.76:8445${profileData.photo_url}`;
                }
                setProfile(profileData);
            })
            .catch(error => {
                console.error("There was an error fetching the profile!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

        // Preview the new image before saving
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile((prevState) => ({
                ...prevState,
                photo_url: reader.result,
            }));
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handlePhotoClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstname', profile.firstname);
        formData.append('middlename', profile.middlename);
        formData.append('lastname', profile.lastname);
        formData.append('phonenumber', profile.phonenumber);
        formData.append('occupation', profile.occupation);
        formData.append('about', profile.about);
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        axios.put('http://41.57.106.76:8445/api/profile', formData)
            .then(response => {
                alert("Profile updated successfully!");
            })
            .catch(error => {
                console.error("There was an error updating the profile!", error);
            });
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>


                {/* Profile photo */}
                <div className="profile-photo" onClick={handlePhotoClick}>
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {profile.photo_url ? (
                        <img src={profile.photo_url} alt="Profile" />
                    ) : (
                        <div className="upload-placeholder">
                            Click to upload profile photo
                        </div>
                    )}
                </div>
                {/* Form fields */}
                
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Middle Name</label>
                    <input
                        type="text"
                        name="middlename"
                        value={profile.middlename}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phonenumber"
                        value={profile.phonenumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Occupation</label>
                    <input
                        type="text"
                        name="occupation"
                        value={profile.occupation}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <textarea
                        name="about"
                        value={profile.about}
                        onChange={handleInputChange}
                    />
                </div>



                <button type="submit" className="submit-btn">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
