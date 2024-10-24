import React from 'react';

const SearchBar = ({ selectedProblemTitle, setShowDropdown, setSelectedProblemTitle }) => {
  return (
    <input
      type="text"
      placeholder={selectedProblemTitle || "Search problems by title"}
      value={selectedProblemTitle} // Display the selected problem title
      onClick={() => setShowDropdown(true)} // Show dropdown on click
      onChange={(e) => setSelectedProblemTitle(e.target.value)} // Allow editing if necessary
      className="bg-gray-700 text-gray-300 py-2 px-4 rounded w-full"
    />
  );
};

export default SearchBar;
