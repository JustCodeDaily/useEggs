import { useState, useCallback, useEffect } from "react";

export interface EggHuntState {
  eggs: { id: number; revealed: boolean; isGolden: boolean }[];
  eggsLeft: number;
  basketCapacity: number;
  basketUsed: number;
  goldenEggFound: boolean;
  gameOver: boolean;
  won: boolean;
  loading: boolean;
}

export interface EggHuntActions {
  crackEgg: (id: number) => void;
  resetHunt: () => void;
}

const TOTAL_EGGS = 10;
const BASKET_CAPACITY = 6;

function shuffleGolden(): number {
  return Math.floor(Math.random() * TOTAL_EGGS);
}

function createEggs(goldenIndex: number) {
  return Array.from({ length: TOTAL_EGGS }, (_, i) => ({
    id: i,
    revealed: false,
    isGolden: i === goldenIndex,
  }));
}

export function useEggs(): EggHuntState & EggHuntActions {
  const [loading, setLoading] = useState(true);
  const [goldenIndex, setGoldenIndex] = useState(() => shuffleGolden());
  const [eggs, setEggs] = useState(() => createEggs(goldenIndex));
  const [basketUsed, setBasketUsed] = useState(0);
  const [goldenEggFound, setGoldenEggFound] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const eggsLeft = TOTAL_EGGS - eggs.filter((e) => e.revealed).length;
  const won = goldenEggFound;

  const crackEgg = useCallback(
    (id: number) => {
      if (gameOver || goldenEggFound) return;

      setEggs((prev) =>
        prev.map((egg) => (egg.id === id && !egg.revealed ? { ...egg, revealed: true } : egg))
      );

      const egg = eggs.find((e) => e.id === id);
      if (!egg || egg.revealed) return;

      if (egg.isGolden) {
        setGoldenEggFound(true);
        setGameOver(true);
      } else {
        const newBasketUsed = basketUsed + 1;
        setBasketUsed(newBasketUsed);
        if (newBasketUsed >= BASKET_CAPACITY) {
          setGameOver(true);
        }
      }
    },
    [eggs, basketUsed, gameOver, goldenEggFound]
  );

  const resetHunt = useCallback(() => {
    const newGolden = shuffleGolden();
    setGoldenIndex(newGolden);
    setEggs(createEggs(newGolden));
    setBasketUsed(0);
    setGoldenEggFound(false);
    setGameOver(false);
  }, []);

  return {
    eggs,
    eggsLeft,
    basketCapacity: BASKET_CAPACITY,
    basketUsed,
    goldenEggFound,
    gameOver,
    won,
    loading,
    crackEgg,
    resetHunt,
  };
}
