import type { Bowl } from '../model/bowl';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { BowlCardChip } from './bowl-card-chip';

export type BowlCardProps = {
  bowl: Bowl;
};

export const BowlCard = ({ bowl }: BowlCardProps) => {
  return (
    <Card>
      <CardHeader>Bowl</CardHeader>
      <CardBody>
        <div className='flex gap-4'>
          {bowl.tobaccos.map((t) => (
            <BowlCardChip key={t.name} tobacco={t} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
