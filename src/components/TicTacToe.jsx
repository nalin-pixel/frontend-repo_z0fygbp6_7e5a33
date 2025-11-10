import { useState } from "react";

const initialBoard = Array(9).fill(null);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every((s) => s !== null)) return "draw";
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(initialBoard);
    setXIsNext(true);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tic Tac Toe</h2>
        <button onClick={reset} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Reset</button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="aspect-square rounded-lg border border-gray-200 bg-white text-3xl font-bold flex items-center justify-center shadow-sm hover:shadow transition"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        {!winner && (
          <p className="text-gray-600">Turn: <span className="font-semibold">{xIsNext ? "X" : "O"}</span></p>
        )}
        {winner && winner !== "draw" && (
          <p className="text-green-600 font-semibold">Winner: {winner}</p>
        )}
        {winner === "draw" && (
          <p className="text-amber-600 font-semibold">It's a draw!</p>
        )}
      </div>
    </div>
  );
}
