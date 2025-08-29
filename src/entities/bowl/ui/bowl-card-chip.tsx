import type { BowlTobacco } from '../model/bowl';
import { Chip, Badge } from '@heroui/react';
import { useHover } from "@uidotdev/usehooks";

export type BowlCardProps = {
  tobacco: BowlTobacco;
};

export const BowlCardChip = ({ tobacco }: BowlCardProps) => {
  const [ref, isHover] = useHover();

  return (
    <Badge content={`${tobacco.percentage}%`} color='secondary' size='sm' variant='faded'>
      <Chip ref={ref} color='primary' size='lg' variant={isHover ? 'solid' : 'flat'} className='cursor-default'>
        {tobacco.name}
      </Chip>
    </Badge>
  );
};
