import { describe, expect, it } from "vitest";

import {
  BOWL_RATING_MAX,
  BOWL_RATING_MIN,
  DEFAULT_BOWL_RATING,
} from "./bowl.constants";
import { sanitizeBowl, sanitizeBowls, sanitizeMetric } from "./bowl-normalize";

const createBowl = (
  overrides: Partial<Parameters<typeof sanitizeBowl>[0]> = {},
) => ({
  id: "bowl-id",
  name: "Test",
  tobaccos: [],
  usePercentages: true,
  rating: DEFAULT_BOWL_RATING,
  ...overrides,
});

describe("sanitizeMetric", () => {
  it("returns fallback for non-number values", () => {
    expect(
      sanitizeMetric(
        "invalid",
        DEFAULT_BOWL_RATING,
        BOWL_RATING_MIN,
        BOWL_RATING_MAX,
      ),
    ).toBe(DEFAULT_BOWL_RATING);
  });

  it("rounds and clamps to min", () => {
    expect(sanitizeMetric(1.2, DEFAULT_BOWL_RATING, 2, BOWL_RATING_MAX)).toBe(
      2,
    );
  });

  it("rounds and clamps to max", () => {
    expect(sanitizeMetric(9.7, DEFAULT_BOWL_RATING, BOWL_RATING_MIN, 4)).toBe(
      4,
    );
  });
});

describe("sanitizeBowl", () => {
  it("fills missing optional fields with defaults", () => {
    const result = sanitizeBowl(
      createBowl({
        name: undefined,
        usePercentages: undefined,
        rating: Number.NaN,
        tobaccos: [
          { name: undefined, percentage: undefined },
          { name: "Mint", percentage: 33.3 },
          { name: "Lime", percentage: Number.POSITIVE_INFINITY },
        ],
      }),
    );

    expect(result).toEqual({
      id: "bowl-id",
      name: "",
      tobaccos: [
        { name: "", percentage: undefined },
        { name: "Mint", percentage: 33.3 },
        { name: "Lime", percentage: undefined },
      ],
      usePercentages: true,
      rating: DEFAULT_BOWL_RATING,
    });
  });
});

describe("sanitizeBowls", () => {
  it("returns empty array for non-array input", () => {
    expect(sanitizeBowls(null)).toEqual([]);
  });

  it("filters out entries without string ids and sanitizes remaining bowls", () => {
    const sanitized = sanitizeBowls([
      { ...createBowl(), id: 42 },
      { ...createBowl({ id: "valid-id", name: undefined, rating: 10 }) },
    ]);

    expect(sanitized).toHaveLength(1);
    expect(sanitized[0]).toMatchObject({
      id: "valid-id",
      name: "",
      rating: BOWL_RATING_MAX,
    });
  });
});
