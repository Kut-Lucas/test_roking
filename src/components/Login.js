
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import './Login.css'; // Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add error state
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        // Validate inputs
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        try {
            const response = await axios.post('https://www.rokingfriends.com/login', { email, password });
            const { role_id } = response.data;

            if (role_id === 1) {
                login('user');
                navigate('/user-dashboard');
            } else if (role_id === 2) {
                login('admin');
                navigate('/admin-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your email and password.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e); // Call login on Enter key press
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        onKeyDown={handleKeyDown} // Listen for Enter key
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        onKeyDown={handleKeyDown} // Listen for Enter key
                        required
                    />
                    <button type="submit">Login</button> {/* This will trigger the handleLogin */}
                </form>
                <p>
                    Don't have an account? <Link to="/register" className="register-link">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
