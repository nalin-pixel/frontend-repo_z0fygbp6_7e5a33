import { useState } from "react";
import { Gamepad2, Trophy, Sparkles } from "lucide-react";
import TicTacToe from "./components/TicTacToe.jsx";
import RockPaperScissors from "./components/RockPaperScissors.jsx";
import MemoryFlip from "./components/MemoryFlip.jsx";

const games = [
  { id: "ttt", name: "Tic Tac Toe", component: TicTacToe, description: "Classic X vs O strategy." },
  { id: "rps", name: "Rock Paper Scissors", component: RockPaperScissors, description: "Beat the CPU in best-of-anything." },
  { id: "mem", name: "Memory Flip", component: MemoryFlip, description: "Match all the pairs." },
];

export default function App() {
  const [active, setActive] = useState(games[0].id);
  const ActiveGame = games.find((g) => g.id === active).component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/60 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Gamepad2 className="w-7 h-7" />
            <span className="font-extrabold text-xl">Playground</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Casual fun</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>No signup needed</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Pick a game and start playing
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Three bite‑sized games, built-in scoreboard and smooth UI. Switch anytime.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={`text-left rounded-2xl p-4 border shadow-sm transition hover:shadow-md bg-white ${
                active === g.id ? "ring-2 ring-indigo-500" : "border-gray-100"
              }`}
            >
              <div className="font-semibold text-gray-900">{g.name}</div>
              <div className="text-sm text-gray-600 mt-1">{g.description}</div>
            </button>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-100 shadow-sm">
          <ActiveGame />
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">
        Built with ❤️ for quick fun.
      </footer>
    </div>
  );
}
