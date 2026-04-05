import { useEggs } from "../hooks/useEggs";
import { EggCards } from "./EggCards";
import { EggGrid } from "./EggsGrid";
import { BugsBunny } from "./BugsBunny";
import { GameOverOverlay } from "./GameOverLay";

export function EggHuntDashboard() {
  const hunt = useEggs();

  if (hunt.loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <div className="text-6xl animate-bounce-gentle">🥚</div>
        <p className="text-lg font-semibold text-muted-foreground">
          Hiding the eggs...
        </p>
        <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: "70%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-muted-foreground font-semibold">
            🐣 Find the Golden Egg before your basket is full! 🐣
          </p>
        </header>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <EggCards
            emoji="🌟"
            label="Golden Egg Found"
            value={hunt.goldenEggFound ? "Yes! 🏆" : "No"}
            color={hunt.goldenEggFound ? "bg-accent/60" : "bg-easter-pink"}
          />
          <EggCards
            emoji="🥚"
            label="Eggs Left to Crack"
            value={hunt.eggsLeft}
            color="bg-easter-blue"
          />
          <EggCards
            emoji="🧺"
            label={`Basket (${hunt.basketUsed}/${hunt.basketCapacity})`}
            value={hunt.basketCapacity - hunt.basketUsed}
            subtext="spots left"
            color="bg-easter-green"
          />
        </div>

        {/* Basket Progress */}
        <div className="mb-6 rounded-2xl bg-card border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-muted-foreground">🧺 Basket</span>
            <span className="text-sm font-bold text-foreground">
              {hunt.basketUsed} / {hunt.basketCapacity}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                hunt.basketUsed >= hunt.basketCapacity ? "bg-destructive" : "bg-primary"
              }`}
              style={{ width: `${(hunt.basketUsed / hunt.basketCapacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Egg Grid */}
        <EggGrid
          eggs={hunt.eggs}
          onCrack={hunt.crackEgg}
          gameOver={hunt.gameOver}
        />

        {/* Reset */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={hunt.resetHunt}
            className="hover-scale rounded-full border-2 border-border bg-card px-8 py-3 text-lg font-bold text-foreground shadow-sm transition-all active:scale-95"
          >
            🔄 Reset Hunt
          </button>
        </div>

        {/* Bunny */}
        <BugsBunny
          basketUsed={hunt.basketUsed}
          basketCapacity={hunt.basketCapacity}
          won={hunt.won}
          gameOver={hunt.gameOver}
        />
      </div>

      {/* Game Over Overlay */}
      {hunt.gameOver && (
        <GameOverOverlay won={hunt.won} onReset={hunt.resetHunt} />
      )}
    </div>
  );
}
