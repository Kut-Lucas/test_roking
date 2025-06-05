
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://roking-server.onrender.com'; // Adjust if necessary

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App component
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
