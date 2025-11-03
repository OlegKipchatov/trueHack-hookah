"use client";

import { useEffect, useState } from "react";

import { useLocalStorage } from "@/shared/lib/useLocalStorage";

export const BOWL_RATING_MIN = 1;
export const BOWL_RATING_MAX = 5;
export const DEFAULT_BOWL_RATING = 3;

export type BowlSortOrder = "default" | "rating-desc" | "rating-asc";

export type BowlTobacco = {
  name: string;
  percentage?: number;
};

export type Bowl = {
  id: string;
  name: string;
  tobaccos: BowlTobacco[];
  usePercentages?: boolean;
  rating: number;
};

export const useBowls = () => {
  const [bowls, setBowls] = useLocalStorage<Bowl[]>("bowls", []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sanitizeMetric = (
      value: unknown,
      fallback: number,
      min: number,
      max: number,
    ) => {
      if (typeof value !== "number" || Number.isNaN(value)) {
        return fallback;
      }

      const rounded = Math.round(value);

      if (rounded < min) return min;
      if (rounded > max) return max;

      return rounded;
    };

    setBowls((prev) =>
      prev.map((b) => ({
        ...b,
        name: b.name ?? "",
        usePercentages: b.usePercentages ?? true,
        rating: sanitizeMetric(
          b.rating,
          DEFAULT_BOWL_RATING,
          BOWL_RATING_MIN,
          BOWL_RATING_MAX,
        ),
      })),
    );
    setIsLoading(false);
  }, [setBowls]);

  const addBowl = (bowl: Bowl) => {
    setBowls((prev) => [...prev, bowl]);
  };

  const updateBowl = (bowl: Bowl) => {
    setBowls((prev) => prev.map((item) => (item.id === bowl.id ? bowl : item)));
  };

  const removeBowl = (id: string) => {
    setBowls((prev) => prev.filter((item) => item.id !== id));
  };

  return { bowls, addBowl, updateBowl, removeBowl, isLoading } as const;
};
