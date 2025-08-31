"use client";

import { useLocalStorage } from "@/shared/lib/useLocalStorage";

export type BowlTobacco = {
  name: string;
  percentage: number;
};

export type Bowl = {
  id: string;
  tobaccos: BowlTobacco[];
};

export const useBowls = () => {
  const [bowls, setBowls] = useLocalStorage<Bowl[]>("bowls", []);

  const addBowl = (bowl: Bowl) => {
    setBowls((prev) => [...prev, bowl]);
  };

  const updateBowl = (bowl: Bowl) => {
    setBowls((prev) => prev.map((item) => (item.id === bowl.id ? bowl : item)));
  };

  const removeBowl = (id: string) => {
    setBowls((prev) => prev.filter((item) => item.id !== id));
  };

  return { bowls, addBowl, updateBowl, removeBowl } as const;
};
