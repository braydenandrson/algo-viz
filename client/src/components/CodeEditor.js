import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ initialCode, onRun }) => {
  const [code, setCode] = useState(initialCode || '');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRunCode = () => {
    onRun(code);
  };

  return (
    <div className="w-full bg-gray-700 rounded-lg shadow-lg p-6">
      <MonacoEditor
        height="400px"
        language="python"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
      <button
        onClick={handleRunCode}
        className="mt-4 bg-pastel-green hover:bg-pastel-green-dark text-gray-100 font-semibold py-2 px-4 rounded shadow-lg"
      >
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
