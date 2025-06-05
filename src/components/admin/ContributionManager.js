// import React, { useState } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// // import { useAuth } from '../context/AuthContext';

// const ContributionManager = () => {
//   // const { user } = useAuth();
//   const [contributions, setContributions] = useState([{ email: '', amount: '', date: '', reference: '' }]);
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const list = [...contributions];
//     list[index][name] = value;
//     setContributions(list);
//   };

//   const handleAddRow = () => {
//     setContributions([...contributions, { email: '', amount: '', date: '', reference: '' }]);
//   };

//   const handleRemoveRow = (index) => {
//     const list = [...contributions];
//     list.splice(index, 1);
//     setContributions(list);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       // Filter out empty rows
//       const validContributions = contributions.filter(
//         c => c.email && c.amount
//       );

//       if (validContributions.length === 0) {
//         setMessage('Please add at least one valid contribution');
//         setIsLoading(false);
//         return;
//       }

//       const response = await axios.post('/api/contributions', { contributions: validContributions }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       setMessage(`Successfully added ${validContributions.length} contributions`);
//       setContributions([{ email: '', amount: '', date: '', reference: '' }]);
//     } catch (error) {
//       setMessage('Failed to add contributions: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage('Please select a file first');
//       return;
//     }

//     setIsLoading(true);
//     setMessage('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axios.post('/api/contributions/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       setMessage(response.data.message || 'File uploaded and processed successfully');
//       setFile(null);
//     } catch (error) {
//       setMessage('Failed to upload file: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="contribution-manager">
//       <h2>Manage Contributions</h2>
      
//       <div className="upload-section">
//         <h3>Upload Excel File</h3>
//         <form onSubmit={handleFileUpload}>
//           <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
//           <button type="submit" disabled={!file || isLoading}>
//             {isLoading ? 'Uploading...' : 'Upload and Process'}
//           </button>
//         </form>
//       </div>

//       <div className="manual-entry-section">
//         <h3>Manual Entry</h3>
//         <form onSubmit={handleSubmit}>
//           {contributions.map((contribution, index) => (
//             <div key={index} className="contribution-row">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Member Email"
//                 value={contribution.email}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//               />
//               <input
//                 type="number"
//                 name="amount"
//                 placeholder="Amount"
//                 value={contribution.amount}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//                 min="0"
//                 step="0.01"
//               />
//               <input
//                 type="date"
//                 name="date"
//                 placeholder="Date (optional)"
//                 value={contribution.date}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="reference"
//                 placeholder="Reference (optional)"
//                 value={contribution.reference}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//               {contributions.length > 1 && (
//                 <button type="button" onClick={() => handleRemoveRow(index)}>
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <div className="buttons">
//             <button type="button" onClick={handleAddRow}>
//               Add Another
//             </button>
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? 'Processing...' : 'Submit Contributions'}
//             </button>
//           </div>
//         </form>
//       </div>

//       {message && <div className="message">{message}</div>}
//     </div>
//   );
// };

// export default ContributionManager;


import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './ContributionManager.css';

// import { useAuth } from '../context/AuthContext';

const ContributionManager = () => {
  // const { user } = useAuth();
  const [payments, setPayments] = useState([{ email: '', amount: '', date: '', reference: '' }]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...payments];
    list[index][name] = value;
    setPayments(list);
  };

  const handleAddRow = () => {
    setPayments([...payments, { email: '', amount: '', date: '', reference: '' }]);
  };

  const handleRemoveRow = (index) => {
    const list = [...payments];
    list.splice(index, 1);
    setPayments(list);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Filter out empty rows
      const validPayments = payments.filter(
        p => p.email && p.amount
      );

      if (validPayments.length === 0) {
        setMessage('Please add at least one valid payment');
        setIsLoading(false);
        return;
      }

      const response = await axios.post('https://41.57.106.76:8445/api/payments', { payments: validPayments }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setMessage(`Successfully added ${validPayments.length} payments`);
      setPayments([{ email: '', amount: '', date: '', reference: '' }]);
    } catch (error) {
      setMessage('Failed to add payments: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://41.57.106.76:8445/api/payments/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessage(response.data.message || 'File uploaded and processed successfully');
      setFile(null);
    } catch (error) {
      setMessage('Failed to upload file: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-manager">
      <h2>Manage Payments</h2>
      
      <div className="upload-section">
        <h3>Upload Excel File</h3>
        <form onSubmit={handleFileUpload}>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
          <button type="submit" disabled={!file || isLoading}>
            {isLoading ? 'Uploading...' : 'Upload and Process'}
          </button>
        </form>
      </div>

      <div className="manual-entry-section">
        <h3>Manual Entry</h3>
        <form onSubmit={handleSubmit}>
          {payments.map((payment, index) => (
            <div key={index} className="payment-row">
              <input
                type="email"
                name="email"
                placeholder="Member Email"
                value={payment.email}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={payment.amount}
                onChange={(e) => handleInputChange(index, e)}
                required
                min="0"
                step="0.01"
              />
              <input
                type="date"
                name="date"
                placeholder="Date (optional)"
                value={payment.date}
                onChange={(e) => handleInputChange(index, e)}
              />
              <input
                type="text"
                name="reference"
                placeholder="Reference (optional)"
                value={payment.reference}
                onChange={(e) => handleInputChange(index, e)}
              />
              {payments.length > 1 && (
                <button type="button" onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="buttons">
            <button type="button" onClick={handleAddRow}>
              Add Another
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit Payments'}
            </button>
          </div>
        </form>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ContributionManager;