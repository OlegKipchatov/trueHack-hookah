import type { Bowl } from "../../entities/bowl";

import { test } from "node:test";
import assert from "node:assert/strict";

import { filterBowls } from "./filter-bowls.ts";

const bowls: Bowl[] = [
  { id: "1", name: "Mint", tobaccos: [] },
  { id: "2", name: "Blueberry", tobaccos: [] },
];

const flavors: string[] = [];

test("filterBowls matches regardless of search case", () => {
  const result = filterBowls(bowls, "mInT", flavors);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "1");
});

test("filterBowls matches for uppercase query", () => {
  const result = filterBowls(bowls, "BLUE", flavors);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "2");
});
