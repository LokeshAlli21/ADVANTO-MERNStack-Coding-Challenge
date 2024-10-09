import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barChartData }) => {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Price Range Distribution</h3>
      {barChartData ? (
        <Bar data={barChartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BarChart;
