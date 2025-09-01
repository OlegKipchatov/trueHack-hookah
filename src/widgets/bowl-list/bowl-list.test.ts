import type { Bowl } from "../../entities/bowl";

import { describe, expect, it } from "vitest";

import { filterBowls } from "./filter-bowls.ts";

const bowls: Bowl[] = [
  { id: "1", name: "Mint", tobaccos: [] },
  { id: "2", name: "Blueberry", tobaccos: [] },
];

const bowlsWithFlavors: Bowl[] = [
  {
    id: "3",
    name: "Mint Lemon",
    tobaccos: [
      { name: "mint", percentage: 50 },
      { name: "lemon", percentage: 50 },
    ],
  },
  {
    id: "4",
    name: "Mint",
    tobaccos: [{ name: "mint", percentage: 100 }],
  },
];

const flavors: string[] = [];

describe("filterBowls", () => {
  it("matches regardless of search case", () => {
    const result = filterBowls(bowls, "mInT", flavors);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("1");
  });

  it("matches for uppercase query", () => {
    const result = filterBowls(bowls, "BLUE", flavors);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("2");
  });

  it("returns bowls containing all specified flavors", () => {
    const result = filterBowls(bowlsWithFlavors, "", ["mint", "lemon"]);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("3");
  });

  it("does not return bowls when at least one flavor is missing", () => {
    const result = filterBowls(bowlsWithFlavors, "", ["mint", "blueberry"]);

    expect(result.length).toBe(0);
  });
});
