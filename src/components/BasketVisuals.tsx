interface BasketVisualProps {
  eggsFound: number;
  capacity: number;
  shaking: boolean;
  goldenEggFound: boolean;
}

const EGG_COLORS = ["🥚", "🩷", "🩵", "💜", "💛", "🩷", "🩵", "💜", "💛", "🥚", "🩷", "🩵"];

export function BasketVisual({ eggsFound, capacity, shaking, goldenEggFound }: BasketVisualProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative rounded-3xl border-2 border-border bg-card p-6 shadow-xl transition-all ${
          shaking ? "animate-shake" : ""
        }`}
      >
        <div className="mb-3 text-center text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Your Basket
        </div>
        <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
          {Array.from({ length: capacity }).map((_, i) => (
            <div
              key={i}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xl transition-all duration-300 ${
                i < eggsFound
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-20"
              }`}
            >
              {i < eggsFound ? (
                goldenEggFound && i === eggsFound - 1 ? "✨" : EGG_COLORS[i % EGG_COLORS.length]
              ) : (
                "🥚"
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(eggsFound / capacity) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-center text-xs font-semibold text-muted-foreground">
          {eggsFound} / {capacity}
        </div>
      </div>
    </div>
  );
}
