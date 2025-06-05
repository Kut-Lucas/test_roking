
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Insurance.css'; // Import the CSS file

const Insurance = () => {
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    axios.get('https://41.57.106.76:8445/api/insurances')
      .then(response => setInsurances(response.data))
      .catch(error => console.error('Error fetching insurance data:', error));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        id: 'number', // Unique identifier for the column
        Cell: ({ row }) => row.index + 1, // Row numbering starts at 1
      },
      {
        Header: 'Insurance Title',
        accessor: 'title',
      },
      {
        Header: 'File',
        accessor: 'file_url',
        Cell: ({ value }) => (
          <a href={`https://41.57.106.76:8445${value}`} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        )
      },
      {
        Header: 'Date Uploaded',
        accessor: 'created_at',
        Cell: ({ value }) => {
          const isoDateString = value.replace(' ', 'T');
          const formattedDate = new Date(isoDateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return formattedDate;
        }
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: insurances });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="insurance-container">
      <h1>Insurance Documents</h1>
      <table {...getTableProps()} className="insurance-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
    </div>
  );
};

export default Insurance;
