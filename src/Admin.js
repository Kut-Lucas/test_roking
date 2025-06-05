
import React from 'react';
import './Admin.css';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminWelcomePage from './components/admin/AdminWelcomePage';
import ManageUsers from './components/ManageUsers';
import ProtectedRoute from './components/ProtectedRoute';
import ApprovedUsers from './components/admin/ApprovedUsers';
import ApproveMembers from './components/admin/ApproveMembers';
import RejectedUsers from './components/admin/RejectedUsers';
// import Minutes from './components/Minutes';
import Contribution from './components/admin/Contribution';
import UploadContribution from './components/admin/UploadContribution';
import Constitution from './components/admin/Constitution';
import UploadConstitution from './components/admin/UploadConstitution';
import Announcement from './components/admin/Announcement';
import AddAnnouncement from './components/admin/AddAnnouncement';
import Minutes from './components/admin/Minutes';
import UploadMinutes from './components/admin/UploadMinutes';
import AdminManagement from './components/admin/AdminManagement';
import AdminAbout from './components/admin/AdminAbout';
import UserProfile from './components/UserProfile';
import AdminInsurance from './components/admin/AdminInsurance';
import Insurance from './components/admin/Insurance';

import Events from './components/admin/Events';
import AdminEvents from './components/admin/AdminEvents';

import TopNav from './components/menu/TopNav';
import Sidebar from './components/menu/Sidebar';
import FooterTwo from './components/FooterTwo';

function Admin() {
    return (
        <div className='cont-admin'>
            <div className='admin-topnav'>
                <TopNav />
            </div>
            <div className='flex-admin'>
                <div className='flex-one'>
                    <Sidebar />
                </div>
                <div className='flex-two'>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute role="admin"><AdminWelcomePage /></ProtectedRoute>} />
                        <Route path="manage-users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
                        <Route path="profile" element={<ProtectedRoute role="admin"><UserProfile /></ProtectedRoute>} />

                        <Route path="approved-users" element={<ProtectedRoute role="admin"><ApprovedUsers /></ProtectedRoute>} />
                        <Route path="pending-users" element={<ProtectedRoute role="admin"><ApproveMembers /></ProtectedRoute>} />
                        <Route path="rejected-users" element={<ProtectedRoute role="admin"><RejectedUsers /></ProtectedRoute>} />

                        {/* Contribution Routes */}
                        <Route path="contribution" element={<ProtectedRoute role="admin"><Contribution /></ProtectedRoute>} />
                        <Route path="upload-contribution" element={<ProtectedRoute role="admin"><UploadContribution /></ProtectedRoute>} />
                        
                        {/* Constitution Routes */}
                        <Route path="constitution" element={<ProtectedRoute role="admin"><Constitution /></ProtectedRoute>} />
                        <Route path="upload-constitution" element={<ProtectedRoute role="admin"><UploadConstitution /></ProtectedRoute>} />


                        {/* Announcement Routes */}
                        <Route path="announcement" element={<ProtectedRoute role="admin"><Announcement /></ProtectedRoute>} />
                        <Route path="add-announcement" element={<ProtectedRoute role="admin"><AddAnnouncement /></ProtectedRoute>} />


                        {/* Minutes Routes */}
                        <Route path="minutes" element={<ProtectedRoute role="admin"><Minutes /></ProtectedRoute>} />
                        <Route path="upload-minutes" element={<ProtectedRoute role="admin"><UploadMinutes /></ProtectedRoute>} />

                        {/* Insurance Routes */}
                        <Route path="insurance" element={<ProtectedRoute role="admin"><Insurance /></ProtectedRoute>} />
                        <Route path="upload-insurance" element={<ProtectedRoute role="admin"><AdminInsurance /></ProtectedRoute>} />

                        {/* Admin Management route */}\
                        <Route path="admin-management" element={<ProtectedRoute role="admin"><AdminManagement /></ProtectedRoute>} />

                        {/* Admin About route */}\
                        <Route path="admin-about" element={<ProtectedRoute role="admin"><AdminAbout /></ProtectedRoute>} />


                        <Route path="events" element={<ProtectedRoute role="admin"><Events /></ProtectedRoute>} />
                        <Route path="admin-events" element={<ProtectedRoute role="admin"><AdminEvents /></ProtectedRoute>} />

                        {/* Additional admin routes */}
                    </Routes>
                </div>

            </div>
            <div className='admin-footer'>
                <FooterTwo />
            </div>

        </div>

    );
}

export default Admin;
