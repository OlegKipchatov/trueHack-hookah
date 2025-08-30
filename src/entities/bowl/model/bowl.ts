'use client';

import { useLocalStorage } from '@/shared/lib/useLocalStorage';

export type BowlTobacco = {
  name: string;
  percentage: number;
};

export type Bowl = {
  id: string;
  tobaccos: BowlTobacco[];
};

export const useBowls = () => {
  const [bowls, setBowls] = useLocalStorage<Bowl[]>('bowls', []);

  const addBowl = (bowl: Bowl) => {
    setBowls((prev) => [...prev, bowl]);
  };

  return { bowls, addBowl } as const;
};
