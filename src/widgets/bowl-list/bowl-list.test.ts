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
    const result = filterBowls(bowls, "mInT", flavors, "default", "default");

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("1");
  });

  it("matches for uppercase query", () => {
    const result = filterBowls(bowls, "BLUE", flavors, "default", "default");

    expect(result.length).toBe(1);
    expect(result[0].id).toBe("2");
  });

  it("returns bowls containing all specified flavors", () => {
    const result = filterBowls(
      bowlsWithFlavors,
      "",
      ["mint", "lemon"],
      "default",
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

    const result = filterBowls(orderedBowls, "", [], "default", "default");

    expect(result.map((b) => b.id)).toEqual(["5", "6", "7"]);
  });

  it("sorts bowls by rating descending", () => {
    const mixedBowls: Bowl[] = [
      { id: "8", name: "Low", tobaccos: [], rating: 2, strength: 2 },
      { id: "9", name: "High", tobaccos: [], rating: 5, strength: 5 },
      { id: "10", name: "Medium", tobaccos: [], rating: 4, strength: 4 },
    ];

    const result = filterBowls(mixedBowls, "", [], "rating-desc", "default");

    expect(result.map((b) => b.id)).toEqual(["9", "10", "8"]);
  });

  it("sorts bowls by rating ascending while keeping ties stable", () => {
    const mixedBowls: Bowl[] = [
      { id: "11", name: "High", tobaccos: [], rating: 5, strength: 5 },
      { id: "12", name: "High 2", tobaccos: [], rating: 5, strength: 4 },
      { id: "13", name: "Low", tobaccos: [], rating: 2, strength: 2 },
    ];

    const result = filterBowls(mixedBowls, "", [], "rating-asc", "default");

    expect(result.map((b) => b.id)).toEqual(["13", "11", "12"]);
  });

  it("sorts bowls by strength descending", () => {
    const mixedBowls: Bowl[] = [
      { id: "14", name: "Mild", tobaccos: [], rating: 3, strength: 2 },
      { id: "15", name: "Strong", tobaccos: [], rating: 4, strength: 8 },
      { id: "16", name: "Medium", tobaccos: [], rating: 5, strength: 5 },
    ];

    const result = filterBowls(mixedBowls, "", [], "default", "strength-desc");

    expect(result.map((b) => b.id)).toEqual(["15", "16", "14"]);
  });

  it("sorts bowls by strength ascending while keeping ties stable", () => {
    const mixedBowls: Bowl[] = [
      { id: "17", name: "Strong", tobaccos: [], rating: 3, strength: 8 },
      { id: "18", name: "Strong 2", tobaccos: [], rating: 4, strength: 8 },
      { id: "19", name: "Mild", tobaccos: [], rating: 2, strength: 2 },
    ];

    const result = filterBowls(mixedBowls, "", [], "default", "strength-asc");

    expect(result.map((b) => b.id)).toEqual(["19", "17", "18"]);
  });

  it("applies rating sort before strength sort", () => {
    const mixedBowls: Bowl[] = [
      { id: "20", name: "Top", tobaccos: [], rating: 5, strength: 2 },
      { id: "21", name: "Top Strong", tobaccos: [], rating: 5, strength: 9 },
      { id: "22", name: "Low", tobaccos: [], rating: 3, strength: 10 },
    ];

    const result = filterBowls(
      mixedBowls,
      "",
      [],
      "rating-desc",
      "strength-asc",
    );

    expect(result.map((b) => b.id)).toEqual(["20", "21", "22"]);
  });
});
