import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ initialCode, onRun }) => {
  const defaultInstructions = `
# Instructions:
# 1. Define your function. For example: def my_function(args):
# 2. Write your test cases using assert statements.
# 3. Use a main block to run your tests.

  def my_function(args):
    # Write your function here
    pass

  def test_my_function():
    assert my_function(1) == 1
    assert my_function(2) == 2

  if __name__ == "__main__":
    test_my_function()
    print("All tests passed!")
  `.trim();

  const [code, setCode] = useState(initialCode || defaultInstructions);

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
          minimap: { enabled: false }, // Disable the minimap
          tabSize: 4,  // Set tab size to 4 for Python
          scrollbar: {
            vertical: 'hidden',  // Hide vertical scrollbar
            horizontal: 'hidden', // Hide horizontal scrollbar
            verticalScrollbarSize: 5, // Reduce vertical scrollbar size
            horizontalScrollbarSize: 5, // Reduce horizontal scrollbar size
          },
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
