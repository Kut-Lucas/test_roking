

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Minutes.css'; // Optional: Add your styling here

const Minutes = () => {
  const [minutes, setMinutes] = useState([]);

  useEffect(() => {
    const fetchMinutes = async () => {
      try {
        const response = await axios.get('http://41.57.106.76:8445/api/getMinutes');
        setMinutes(response.data);
      } catch (err) {
        console.error('Error fetching minutes:', err);
      }
    };

    fetchMinutes();
  }, []);

  const data = useMemo(() => minutes, [minutes]);

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        id: 'number', // Unique identifier for the column
        Cell: ({ row }) => row.index + 1, // Row numbering starts at 1
      },
      {
        Header: 'Meeting Title',
        accessor: 'meeting_title',
      },
      {
        Header: 'Meeting Date',
        accessor: 'meeting_date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format the date
      },
      {
        Header: 'PDF',
        accessor: 'file_url',
        Cell: ({ value }) => (
          <a href={`http://41.57.106.76:8445/uploads/${value}`} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        ),
      },
      {
        Header: 'Uploaded On',
        accessor: 'created_at',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format the timestamp
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
  } = useTable({ columns, data });

  return (
    <div className="minutes">
      <h2>Meeting Minutes</h2>
      <table {...getTableProps()} className="minutes-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps()}>
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
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td key={cell.column.id} {...cell.getCellProps()}>
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

export default Minutes;
