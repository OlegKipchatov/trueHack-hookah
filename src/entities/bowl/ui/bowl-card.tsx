import type { Bowl } from "../model/bowl";

import { Card, CardHeader, CardBody, Button } from "@heroui/react";

import { BowlCardChip } from "./bowl-card-chip";

export type BowlCardProps = {
  bowl: Bowl;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const BowlCard = ({ bowl, onEdit, onRemove }: BowlCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span>{bowl.name}</span>
        {(onEdit || onRemove) && (
          <div className="flex gap-2">
            {onEdit && (
              <Button size="sm" onPress={onEdit}>
                Edit
              </Button>
            )}
            {onRemove && (
              <Button color="danger" size="sm" onPress={onRemove}>
                Delete
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardBody>
        <div className="flex gap-4">
          {bowl.tobaccos.map((t) => (
            <BowlCardChip key={t.name} tobacco={t} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
