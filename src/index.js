
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://41.57.106.76:8445'; // Adjust if necessary

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
