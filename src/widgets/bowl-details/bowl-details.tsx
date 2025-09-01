"use client";

import type { Bowl } from "@/entities/bowl";

import { DonutChart } from "@/shared/ui/donut-chart";

export type BowlDetailsProps = {
  bowl: Bowl;
};

export const BowlDetails = ({ bowl }: BowlDetailsProps) => {
  const colors = ["#9333ea", "#06b6d4", "#f43f5e", "#10b981", "#f59e0b"];
  const segments = bowl.tobaccos.map((t, i) => ({
    value: t.percentage,
    color: colors[i % colors.length],
  }));

  return (
    <div className="flex flex-col gap-6">
      <DonutChart segments={segments} />
      <div>
        <h2 className="mb-2 text-lg font-semibold">Вкусы</h2>
        <ul className="flex flex-col gap-1">
          {bowl.tobaccos.map((t, i) => (
            <li key={t.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
                <span>{t.name}</span>
              </div>
              <span className="text-sm text-gray-500">{t.percentage} %</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
