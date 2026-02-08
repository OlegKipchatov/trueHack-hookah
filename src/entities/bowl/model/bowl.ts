"use client";

import { useEffect } from "react";

import { initializeBowlsStore, useBowlsStore } from "./bowl-store";

export {
  BOWL_RATING_MAX,
  BOWL_RATING_MIN,
  DEFAULT_BOWL_RATING,
  BOWL_STRENGTH_MAX,
  BOWL_STRENGTH_MIN,
  DEFAULT_BOWL_STRENGTH,
} from "./bowl.constants";
export { useBowlsStore } from "./bowl-store";
export type {
  Bowl,
  BowlRatingSortOrder,
  BowlStrengthSortOrder,
  BowlTobacco,
} from "./bowl.types";

export const useBowls = () => {
  useEffect(() => {
    initializeBowlsStore();
  }, []);

  return useBowlsStore((store) => store);
};
