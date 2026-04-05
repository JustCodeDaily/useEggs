import { useState } from "react";

interface EggGridProps {
  eggs: { id: number; revealed: boolean; isGolden: boolean }[];
  onCrack: (id: number) => void;
  gameOver: boolean;
}

const PASTEL_PATTERNS = [
  "🩷", "🩵", "💜", "💛", "💚", "🤍", "🩷", "🩵", "💜", "💛",
];

export function EggGrid({ eggs, onCrack, gameOver }: EggGridProps) {
  const [cracking, setCracking] = useState<number | null>(null);

  const handleClick = (id: number) => {
    if (gameOver) return;
    const egg = eggs.find((e) => e.id === id);
    if (!egg || egg.revealed) return;

    setCracking(id);
    setTimeout(() => {
      onCrack(id);
      setCracking(null);
    }, 300);
  };

  return (
    <div className="grid grid-cols-5 gap-4 sm:gap-5">
      {eggs.map((egg) => (
        <button
          key={egg.id}
          onClick={() => handleClick(egg.id)}
          disabled={egg.revealed || gameOver}
          className={`
            relative aspect-square rounded-2xl text-4xl sm:text-5xl
            flex items-center justify-center
            transition-all duration-300 
            ${
              egg.revealed
                ? egg.isGolden
                  ? "bg-accent/50 scale-110 shadow-xl"
                  : "bg-muted/60 scale-95 opacity-60"
                : "bg-card border-2 border-border shadow-md cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
            }
            ${cracking === egg.id ? "animate-shake" : ""}
            ${!egg.revealed && !gameOver ? "hover-scale" : ""}
          `}
          style={
            egg.revealed && egg.isGolden
              ? { animation: "golden-glow 1.5s ease-in-out infinite" }
              : {}
          }
        >
          {egg.revealed ? (
            egg.isGolden ? (
              <span className="drop-shadow-lg">🌟</span>
            ) : (
              <span className="opacity-50">💔</span>
            )
          ) : (
            <span>{PASTEL_PATTERNS[egg.id % PASTEL_PATTERNS.length]}</span>
          )}

          {/* Masked overlay for unrevealed */}
          {!egg.revealed && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
              <span className="text-4xl sm:text-5xl">🥚</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
