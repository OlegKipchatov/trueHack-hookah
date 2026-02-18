import type { BowlTobacco } from "../model/bowl";

import { Chip } from "@heroui/react";
import { useHover } from "@uidotdev/usehooks";

export type BowlCardChipProps = {
  tobacco: BowlTobacco;
  onSelect?: (name: string) => void;
  showPercentages?: boolean;
};

export const BowlCardChip = ({
  tobacco,
  onSelect,
  showPercentages = true,
}: BowlCardChipProps) => {
  const [ref, isHover] = useHover();

  const chip = (
    <Chip
      ref={ref}
      className="cursor-pointer px-4 py-2 text-base font-medium"
      color="primary"
      size="lg"
      variant={isHover ? "solid" : "flat"}
      onClick={(event) => {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        onSelect?.(tobacco.name);
      }}
    >
      <span className="flex items-center gap-2">
        <span className="text-inherit">{tobacco.name}</span>
        {showPercentages && typeof tobacco.percentage === "number" && (
          <>
            <span className="text-default-300 dark:text-default-200">•</span>
            <span className="font-semibold text-inherit">
              {tobacco.percentage}%
            </span>
          </>
        )}
      </span>
    </Chip>
  );

  return chip;
};
