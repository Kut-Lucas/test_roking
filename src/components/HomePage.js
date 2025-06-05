import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            <p>Please log in to continue.</p>
            <div>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default HomePage;
