import React, { useState, useEffect } from 'react';
import './MyBalance.css';
// import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MyBalance = () => {
  // const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://roking-server.onrender.com/api/payments/my-balance', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPayments(response.data);
      } catch (err) {
        setError('Failed to fetch payments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const calculateTotal = () => {
    return payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
  };

  if (loading) return <div className="loading">Loading your payments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-balance-container">
      <h2>My Payment History</h2>
      <div className="balance-summary">
        <h3>Total Payments: <span>Ksh {calculateTotal().toLocaleString()}</span></h3>
      </div>
      
      <div className="contributions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td>Ksh {parseFloat(payment.amount).toLocaleString()}</td>
                  <td>{payment.reference || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBalance;