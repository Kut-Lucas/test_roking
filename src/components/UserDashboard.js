// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';


function UserDashboard() {
    return (
        <div>
            <h1>User Dashboard</h1>
            <p>Welcome, User!</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/user-dashboard/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/user-dashboard/minutes">Minutes</Link>
                    </li>
                    {/* Add other links if needed */}
                </ul>
            </nav>
        </div>
    );
}

export default UserDashboard;