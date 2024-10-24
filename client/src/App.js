import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import SearchBar from './components/SearchBar';
import ProblemDropdown from './components/ProblemDropdown';
import FilterComponent from './components/FilterComponent';
import ProblemDisplay from './components/ProblemDisplay';
import RunCodeButton from './components/RunCodeButton';

function App() {
  const [problemList, setProblemList] = useState([]); // Store the complete problem list
  const [filteredProblems, setFilteredProblems] = useState([]); // Store filtered problems
  const [problem, setProblem] = useState(null); // Store the selected problem
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown visibility
  const [selectedProblemTitle, setSelectedProblemTitle] = useState(''); // Store selected problem title
  const [difficultyFilter, setDifficultyFilter] = useState(''); // Difficulty filter
  const [solutionOutput, setSolutionOutput] = useState(''); // Store the output of the solution
  const [loading, setLoading] = useState(false); // Store loading state
  const dropdownRef = useRef(null);

  // Fetch problems and set both problemList and filteredProblems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/problems');
        const data = await response.json();
        setProblemList(data);
        setFilteredProblems(data); // Set filtered problems initially
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchProblems();
  }, []);

  // Filter problems by difficulty
  useEffect(() => {
    let filtered = problemList;

    if (difficultyFilter) {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    setFilteredProblems(filtered);
  }, [difficultyFilter, problemList]);

  // Fetch the selected problem data
  const fetchProblem = async () => {
    if (!selectedProblemTitle) {
      console.error('No problem selected');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:5000/problem/${selectedProblemTitle}`);
      if (!response.ok) {
        throw new Error('Problem not found');
      }
      const data = await response.json();
      setProblem(data);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error fetching problem:", error);
    }
  };

  // Handle running the code by sending it to the backend
  const handleRunCode = async (code) => {
    setLoading(true);
    setSolutionOutput('');
    try {
      const response = await fetch('http://127.0.0.1:5000/run_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.error) {
        setSolutionOutput(`Error: ${data.error}`);
      } else {
        setSolutionOutput(`Output:\n${data.stdout || 'No output'}\nErrors:\n${data.stderr || 'No errors'}`);
      }
    } catch (error) {
      console.error("Error running code:", error);
      setSolutionOutput('Error running code.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-100 text-center">LeetCode Problem Solver</h1>

      <div className="mb-6 relative" ref={dropdownRef}>
        <SearchBar
          selectedProblemTitle={selectedProblemTitle} // Pass the selected problem title to SearchBar
          setShowDropdown={setShowDropdown}
          setSelectedProblemTitle={setSelectedProblemTitle}
        />
        <FilterComponent
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter} // Pass difficulty filter state
        />
        {showDropdown && (
          <ProblemDropdown
            filteredProblems={filteredProblems}
            setSelectedProblemTitle={setSelectedProblemTitle}
            setShowDropdown={setShowDropdown} // Pass down to close dropdown
          />
        )}
      </div>

      <RunCodeButton fetchProblem={fetchProblem} />

      {problem && (
        <div className="flex flex-grow">
          {/* Problem box will resize along with the code editor */}
          <ProblemDisplay problem={problem} />
          <div className="flex-grow flex-shrink-0 ml-4">
            <CodeEditor initialCode="# Write your Python3 code here" onRun={handleRunCode} />
          </div>
        </div>
      )}

      {loading && <p className="text-gray-400 mt-4">Running your code...</p>}

      {solutionOutput && (
        <div className="bg-gray-900 p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold text-gray-100">Execution Result:</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded mt-2">{solutionOutput}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
