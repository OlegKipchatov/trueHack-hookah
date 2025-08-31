import type { Bowl } from "../model/bowl";

import { Card, CardHeader, CardBody, Button } from "@heroui/react";

import { BowlCardChip } from "./bowl-card-chip";

export type BowlCardProps = {
  bowl: Bowl;
  onEdit?: () => void;
};

export const BowlCard = ({ bowl, onEdit }: BowlCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span>Bowl</span>
        {onEdit && (
          <Button size="sm" onPress={onEdit}>
            Edit
          </Button>
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
