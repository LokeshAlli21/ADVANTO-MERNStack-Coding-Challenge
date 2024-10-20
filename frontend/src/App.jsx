import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthDropdown from './components/MonthDropdown';
import SearchBox from './components/SearchBox';
import TransactionsTable from './components/TransactionsTable';
import Pagination from './components/Pagination';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const serverPort = 5000;
const serverHost = `http://localhost:${serverPort}`;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(3);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({ totalAmount: 0, soldItems: 0, unsoldItems: 0 });
  const [barChartData, setBarChartData] = useState(null);

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsInString = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${serverHost}/api/transactions`, {
          params: { month, search, page }
        });
        console.log(response.data);
        
        const { transactions: transactionData, total } = response.data || {};
        if (transactionData && transactionData.length > 0) {
          setTransactions(transactionData);
          setTotalPages(Math.ceil(total / 10));
        } else {
          setTransactions([]);
          setTotalPages(1);
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
        console.log(response.data);
        
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
    <div className="container mx-auto p-6 bg-gradient-to-br from-purple-100 to-blue-200 rounded-lg shadow-xl">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-800">Transaction Dashboard</h1>
  
      {/* Month Dropdown and Search Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex items-center">
          <div className="w-full bg-white rounded-lg shadow-lg p-4 transition transform hover:scale-105 duration-300">
            <MonthDropdown month={month} setMonth={setMonth} months={months} monthsInString={monthsInString} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full bg-white rounded-lg shadow-lg p-4 transition transform hover:scale-105 duration-300">
            <SearchBox search={search} handleSearchChange={handleSearchChange} />
          </div>
        </div>
      </div>
  
      {/* Transactions Table */}
      <div className="overflow-x-auto mb-8 bg-white rounded-lg shadow-lg p-4 border border-gray-300">
        <TransactionsTable transactions={transactions} loading={loading} error={error} />
      </div>
  
      {/* Pagination */}
      <div className="flex justify-center mb-6">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
  
      {/* Statistics Section */}
      <Statistics statistics={statistics} />
  
      {/* Bar Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8 border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-800">Price Range Distribution</h2>
        <BarChart barChartData={barChartData} />
      </div>
    </div>
  );
};

export default App;
