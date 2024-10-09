import React from 'react';

const Statistics = ({ statistics }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h3 className="font-semibold">Statistics</h3>
      <p>Total Amount of Sale: <span className="font-bold">{statistics.totalSaleAmount || 0}</span></p>
      <p>Total Sold Items: <span className="font-bold">{statistics.totalSoldItems || 0}</span></p>
      <p>Total Not Sold Items: <span className="font-bold">{statistics.totalNotSoldItems || 0}</span></p>
    </div>
  );
};

export default Statistics;
