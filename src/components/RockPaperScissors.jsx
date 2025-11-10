import { useState } from "react";

const choices = [
  { id: "rock", emoji: "✊" },
  { id: "paper", emoji: "✋" },
  { id: "scissors", emoji: "✌️" },
];

function getResult(player, cpu) {
  if (player === cpu) return "draw";
  if (
    (player === "rock" && cpu === "scissors") ||
    (player === "paper" && cpu === "rock") ||
    (player === "scissors" && cpu === "paper")
  )
    return "win";
  return "lose";
}

export default function RockPaperScissors() {
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  function play(choice) {
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)].id;
    const outcome = getResult(choice, cpuChoice);
    setPlayer(choice);
    setCpu(cpuChoice);
    setResult(outcome);
    setScore((s) => ({ ...s, [outcome]: s[outcome] + 1 }));
  }

  function reset() {
    setPlayer(null);
    setCpu(null);
    setResult(null);
    setScore({ win: 0, lose: 0, draw: 0 });
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Rock • Paper • Scissors</h2>
        <button onClick={reset} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Reset</button>
      </div>

      <div className="flex gap-3 justify-center mb-4">
        {choices.map((c) => (
          <button
            key={c.id}
            onClick={() => play(c.id)}
            className="px-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow text-2xl"
          >
            {c.emoji}
          </button>
        ))}
      </div>

      {result && (
        <div className="text-center mb-4">
          <p className="text-gray-600">You: <span className="font-semibold capitalize">{player}</span> • CPU: <span className="font-semibold capitalize">{cpu}</span></p>
          {result === "win" && <p className="text-green-600 font-semibold">You win!</p>}
          {result === "lose" && <p className="text-red-600 font-semibold">You lose!</p>}
          {result === "draw" && <p className="text-amber-600 font-semibold">It's a draw.</p>}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Wins</p>
          <p className="text-xl font-bold text-green-600">{score.win}</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Losses</p>
          <p className="text-xl font-bold text-red-600">{score.lose}</p>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">Draws</p>
          <p className="text-xl font-bold text-amber-600">{score.draw}</p>
        </div>
      </div>
    </div>
  );
}
