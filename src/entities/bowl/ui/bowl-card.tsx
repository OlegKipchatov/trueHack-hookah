import type { Bowl } from "../model/bowl";

import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { BowlCardChip } from "./bowl-card-chip";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({
  bowl,
  onRemove,
  onTobaccoClick,
}: BowlCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span>{bowl.name}</span>
        <div className="flex gap-2">
          <Link href={`/bowls/${bowl.id}/edit`}>
            <Button aria-label="Edit" isIconOnly size="sm">
              <Icon icon="akar-icons:edit" width={16} />
            </Button>
          </Link>
          {onRemove && (
            <Button color="danger" size="sm" onPress={onRemove}>
              Delete
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex gap-4">
          {bowl.tobaccos.map((t) => (
            <BowlCardChip
              key={t.name}
              tobacco={t}
              onSelect={() => onTobaccoClick?.(t.name)}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
