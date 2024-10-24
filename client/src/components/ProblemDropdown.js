import React from 'react';

const ProblemDropdown = ({ filteredProblems, setSelectedProblemTitle, setShowDropdown }) => {
  return (
    <div className="absolute bg-gray-800 text-gray-300 rounded-lg shadow-lg mt-2 w-full max-h-60 overflow-y-auto z-10">
      {filteredProblems.length > 0 ? (
        filteredProblems.map((p) => (
          <button
            key={p.titleSlug}
            onClick={() => {
              console.log(`Selected problem: ${p.titleSlug}`);
              setSelectedProblemTitle(p.titleSlug); // Set the selected problem's titleSlug
              setShowDropdown(false); // Close the dropdown after selecting
            }}
            className="block w-full text-left py-2 px-4 hover:bg-gray-600"
          >
            {p.title} ({p.difficulty})
          </button>
        ))
      ) : (
        <p className="text-gray-500 py-2 px-4">No problems found.</p>
      )}
    </div>
  );
};

export default ProblemDropdown;
