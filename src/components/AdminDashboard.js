
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            {/* Link to ManageUsers page */}
            <nav>
                <ul>
                    <li>
                        <Link to="/admin-dashboard/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/welcome">Welcome</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/minutes">Minutes</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/approved-users">Approved Users</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/pending-users">Pending Users</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/rejected-users">Rejected Users</Link>
                    </li>

                    {/* Add other links if needed */}
                </ul>
            </nav>
        </div>
    );
}

export default AdminDashboard;
