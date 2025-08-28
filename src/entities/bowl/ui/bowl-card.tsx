import type { Bowl } from '../model/bowl';
import { Card, CardHeader, CardBody, Chip, Badge } from '@heroui/react';

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
            <Badge key={t.name} content={`${t.percentage}%`} color='secondary' size='sm'>
              <Chip variant='flat' size='lg'>
                {t.name}
              </Chip>
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
