
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManagement.css'; // Import the updated CSS

function AdminManagement() {
    const [users, setUsers] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCommittee, setSelectedCommittee] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const usersRes = await axios.get('http://41.57.106.76:8445/api/admin-management');
                const committeesRes = await axios.get('http://41.57.106.76:8445/api/committees');
                const rolesRes = await axios.get('http://41.57.106.76:8445/api/user-roles');
                setUsers(usersRes.data);
                setCommittees(committeesRes.data);
                setRoles(rolesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCommitteeChange = (event) => {
        setSelectedCommittee(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleAddRole = async () => {
        if (!selectedUserId || !selectedCommittee || !selectedRole) {
            alert('Please select a user, committee, and role.');
            return;
        }

        try {
            await axios.post('http://41.57.106.76:8445/api/update-role', {
                user_id: selectedUserId,
                committee_id: selectedCommittee,
                role_id: selectedRole
            });
            alert('Role added successfully.');
            // Refresh data after adding the role
            const usersRes = await axios.get('http://41.57.106.76:8445/api/admin-management');
            setUsers(usersRes.data);
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        (user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!selectedCommittee || user.committee_name === selectedCommittee) &&
        (!selectedRole || user.role_name === selectedRole)
    );

    return (
        <div className="admin-management-container">
            <h1 className="admin-management-header">Admin Management</h1>

            <select className="admin-management-select" onChange={handleCommitteeChange} value={selectedCommittee}>
                <option value="">Select Committee</option>
                {committees.map(committee => (
                    <option key={committee.committee_id} value={committee.committee_id}>
                        {committee.name}
                    </option>
                ))}
            </select>
            <select className="admin-management-select" onChange={handleRoleChange} value={selectedRole}>
                <option value="">Select Role</option>
                {roles.map(role => (
                    <option key={role.user_role_id} value={role.user_role_id}>
                        {role.user_role_name}
                    </option>
                ))}
            </select>
            <select className="admin-management-select" onChange={handleUserChange} value={selectedUserId}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.user_id} value={user.user_id}>
                        {user.full_name} ({user.email})
                    </option>
                ))}
            </select>
            <button className="admin-management-button" onClick={handleAddRole}>Add Role</button>
            <input
                type="text"
                className="admin-management-input"
                placeholder="Search by full name or email"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table className="admin-management-table">
                <thead>
                    <tr>
                        <th className="admin-management-th">Full Name</th>
                        <th className="admin-management-th">Email</th>
                        <th className="admin-management-th">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.user_id} className="admin-management-tr">
                            <td className="admin-management-td">{user.full_name}</td>
                            <td className="admin-management-td">{user.email}</td>
                            <td className="admin-management-td">{user.role_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminManagement;
