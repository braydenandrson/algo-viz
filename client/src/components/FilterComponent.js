import React from 'react';

const FilterComponent = ({ difficultyFilter, setDifficultyFilter }) => {
  return (
    <select
      value={difficultyFilter}
      onChange={(e) => {
        console.log(`Selected difficulty: ${e.target.value}`); // Debugging: log selected difficulty
        setDifficultyFilter(e.target.value);
      }}
      className="bg-gray-700 text-gray-300 py-2 px-4 rounded mt-2 w-full"
    >
      <option value="">All Difficulties</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
  );
};

export default FilterComponent;
