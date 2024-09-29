
import React, { useState } from "react";
import './App.css';

const algorithms = ["Breadth-first-search", "Depth-first-search", "Flood Fill"];

const m = 15;
const n = 30;

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [grid, setGrid] = useState(createEmptyGrid(m, n));
  const [clickedButton, setClickedButton] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // State to track if user is dragging
  const [draggingColor, setDraggingColor] = useState(null); // To track the color being dragged

  // Handle individual cell click (not dragging)
  const handleCellClick = (row, col) => {
    const newGrid = [...grid];
    const currentColor = newGrid[row][col];
    const nextColor = (currentColor + 1) % 4;
    newGrid[row][col] = nextColor;
    setGrid(newGrid);
  };

  // Handle mousedown for starting drag operation
  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    const newGrid = [...grid];
    const currentColor = newGrid[row][col];
    const nextColor = (currentColor + 1) % 4;
    setDraggingColor(nextColor); 
    newGrid[row][col] = nextColor; 
    setGrid(newGrid);
  };

  // Handle mouse enter while dragging to apply the same color
  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      const newGrid = [...grid];
      newGrid[row][col] = draggingColor; 
      setGrid(newGrid);
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAlgorithmSelect = (algorithm, index) => {
    setSelectedAlgorithm(algorithm);
    setClickedButton(index);
  };

  const handleVisualize = async () => {
    const yellowCount = grid.flat().filter(cell => cell === 3).length;
    if (yellowCount === 0) {
      alert('Please select at least one start node (yellow cell).');
      return;
    }

    const yellowCountList = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 3) {
          yellowCountList.push([rowIndex, colIndex]);
        }
      });
    });

    try {
      const response = await fetch('https://graph-visualizer-server.onrender.com/visualize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          algorithm: selectedAlgorithm,
          grid: grid,
          startList: yellowCountList,
          nrows: m,
          ncols: n
        }),
      });

      const result = await response.json();
      if (result.error) {
        alert(result.error);
        return;
      }

      let Order = result.Order || [];
      visualizeBFS(Order);

    } catch (error) {
      console.error("Error visualizing algorithm:", error);
    }
  };

  const visualizeBFS = (Order) => {
    Order.forEach((cell, index) => {
      setTimeout(() => {
        const [row, col] = cell;
        const newGrid = [...grid];
        newGrid[row][col] = 2; 
        setGrid(newGrid);
      }, index * 100);
    });
  };

  const handleClearGrid = () => {
    setGrid(createEmptyGrid(m, n)); 
  };

  return (
    <div
      className="App"
      onMouseUp={handleMouseUp} // Detect mouse up to stop dragging
    >
      <div className="top-bar">
        <div className="title">Algo <text className="text">Visualizer</text></div>
        <div className="links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="Intro">
        <p>This is a project to help visualize the basic stuff for graphs. Enjoy :)</p>
      </div>

      <div className="algorithm-selection">
        <p>Choose an algorithm</p>
        {algorithms.map((algo, index) => (
          <button
            key={algo}
            className={`algo-button ${clickedButton === index ? 'selected' : ''}`}
            onClick={() => handleAlgorithmSelect(algo, index)}
          >
            {algo}
          </button>
        ))}
      </div>

      <div className="grid-container">
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`grid-cell ${getCellColor(cell)}`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="Pseudocode">
        <h3>Instructions</h3>
        {selectedAlgorithm ? <p>{getPseudocode(selectedAlgorithm)}</p> : <p>Select an algorithm to see the instructions</p>}
      </div>

      <div className="controls">
        <button className="visualize-button" onClick={handleVisualize}>Visualize Algorithm</button>
        <button className="clear-button" onClick={handleClearGrid}>Clear Grid</button>
      </div>
    </div>
  );
}

// Function to create an empty grid
const createEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const getPseudocode = (algorithm) => {
  switch (algorithm) {
    case "Breadth-first-search":
      return "Choose start node(s) (yellow)";
    case "Depth-first-search":
      return "Choose start node(s) (yellow)";
    case "Flood Fill":
      return "Choose start node(s) (yellow) and boundary node(s) (black)";
    default:
      return "Select an algorithm.";
  }
};

const getCellColor = (cell) => {
  switch (cell) {
    case 0:
      return "white";
    case 1:
      return "black";
    case 2:
      return "green";
    case 3:
      return "yellow";
    default:
      return "white";
  }
};

export default App;
