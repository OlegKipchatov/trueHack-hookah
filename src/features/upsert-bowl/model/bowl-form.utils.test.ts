import type { BowlTobacco } from "@/entities/bowl";

import { describe, expect, it } from "vitest";

import { calculateTotalPercentage, clampPercentage } from "./bowl-form.utils";

describe("clampPercentage", () => {
  it("returns zero for negative values", () => {
    expect(clampPercentage(-10, 50)).toBe(0);
  });

  it("returns zero when max is non-positive", () => {
    expect(clampPercentage(40, -5)).toBe(0);
    expect(clampPercentage(40, 0)).toBe(0);
  });

  it("caps value at max", () => {
    expect(clampPercentage(120, 80)).toBe(80);
  });

  it("keeps value when within bounds", () => {
    expect(clampPercentage(45, 90)).toBe(45);
  });
});

describe("calculateTotalPercentage", () => {
  it("sums percentages and skips undefined values", () => {
    const tobaccos: BowlTobacco[] = [
      { name: "Mint", percentage: 40 },
      { name: "Berry", percentage: undefined },
      { name: "Peach", percentage: 30 },
    ];

    expect(calculateTotalPercentage(tobaccos)).toBe(70);
  });

  it("returns zero for empty list", () => {
    expect(calculateTotalPercentage([])).toBe(0);
  });
});
