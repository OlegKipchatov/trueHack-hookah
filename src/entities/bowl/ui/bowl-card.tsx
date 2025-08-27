import type { Bowl } from '../model/bowl';

export type BowlCardProps = {
  bowl: Bowl;
};

export const BowlCard = ({ bowl }: BowlCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold mb-2">Bowl</h3>
      <ul className="flex flex-col gap-1">
        {bowl.tobaccos.map((t, index) => (
          <li key={index} className="flex justify-between">
            <span>{t.name}</span>
            <span>{t.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
