import React from 'react';

const MonthDropdown = ({ month, setMonth, months, monthsInString }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Select Month:</label>
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="border border-gray-300 rounded p-2">
        {months.map((mon) => (
          <option key={mon} value={mon}>
            {monthsInString[mon - 1]} {/* Display month name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthDropdown;
