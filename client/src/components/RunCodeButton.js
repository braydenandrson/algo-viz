import React from 'react';

const RunCodeButton = ({ fetchProblem }) => {
  return (
    <button
      onClick={fetchProblem}
      className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded shadow-lg mb-6"
    >
      Fetch Problem
    </button>
  );
};

export default RunCodeButton;
