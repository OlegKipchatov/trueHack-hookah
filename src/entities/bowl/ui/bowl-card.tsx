import type { Bowl } from "../model/bowl";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { BowlCardChip } from "./bowl-card-chip";

import { Button } from "@/shared/ui/button";

export type BowlCardProps = {
  bowl: Bowl;
  onRemove?: () => void;
  onTobaccoClick?: (name: string) => void;
};

export const BowlCard = ({ bowl, onRemove, onTobaccoClick }: BowlCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span>{bowl.name}</span>
        <div className="flex gap-2">
          <Link href={`/bowls/edit/?id=${bowl.id}`}>
            <Button
              isIconOnly
              aria-label="Edit bowl"
              hint="Edit bowl"
              size="sm"
            >
              <Icon icon="akar-icons:edit" width={16} />
            </Button>
          </Link>
          {onRemove && (
            <Button
              isIconOnly
              aria-label="Delete bowl"
              color="danger"
              hint="Delete bowl"
              size="sm"
              onPress={() => {
                if (window.confirm("Are you sure?")) {
                  onRemove();
                }
              }}
            >
              <Icon icon="akar-icons:cross" width={16} />
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
