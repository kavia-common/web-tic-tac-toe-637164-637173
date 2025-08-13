import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState(null); // 'computer' or 'player'

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getGameStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every(square => square !== null)) {
      return "Draw!";
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    if (gameMode === 'computer' && !calculateWinner(newBoard)) {
      // Computer's turn
      setTimeout(() => {
        const emptySquares = newBoard
          .map((square, index) => square === null ? index : null)
          .filter(index => index !== null);

        if (emptySquares.length > 0) {
          const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const computerBoard = newBoard.slice();
          computerBoard[randomIndex] = 'O';
          setBoard(computerBoard);
          setIsXNext(true);
        }
      }, 500);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const startGame = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      {!gameMode ? (
        <div className="controls">
          <button className="button button-primary" onClick={() => startGame('player')}>
            Play vs Player
          </button>
          <button className="button button-accent" onClick={() => startGame('computer')}>
            Play vs Computer
          </button>
        </div>
      ) : (
        <>
          <div className="game-status">{getGameStatus()}</div>
          <div className="game-board">
            {board.map((square, i) => (
              <Square
                key={i}
                value={square}
                onClick={() => handleClick(i)}
              />
            ))}
          </div>
          <div className="controls">
            <button className="button button-secondary" onClick={resetGame}>
              Reset Game
            </button>
            <button className="button button-primary" onClick={() => setGameMode(null)}>
              New Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
