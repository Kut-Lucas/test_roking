import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import classNames from 'classnames';
import './RejectedUsers.css'; // Import the CSS file for styles

// Define columns
const columns = [
  { Header: 'No.', accessor: 'number' }, // Add a column for sequential numbers
  { Header: 'Email', accessor: 'email' },
  { Header: 'First Name', accessor: 'firstname' },
  { Header: 'Last Name', accessor: 'lastname' },
  { Header: 'Phone Number', accessor: 'phoneNumber' }
];

const RejectedUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('https://41.57.106.76:8445/api/users/rejected', {
          withCredentials: true 
        });
        
        // Add a sequential number to each user
        const numberedData = response.data.map((item, index) => ({
          ...item,
          number: index + 1 // Sequential number starts at 1
        }));
        setData(numberedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <div className={classNames('rejected-users-container', { 'loading': isLoading })}>
      <h1>Rejected Users</h1>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <table {...getTableProps()} className="rejected-users-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RejectedUsers;
