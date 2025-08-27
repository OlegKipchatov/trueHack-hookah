import type { Bowl } from '../model/bowl';
import { Card, CardHeader, CardBody } from '@heroui/react';

export type BowlCardProps = {
  bowl: Bowl;
};

export const BowlCard = ({ bowl }: BowlCardProps) => {
  return (
    <Card>
      <CardHeader>Bowl</CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-1">
          {bowl.tobaccos.map((t, index) => (
            <li key={index} className="flex justify-between">
              <span>{t.name}</span>
              <span>{t.percentage}%</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
