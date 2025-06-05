
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import './ApprovedUsers.css'; // Import the CSS file for styles

// Define columns
const columns = [
  { Header: 'No.', accessor: 'number' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Name', accessor: 'fullName' }, // Full Name column
  { Header: 'Phone Number', accessor: 'phoneNumber' }
];

const ApprovedUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('http://41.57.106.76:8445/api/users/approved', {
          withCredentials: true // Ensure cookies are sent with the request
        });

        // Process data and concatenate names
        const numberedData = response.data.map((item, index) => ({
          ...item,
          number: index + 1, // Sequential number starts at 1
          fullName: `${item.firstname || ''} ${item.middlename || ''} ${item.lastname || ''}`.trim() // Concatenate names
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
    <div className="approved-users-container">
      <h1 className="h1">Approved Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table {...getTableProps()} className="approved-users-table">
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
                <tr {...row.getRowProps()} key={row.original.id || row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id + row.id}>
                      {cell.render('Cell')}
                    </td>
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

export default ApprovedUsers;
