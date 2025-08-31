import type { Bowl } from "../../entities/bowl";

export const filterBowls = (bowls: Bowl[], search: string, flavors: string[]) =>
  bowls.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) &&
      flavors.every((f) => b.tobaccos.some((t) => t.name === f)),
  );
