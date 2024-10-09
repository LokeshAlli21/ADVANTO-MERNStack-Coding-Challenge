import React from 'react';

const TransactionsTable = ({ transactions, loading, error }) => {
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{transaction.title}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.description}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.price}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.dateOfSale}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
