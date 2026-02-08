import type { Bowl, BowlTobacco } from "./bowl.types";

import {
  BOWL_RATING_MAX,
  BOWL_RATING_MIN,
  DEFAULT_BOWL_RATING,
  BOWL_STRENGTH_MAX,
  BOWL_STRENGTH_MIN,
  DEFAULT_BOWL_STRENGTH,
} from "./bowl.constants";

type BowlLike = {
  id: string;
  name?: unknown;
  tobaccos?: unknown;
  usePercentages?: unknown;
  rating?: unknown;
  strength?: unknown;
};

type BowlTobaccoLike = {
  name?: unknown;
  percentage?: unknown;
};

export const sanitizeMetric = (
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

const sanitizeTobacco = (
  tobacco: BowlTobaccoLike | undefined,
): BowlTobacco => ({
  name: typeof tobacco?.name === "string" ? tobacco.name : "",
  percentage:
    typeof tobacco?.percentage === "number" &&
    Number.isFinite(tobacco.percentage)
      ? tobacco.percentage
      : undefined,
});

export const sanitizeBowl = (bowl: BowlLike): Bowl => ({
  id: bowl.id,
  name: typeof bowl.name === "string" ? bowl.name : "",
  tobaccos: Array.isArray(bowl.tobaccos)
    ? bowl.tobaccos
        .filter(
          (item): item is BowlTobaccoLike =>
            typeof item === "object" && item !== null,
        )
        .map((tobacco) => sanitizeTobacco(tobacco))
    : [],
  usePercentages:
    typeof bowl.usePercentages === "boolean" ? bowl.usePercentages : true,
  rating: sanitizeMetric(
    bowl.rating,
    DEFAULT_BOWL_RATING,
    BOWL_RATING_MIN,
    BOWL_RATING_MAX,
  ),
  strength: sanitizeMetric(
    bowl.strength,
    DEFAULT_BOWL_STRENGTH,
    BOWL_STRENGTH_MIN,
    BOWL_STRENGTH_MAX,
  ),
});

export const sanitizeBowls = (value: unknown): Bowl[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is BowlLike =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof (item as { id: unknown }).id === "string",
    )
    .map((item) => sanitizeBowl(item));
};
