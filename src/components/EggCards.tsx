interface EggCardsProps {
  emoji: string;
  label: string;
  value: string | number;
  color: string;
  subtext?: string;
}

export function EggCards({ emoji, label, value, color, subtext }: EggCardsProps) {
  return (
    <div className={`${color} rounded-2xl p-4 shadow-md transition-all hover-scale text-center`}>
      <div className="mb-1 text-2xl">{emoji}</div>
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
      {subtext && <div className="text-xs font-semibold text-muted-foreground">{subtext}</div>}
      <div className="text-xs font-semibold text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
