import React from 'react';

const MonthDropdown = ({ month, setMonth, months, monthsInString }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-800">Select Month:</label>
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="block w-full border border-gray-300 rounded-lg p-3 bg-white shadow-md transition duration-200 hover:bg-purple-50 focus:bg-white focus:ring-0"
      >
        {months.map((mon) => (
          <option key={mon} value={mon} className="bg-white text-gray-800">
            {monthsInString[mon - 1]} {/* Display month name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthDropdown;
