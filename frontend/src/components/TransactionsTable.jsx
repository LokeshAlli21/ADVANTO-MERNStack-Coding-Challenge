import React from 'react';

const TransactionsTable = ({ transactions, loading, error }) => {
  if (loading) return <p className="text-center text-blue-500 font-semibold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-50">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-200 transition duration-200">
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.originalId}</td>
                <td className="border border-gray-300 px-4 py-3">
                  <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.title}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.description}</td>
                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">{transaction.price}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.category}</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.isSold ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center border border-gray-300 px-6 py-4 text-gray-500">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
