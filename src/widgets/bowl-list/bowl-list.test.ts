import type { Bowl } from "@/entities/bowl";

import { describe, expect, it } from "vitest";

import { filterBowls } from "./filter-bowls.ts";

const bowls: Bowl[] = [
  { id: "1", name: "Mint", tobaccos: [], rating: 3, strength: 4 },
  { id: "2", name: "Blueberry", tobaccos: [], rating: 5, strength: 5 },
];

const bowlsWithFlavors: Bowl[] = [
  {
    id: "3",
    name: "Mint Lemon",
    tobaccos: [
      { name: "mint", percentage: 50 },
      { name: "lemon", percentage: 50 },
    ],
    rating: 4,
    strength: 3,
  },
  {
    id: "4",
    name: "Mint",
    tobaccos: [{ name: "mint", percentage: 100 }],
    rating: 2,
    strength: 2,
  },
];

const flavors: string[] = [];

describe("filterBowls", () => {
  it("matches regardless of search case", () => {
    const result = filterBowls(bowls, "mInT", flavors, "default");

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("1");
  });

  it("matches for uppercase query", () => {
    const result = filterBowls(bowls, "BLUE", flavors, "default");

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("2");
  });

  it("returns bowls containing all specified flavors", () => {
    const result = filterBowls(
      bowlsWithFlavors,
      "",
      ["mint", "lemon"],
      "default",
    );

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("3");
  });

  it("does not return bowls when at least one flavor is missing", () => {
    const result = filterBowls(
      bowlsWithFlavors,
      "",
      ["mint", "blueberry"],
      "default",
    );

    expect(result.length).toBe(0);
  });

  it("keeps original order for default sort", () => {
    const orderedBowls: Bowl[] = [
      { id: "5", name: "First", tobaccos: [], rating: 4, strength: 4 },
      { id: "6", name: "Second", tobaccos: [], rating: 5, strength: 5 },
      { id: "7", name: "Third", tobaccos: [], rating: 3, strength: 3 },
    ];

    const result = filterBowls(orderedBowls, "", [], "default");

    expect(result.map((b) => b.id)).toEqual(["5", "6", "7"]);
  });

  it("sorts bowls by rating descending", () => {
    const mixedBowls: Bowl[] = [
      { id: "8", name: "Low", tobaccos: [], rating: 2, strength: 2 },
      { id: "9", name: "High", tobaccos: [], rating: 5, strength: 5 },
      { id: "10", name: "Medium", tobaccos: [], rating: 4, strength: 4 },
    ];

    const result = filterBowls(mixedBowls, "", [], "rating-desc");

    expect(result.map((b) => b.id)).toEqual(["9", "10", "8"]);
  });

  it("sorts bowls by rating ascending while keeping ties stable", () => {
    const mixedBowls: Bowl[] = [
      { id: "11", name: "High", tobaccos: [], rating: 5, strength: 5 },
      { id: "12", name: "High 2", tobaccos: [], rating: 5, strength: 4 },
      { id: "13", name: "Low", tobaccos: [], rating: 2, strength: 2 },
    ];

    const result = filterBowls(mixedBowls, "", [], "rating-asc");

    expect(result.map((b) => b.id)).toEqual(["13", "11", "12"]);
  });
});
