"use client";

import { useEffect } from "react";

import { initializeBowlsStore, useBowlsStore } from "./bowl-store";

export {
  BOWL_RATING_MAX,
  BOWL_RATING_MIN,
  DEFAULT_BOWL_RATING,
} from "./bowl.constants";
export { useBowlsStore } from "./bowl-store";
export type { Bowl, BowlSortOrder, BowlTobacco } from "./bowl.types";

export const useBowls = () => {
  useEffect(() => {
    initializeBowlsStore();
  }, []);

  return useBowlsStore((store) => store);
};
