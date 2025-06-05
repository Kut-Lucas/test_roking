
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './UsersList.css'; // Optional for custom styling

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch users from the server
        axios.get('https://roking-server.onrender.com/api/users-data')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    // Open modal when a user is clicked
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    // Columns for react-table
    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                Cell: ({ row }) => row.index + 1, // Serial number
            },
            {
                Header: 'Name',
                accessor: row => `${row.firstname} ${row.middlename ? row.middlename + ' ' : ''}${row.lastname}`, // Full Name
                id: 'fullName',
                Cell: ({ row }) => (
                    <span
                        onClick={() => handleUserClick(row.original)}
                        style={{ cursor: 'pointer', color: 'blue' }}
                    >
                        {row.original.firstname} {row.original.middlename} {row.original.lastname}
                    </span>
                ),
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone Number',
                accessor: 'phonenumber',
            },
            {
                Header: 'Occupation',
                accessor: 'occupation',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: users });

    return (
        <div>
            <h1>Members List</h1>
            <table {...getTableProps()} style={{ width: '100%', border: '1px solid black', marginBottom: '20px' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ padding: '10px', borderBottom: '1px solid black' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid black' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {showModal && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        {selectedUser.photo_url && (
                            <div>
                                <p><strong className='center'>Profile Photo</strong></p>
                                <img
                                    src={`https://roking-server.onrender.com${selectedUser.photo_url}`}
                                    alt="User Profile"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                />
                            </div>
                        )}
                        <h2>Member Details</h2>
                        <p><strong>Name:</strong> {selectedUser.firstname} {selectedUser.middlename} {selectedUser.lastname}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone Number:</strong> {selectedUser.phonenumber}</p>
                        <p><strong>Occupation:</strong> {selectedUser.occupation}</p>
                        <p><strong>About:</strong> {selectedUser.about}</p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;
