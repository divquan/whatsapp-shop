import React from 'react';

export default function Search() {
    
    return (
      <div className="w-full px-4 bg-white">
      <div className="mx-auto w-full flex justify-between max-w-md p-4 mt-1">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products"
              className="w-full py-2 px-4 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <button className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-sm hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Search
          </button>
        </div>
      </div>
    </div>
    );
};