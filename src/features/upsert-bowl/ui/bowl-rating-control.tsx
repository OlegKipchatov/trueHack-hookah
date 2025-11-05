import { Slider } from "@heroui/react";

export type BowlRatingControlProps = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export const BowlRatingControl = ({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: BowlRatingControlProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-medium text-default-600 dark:text-default-400">
        <span>{label}</span>
        <span aria-live="polite">{value}</span>
      </div>
      <Slider
        aria-label={label}
        maxValue={max}
        minValue={min}
        size="sm"
        step={1}
        value={value}
        onChange={(next) => onChange(next as number)}
      />
      <p className="text-xs text-default-500 dark:text-default-400">{hint}</p>
    </div>
  );
};
