import { useEffect, useMemo, useState } from "react";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const EMOJIS = ["🍎","🍌","🍇","🍓","🍒","🍍","🥑","🥕" ];

export default function MemoryFlip() {
  const tiles = useMemo(() => shuffle([...EMOJIS, ...EMOJIS].map((e, i) => ({ id: i, value: e }))), []);
  const [flipped, setFlipped] = useState([]); // indices
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      setMoves((m) => m + 1);
      if (tiles[a].value === tiles[b].value) {
        setMatched((prev) => new Set([...prev, tiles[a].value]));
        setTimeout(() => setFlipped([]), 600);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, tiles]);

  function handleFlip(index) {
    if (flipped.includes(index) || flipped.length === 2) return;
    const val = tiles[index].value;
    if ([...matched].includes(val)) return;
    setFlipped((f) => [...f, index]);
  }

  function reset() {
    window.location.reload();
  }

  const allMatched = matched.size === EMOJIS.length;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Memory Flip</h2>
        <button onClick={reset} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Reset</button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {tiles.map((t, idx) => {
          const isFlipped = flipped.includes(idx);
          const isMatched = [...matched].includes(t.value);
          return (
            <button
              key={t.id}
              onClick={() => handleFlip(idx)}
              className={`aspect-square rounded-lg border border-gray-200 shadow-sm transition transform ${isFlipped || isMatched ? "bg-white" : "bg-gray-100 hover:scale-[1.02]"}`}
            >
              <span className={`text-2xl transition-opacity ${isFlipped || isMatched ? "opacity-100" : "opacity-0"}`}>{t.value}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center text-gray-600">
        <p>Moves: <span className="font-semibold">{moves}</span></p>
        {allMatched && <p className="text-green-600 font-semibold mt-2">Great job! You matched them all.</p>}
      </div>
    </div>
  );
}
