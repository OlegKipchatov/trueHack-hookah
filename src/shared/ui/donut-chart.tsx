"use client";

export type DonutChartSegment = {
  value: number;
  color: string;
};

export type DonutChartProps = {
  segments: DonutChartSegment[];
};

export const DonutChart = ({ segments }: DonutChartProps) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let current = 0;

  const gradient = segments
    .map((s) => {
      const start = (current / total) * 360;

      current += s.value;

      const end = (current / total) * 360;

      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(",");

  return (
    <div className="relative h-40 w-40">
      <div
        className="h-full w-full rounded-full"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="absolute inset-4 rounded-full bg-background" />
    </div>
  );
};
