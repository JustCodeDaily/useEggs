interface GameOverOverlayProps {
  won: boolean;
  onReset: () => void;
}

export function GameOverOverlay({ won, onReset }: GameOverOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="mx-4 max-w-sm rounded-3xl bg-card p-8 text-center shadow-2xl border border-border animate-scale-in">
        <div className="mb-4 text-6xl">
          {won ? "🏆" : "😢"}
        </div>
        <h2 className="mb-2 text-2xl font-extrabold text-foreground">
          {won ? "You Found It!" : "Basket Full!"}
        </h2>
        <p className="mb-6 text-muted-foreground font-semibold">
          {won
            ? "Amazing! You cracked the golden egg! 🌟"
            : "Your basket is full and the golden egg is still hiding... Better luck next time!"}
        </p>
        <button
          onClick={onReset}
          className="hover-scale rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all active:scale-95"
        >
          {won ? "🎉 Play Again!" : "🔄 Try Again"}
        </button>
      </div>
    </div>
  );
}
