import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
    const { setUser } = useContext(useAuth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('https://roking-server.onrender.com/logout');
            setUser(null); // Clear the user state
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
