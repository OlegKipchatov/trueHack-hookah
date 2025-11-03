export type BowlSortOrder = "default" | "rating-desc" | "rating-asc";

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
};
