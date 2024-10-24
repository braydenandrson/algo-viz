import React from 'react';

const ProblemDisplay = ({ problem }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 resize-x overflow-auto w-1/2 min-w-[300px] max-w-[800px]">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">{problem.title}</h2>
      <div
        className="prose max-w-none text-gray-200 whitespace-normal" // Ensure text wrapping
        dangerouslySetInnerHTML={{ __html: problem.content }}
      ></div>
    </div>
  );
};

export default ProblemDisplay;
