import React from 'react';

const ProblemDisplay = ({ problem }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col h-full overflow-x-auto">
      <style>
        {`
          /* Scrollbar styling for WebKit browsers */
          ::-webkit-scrollbar {
            height: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-track {
            background-color: #2d3748;
          }
        `}
      </style>
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">{problem.title}</h2>
      <div
        className="prose max-w-none text-gray-200 whitespace-normal flex-grow"
        dangerouslySetInnerHTML={{ __html: problem.content }}
      ></div>
    </div>
  );
};

export default ProblemDisplay;
