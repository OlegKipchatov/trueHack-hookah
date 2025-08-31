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
    setBowls([...bowls, bowl]);
  };

  const updateBowl = (bowl: Bowl) => {
    setBowls(bowls.map((item) => (item.id === bowl.id ? bowl : item)));
  };

  return { bowls, addBowl, updateBowl } as const;
};
