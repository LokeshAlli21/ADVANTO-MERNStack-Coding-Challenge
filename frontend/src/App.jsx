import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the scales and elements that you're using in the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const serverPort = 5000;
const serverHost = `http://localhost:${serverPort}`;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(3); // Changed to a number
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({ totalAmount: 0, soldItems: 0, unsoldItems: 0 });
  const [barChartData, setBarChartData] = useState(null);

  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]; 
  const monthsInString = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${serverHost}/api/transactions`, {
                params: { month, search, page }
            });
            const { transactions: transactionData, total } = response.data || {};
            if (transactionData && transactionData.length > 0) {
                setTransactions(transactionData);
                setTotalPages(Math.ceil(total / 10));
            } else {
                setTransactions([]);
                setTotalPages(1); // Reset to 1 page if no transactions
            }
        } catch (err) {
            console.error('Error fetching transactions:', err);
            setError('Failed to fetch transactions.');
        } finally {
            setLoading(false);
        }
    };

    fetchTransactions();
}, [month, search, page]);


  // Fetch Statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${serverHost}/api/statistics`, {
          params: { month }
        });
        setStatistics(response.data);
        // console.log(response.data);
        
      } catch (err) {
        console.error('Error fetching statistics:', err);
      }
    };

    fetchStatistics();
  }, [month]);

  // Fetch Bar Chart Data
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`${serverHost}/api/bar-chart`, {
          params: { month }
        });
        const range = response.data.map(item => item.range);
        const data = response.data.map(item => item.count);
        setBarChartData({
          labels: range,
          datasets: [
            {
              label: 'Number of items',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
          ]
        });
      } catch (err) {
        console.error('Error fetching bar chart data:', err);
      }
    };

    fetchBarChartData();
  }, [month]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <div>
      <h1>Transactions</h1>

      {/* Month Dropdown */}
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        {months.map((mon) => (
          <option key={mon} value={mon}>
            {monthsInString[mon - 1]} {/* Display month name */}
          </option>
        ))}
      </select>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearchChange}
      />

      {/* Transactions Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.dateOfSale}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* Statistics Section */}
      <div>
        <h3>Statistics</h3>
        <p>Total Amount of Sale: {statistics.totalSaleAmount || 0}</p>
        <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
      </div>


      {/* Bar Chart Section */}
      <div>
        <h3>Price Range Distribution</h3>
        {barChartData ? (
          <Bar data={barChartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default App;
