import type { BowlTobacco } from "@/entities/bowl";

import { Input, Slider } from "@heroui/react";
import { Icon } from "@iconify/react";

import { Button } from "@/shared/ui/button";

export type BowlTobaccoListLabels = {
  nameLabel: string;
  namePlaceholder: string;
  deleteLabel: string;
  addLabel: string;
  percentageLabel: string;
};

export type BowlTobaccoListProps = {
  tobaccos: BowlTobacco[];
  usePercentages: boolean;
  labels: BowlTobaccoListLabels;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: <K extends keyof BowlTobacco>(
    index: number,
    field: K,
    value: BowlTobacco[K],
  ) => void;
};

export const BowlTobaccoList = ({
  tobaccos,
  usePercentages,
  labels,
  onAdd,
  onRemove,
  onUpdate,
}: BowlTobaccoListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {tobaccos.map((tobacco, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <Input
              isRequired
              className="flex-1"
              label={labels.nameLabel}
              labelPlacement="outside"
              placeholder={labels.namePlaceholder}
              size="md"
              value={tobacco.name}
              onChange={(event) => onUpdate(index, "name", event.target.value)}
            />
            <Button
              isIconOnly
              aria-label={labels.deleteLabel}
              color="danger"
              hint={labels.deleteLabel}
              size="md"
              variant="light"
              onPress={() => onRemove(index)}
            >
              <Icon icon="akar-icons:cross" width={16} />
            </Button>
          </div>
          {usePercentages && (
            <Slider
              label={labels.percentageLabel}
              maxValue={100}
              size="sm"
              value={tobacco.percentage ?? 0}
              onChange={(value) =>
                onUpdate(
                  index,
                  "percentage",
                  value as BowlTobacco["percentage"],
                )
              }
            />
          )}
        </div>
      ))}
      <div>
        <Button
          color="primary"
          size="sm"
          startContent={<Icon icon="akar-icons:plus" width={16} />}
          variant="light"
          onPress={onAdd}
        >
          {labels.addLabel}
        </Button>
      </div>
    </div>
  );
};
