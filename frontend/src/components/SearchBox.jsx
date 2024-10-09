import React from 'react';

const SearchBox = ({ search, handleSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded p-2 w-full"
      />
    </div>
  );
};

export default SearchBox;
