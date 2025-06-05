import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import './ApproveMembers.css';

// Define the ApproveMembers component
const ApproveMembers = () => {
  const [pendingMembers, setPendingMembers] = useState([]);

  useEffect(() => {
    // Fetch pending members from the API
    axios.get('http://41.57.106.76:8445/api/pending-members', { withCredentials: true })
      .then(response => {
        console.log('Pending Members:', response.data); // Debugging
        setPendingMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending members:', error); // Error handling
      });
  }, []);

  const handleApprove = useCallback((id) => {
    axios.post(`http://41.57.106.76:8445/api/approve-member/${id}`, {}, { withCredentials: true })
      .then(() => {
        setPendingMembers(pendingMembers.filter(member => member.user_id !== id));
      })
      .catch(error => console.error('Error approving member:', error));
  }, [pendingMembers]);

  const handleReject = useCallback((id) => {
    axios.post(`http://41.57.106.76:8445/api/reject-member/${id}`, {}, { withCredentials: true })
      .then(() => {
        setPendingMembers(pendingMembers.filter(member => member.user_id !== id));
      })
      .catch(error => console.error('Error rejecting member:', error));
  }, [pendingMembers]);

  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name', // Key to access data
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Actions',
      accessor: 'user_id',
      Cell: ({ value, row }) => (
        <div>
          <button className="approve-button" onClick={() => handleApprove(row.original.user_id)}>Approve</button>
          <button className="reject-button" onClick={() => handleReject(row.original.user_id)}>Reject</button>
        </div>
      )
    }
  ], [handleApprove, handleReject]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: pendingMembers
    },
    useSortBy
  );

  return (
    <div className="approve-members-container">
      <h2>Approve Members</h2>
      <table {...getTableProps()} className="members-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.user_id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveMembers;
