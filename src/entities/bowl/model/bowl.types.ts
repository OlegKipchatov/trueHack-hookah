export type BowlRatingSortOrder = "default" | "rating-desc" | "rating-asc";

export type BowlStrengthSortOrder =
  | "default"
  | "strength-desc"
  | "strength-asc";

export type BowlTobacco = {
  name: string;
  percentage?: number;
};

export type Bowl = {
  id: string;
  name: string;
  tobaccos: BowlTobacco[];
  usePercentages?: boolean;
  rating: number;
  strength: number;
};
