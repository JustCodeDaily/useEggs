interface EggBannerProps {
  justFound: boolean;
}

export function EggBanner({ justFound }: EggBannerProps) {
  return (
    <div
      className={`mb-6 rounded-2xl border-2 border-golden bg-accent/30 p-4 text-center shadow-lg transition-all ${
        justFound ? "scale-105" : "scale-100"
      }`}
      style={justFound ? { animation: "golden-glow 1s ease-in-out infinite" } : {}}
    >
      <span className="text-3xl">🌟</span>
      <p className="text-lg font-extrabold text-foreground">
        {justFound ? "WOW! You found the Golden Egg! ✨" : "Golden Egg secured! 🏆"}
      </p>
      <p className="text-sm text-muted-foreground font-semibold">
        Only the luckiest hunters find this treasure!
      </p>
    </div>
  );
}
