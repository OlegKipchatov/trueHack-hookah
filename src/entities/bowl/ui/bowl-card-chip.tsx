import type { BowlTobacco } from "../model/bowl";

import { Chip, Badge } from "@heroui/react";
import { useHover } from "@uidotdev/usehooks";

export type BowlCardChipProps = {
  tobacco: BowlTobacco;
  onSelect?: (name: string) => void;
};

export const BowlCardChip = ({ tobacco, onSelect }: BowlCardChipProps) => {
  const [ref, isHover] = useHover();

  return (
    <Badge
      color="secondary"
      content={`${tobacco.percentage}%`}
      size="sm"
      variant="faded"
    >
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
    </Badge>
  );
};
