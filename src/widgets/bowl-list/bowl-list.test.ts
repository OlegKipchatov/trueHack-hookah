import type { Bowl } from "../../entities/bowl";

import { describe, expect, it } from "vitest";

import { filterBowls } from "./filter-bowls.ts";

const bowls: Bowl[] = [
  { id: "1", name: "Mint", tobaccos: [] },
  { id: "2", name: "Blueberry", tobaccos: [] },
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
});
