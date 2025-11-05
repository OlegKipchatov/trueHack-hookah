import type { BowlTobacco } from "@/entities/bowl";

export const clampPercentage = (value: number, max: number) => {
  const safeValue = Number.isFinite(value) ? value : 0;
  const safeMax = Number.isFinite(max) ? max : 0;

  if (safeMax <= 0) {
    return 0;
  }

  if (safeValue <= 0) {
    return 0;
  }

  if (safeValue >= safeMax) {
    return safeMax;
  }

  return safeValue;
};

export const calculateTotalPercentage = (tobaccos: BowlTobacco[]) =>
  tobaccos.reduce((sum, tobacco) => sum + (tobacco.percentage ?? 0), 0);
