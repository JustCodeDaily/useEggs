interface BugsBunnyProps {
  basketUsed: number;
  basketCapacity: number;
  won: boolean;
  gameOver: boolean;
}

export function BugsBunny({ basketUsed, basketCapacity, won, gameOver }: BugsBunnyProps) {
  const getMessage = () => {
    if (won) return "🎉 Hippity hoppity, you found the gold!";
    if (gameOver) return "Oh no! The golden egg got away... 🥲";
    if (basketUsed === 0) return "Click an egg to crack it open! 🐣";
    if (basketUsed >= basketCapacity - 1) return "Last chance... choose wisely! 😰";
    if (basketUsed >= basketCapacity - 2) return "Running out of room! 🫣";
    return "Keep going, you've got this! 🐇💨";
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <div className="rounded-2xl bg-card border border-border px-5 py-3 shadow-md max-w-xs">
        <p className="text-center text-sm font-bold text-foreground">
          {getMessage()}
        </p>
      </div>
    </div>
  );
}
