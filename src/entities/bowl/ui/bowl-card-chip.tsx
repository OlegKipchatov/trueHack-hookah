import type { BowlTobacco } from "../model/bowl";

import { Chip, Badge } from "@heroui/react";
import { useHover } from "@uidotdev/usehooks";

export type BowlCardProps = {
  tobacco: BowlTobacco;
};

export const BowlCardChip = ({ tobacco }: BowlCardProps) => {
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
        className="cursor-default"
        color="primary"
        size="lg"
        variant={isHover ? "solid" : "flat"}
      >
        {tobacco.name}
      </Chip>
    </Badge>
  );
};
