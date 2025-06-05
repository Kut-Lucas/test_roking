
// export default Contribution;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Contribution.css';


function Contribution() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get('https://41.57.106.76:8445/api/contributions');
        setContributions(response.data);
      } catch (err) {
        console.error('Error fetching contributions:', err);
      }
    };

    fetchContributions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, i) => i + 1,
        id: 'row',
      },
      {
        Header: 'Reason',
        accessor: 'reason',
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'File',
        accessor: 'file_url',
        Cell: ({ value }) => (
          <a href={`https://41.57.106.76:8445${value}`} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: contributions });

  return (
    <div>
      <h2>Contributions</h2>
      <table {...tableInstance.getTableProps()}>
        <thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Contribution;
