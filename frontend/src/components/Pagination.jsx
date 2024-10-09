import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)} 
        className={`px-4 py-2 text-sm font-semibold rounded-lg border transition duration-300 
          ${page === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Previous
      </button>
      <span className="text-lg font-medium text-gray-700">{`Page ${page} of ${totalPages}`}</span>
      <button 
        disabled={page === totalPages} 
        onClick={() => setPage(page + 1)} 
        className={`px-4 py-2 text-sm font-semibold rounded-lg border transition duration-300 
          ${page === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
