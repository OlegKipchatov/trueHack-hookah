import type { Bowl, BowlSortOrder } from "@/entities/bowl";

const sortBowls = (bowls: Bowl[], sortOrder: BowlSortOrder): Bowl[] => {
  if (sortOrder === "default") {
    return bowls;
  }

  const withIndex = bowls.map((bowl, index) => ({ bowl, index }));

  return withIndex
    .sort((a, b) => {
      if (sortOrder === "rating-desc") {
        if (b.bowl.rating !== a.bowl.rating) {
          return b.bowl.rating - a.bowl.rating;
        }
      }

      if (sortOrder === "rating-asc") {
        if (a.bowl.rating !== b.bowl.rating) {
          return a.bowl.rating - b.bowl.rating;
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
  sortOrder: BowlSortOrder,
) => {
  const filtered = bowls.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      flavors.every((f) => b.tobaccos.some((t) => t.name === f)),
  );

  return sortBowls(filtered, sortOrder);
};
