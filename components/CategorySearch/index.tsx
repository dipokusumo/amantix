// components/CategorySearch.tsx

import React from 'react';

const CategorySearch: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Dropdown */}
      <select className="form-select block w-full sm:w-1/6 md:w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select</option>
        <option value="concert">Concert</option>
        <option value="workshop">Workshop</option>
        <option value="seminar">Seminar</option>
        <option value="tournament">Tournament</option>
      </select>
      {/* Search Box */}
      <div className="relative w-full sm:w-1/2 md:w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CategorySearch;
