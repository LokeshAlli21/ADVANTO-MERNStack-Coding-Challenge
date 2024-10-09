import React from 'react';

const Statistics = ({ statistics }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-300">
          <h2 className="text-3xl font-bold mb-4 text-center text-purple-900">Statistics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-green-300 p-4 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold">Total Sale</h3>
              <p className="text-2xl font-bold text-purple-800">
                {statistics.totalSaleAmount ? `${statistics.totalSaleAmount}` : '$0'}
              </p>
            </div>
            <div className="bg-yellow-300 p-4 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold">Total Sold Items</h3>
              <p className="text-2xl font-bold text-purple-800">
                {statistics.totalSoldItems || 0}
              </p>
            </div>
            <div className="bg-red-300 p-4 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold">Total Not Sold Items</h3>
              <p className="text-2xl font-bold text-purple-800">
                {statistics.totalNotSoldItems || 0}
              </p>
            </div>
          </div>
        </div>
      );
};

export default Statistics;
