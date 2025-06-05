
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import UsersSidebar from './components/menu/UsersSidebar';

// Import files to be seen by the users.
import Announcement from './components/admin/Announcement';
import Contribution from './components/admin/Contribution';
import Constitution from './components/admin/Constitution';
import Insurance from './components/admin/Insurance';

import Minutes from './components/admin/Minutes';
import UsersList from './components/users/UsersList';


import TopNav from './components/menu/TopNav';
import FooterTwo from './components/FooterTwo';

import './User.css';

function User() {
    return (
        <div className='user-cont'>
            <div className='user-topnav'>
                <TopNav />
            </div>
            <div className='flex-users'>
                <div className='users-flex-one'>
                    <UsersSidebar />
                </div>
                <div className='users-flex-two'>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute role="user"><Announcement /></ProtectedRoute>} />

                        <Route path="profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />                        <Route path="profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
                        <Route path="contribution" element={<ProtectedRoute role="user"><Contribution /></ProtectedRoute>} />
                        <Route path="constitution" element={<ProtectedRoute role="user"><Constitution /></ProtectedRoute>} />
                        <Route path="insurance" element={<ProtectedRoute role="user"><Insurance /></ProtectedRoute>} />

                        <Route path="minutes" element={<ProtectedRoute role="user"><Minutes /></ProtectedRoute>} />
                        <Route path="members" element={<ProtectedRoute role="user"><UsersList /></ProtectedRoute>} />

                        {/* Additional user routes */}
                    </Routes>
                </div>
            </div>
            <div className='users-footer'>
                <FooterTwo />
            </div>

        </div>
    );
}

export default User;
