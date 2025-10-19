import type { BowlTobacco } from "../model/bowl";

import { Chip, Badge } from "@heroui/react";
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
      className="cursor-pointer"
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
      {tobacco.name}
    </Chip>
  );

  if (showPercentages && typeof tobacco.percentage === "number") {
    return (
      <Badge
        color="secondary"
        content={`${tobacco.percentage}%`}
        size="sm"
        variant="faded"
      >
        {chip}
      </Badge>
    );
  }

  return chip;
};
