import { Icon } from "@iconify/react";

import { Button } from "@/shared/ui/button";

export type BowlPercentageToggleProps = {
  isActive: boolean;
  label: string;
  activeHint: string;
  inactiveHint: string;
  onToggle: () => void;
};

export const BowlPercentageToggle = ({
  isActive,
  label,
  activeHint,
  inactiveHint,
  onToggle,
}: BowlPercentageToggleProps) => {
  const hint = isActive ? activeHint : inactiveHint;

  return (
    <Button
      isIconOnly
      aria-label={label}
      aria-pressed={isActive}
      className="ml-auto"
      color={isActive ? "primary" : "default"}
      hint={hint}
      size="sm"
      variant={isActive ? "solid" : "bordered"}
      onPress={onToggle}
    >
      <Icon icon="akar-icons:percentage" width={16} />
    </Button>
  );
};
