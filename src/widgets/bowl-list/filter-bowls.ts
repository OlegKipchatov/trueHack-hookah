import type {
  Bowl,
  BowlRatingSortOrder,
  BowlStrengthSortOrder,
} from "@/entities/bowl";

const compareRating = (a: Bowl, b: Bowl, sortOrder: BowlRatingSortOrder) => {
  if (sortOrder === "rating-desc") {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
  }

  if (sortOrder === "rating-asc") {
    if (a.rating !== b.rating) {
      return a.rating - b.rating;
    }
  }

  return 0;
};

const compareStrength = (
  a: Bowl,
  b: Bowl,
  sortOrder: BowlStrengthSortOrder,
) => {
  if (sortOrder === "strength-desc") {
    if (b.strength !== a.strength) {
      return b.strength - a.strength;
    }
  }

  if (sortOrder === "strength-asc") {
    if (a.strength !== b.strength) {
      return a.strength - b.strength;
    }
  }

  return 0;
};

const sortBowls = (
  bowls: Bowl[],
  ratingSortOrder: BowlRatingSortOrder,
  strengthSortOrder: BowlStrengthSortOrder,
): Bowl[] => {
  if (ratingSortOrder === "default" && strengthSortOrder === "default") {
    return bowls;
  }

  const withIndex = bowls.map((bowl, index) => ({ bowl, index }));

  return withIndex
    .sort((a, b) => {
      if (ratingSortOrder !== "default") {
        const ratingDelta = compareRating(a.bowl, b.bowl, ratingSortOrder);

        if (ratingDelta !== 0) {
          return ratingDelta;
        }
      }

      if (strengthSortOrder !== "default") {
        const strengthDelta = compareStrength(
          a.bowl,
          b.bowl,
          strengthSortOrder,
        );

        if (strengthDelta !== 0) {
          return strengthDelta;
        }
      }

      return a.index - b.index;
    })
    .map(({ bowl }) => bowl);
};

export const filterBowls = (
  bowls: Bowl[],
  search: string,
  flavors: string[],
  ratingSortOrder: BowlRatingSortOrder,
  strengthSortOrder: BowlStrengthSortOrder,
) => {
  const filtered = bowls.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      flavors.every((f) => b.tobaccos.some((t) => t.name === f)),
  );

  return sortBowls(filtered, ratingSortOrder, strengthSortOrder);
};
