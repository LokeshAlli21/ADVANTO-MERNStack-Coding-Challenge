import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barChartData }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Price Range Distribution</h3>
      {barChartData ? (
        <div className="h-64">
          <Bar data={barChartData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      )}
    </div>
  );
};

export default BarChart;
