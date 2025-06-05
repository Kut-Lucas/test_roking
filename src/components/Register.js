import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: '' // Added confirm password field
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Password strength validation function
    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/g.test(password) && (password.match(/[a-z]/g) || []).length >= 2;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 8;
        return hasUppercase && hasLowercase && hasSpecialChar && hasNumber && isLongEnough;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (!validatePassword(formData.password)) {
            setError('Password not strong enough. It must contain at least 1 uppercase letter, 2 lowercase letters, a special character, and a number, and be at least 8 characters long.');
            return;
        }

        try {
            // Make the POST request
            const response = await axios.post('https://roking-server.onrender.com/register', formData, {
                withCredentials: true,
            });

            setSuccess(response.data.message);
            setError('');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.response?.data?.message === 'Email already taken') {
                setError('This email is already registered. Please use another email.');
            } else {
                setError(err.response?.data?.message || 'Registration failed');
            }
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        value={formData.firstname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Middle Name:</label>
                    <input 
                        type="text" 
                        name="middlename" 
                        value={formData.middlename} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        value={formData.lastname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input 
                        type="text" 
                        name="phonenumber" 
                        value={formData.phonenumber} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login" className="login-link">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
