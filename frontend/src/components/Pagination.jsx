import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`px-4 py-2 border rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}>
        Previous
      </button>
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className={`px-4 py-2 border rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
