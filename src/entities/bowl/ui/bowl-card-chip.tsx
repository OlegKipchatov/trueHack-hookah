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
      className="cursor-pointer rounded-full border border-white/10 bg-gradient-to-r from-violet-800/50 to-fuchsia-600/40 px-4 py-2 text-base font-medium text-violet-100 shadow-sm shadow-black/20 transition-colors"
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
        <span>{tobacco.name}</span>
        {showPercentages && typeof tobacco.percentage === "number" && (
          <>
            <span className="text-violet-200/70">•</span>
            <span className="font-semibold text-fuchsia-200">
              {tobacco.percentage}%
            </span>
          </>
        )}
      </span>
    </Chip>
  );

  return chip;
};
