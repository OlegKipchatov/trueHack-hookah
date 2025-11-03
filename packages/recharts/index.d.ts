import type { CSSProperties, ReactNode } from "react";

export type PieChartProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export declare const PieChart: (props: PieChartProps) => JSX.Element;

export type PieLabelRenderProps<T = unknown> = {
  index: number;
  value: number;
  percent: number;
  name?: string;
  payload: T;
};

export type PieProps<T = unknown> = {
  data?: T[];
  dataKey?: keyof T | string;
  nameKey?: keyof T | string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: number;
  cy?: number;
  width?: number;
  height?: number;
  className?: string;
  label?: ((props: PieLabelRenderProps<T>) => ReactNode) | boolean;
  labelStyle?: CSSProperties;
  children?: ReactNode;
};

export declare const Pie: <T>(props: PieProps<T>) => JSX.Element | null;

export type CellProps = {
  fill?: string;
};

export declare const Cell: (props: CellProps) => null;

export declare const Tooltip: () => null;

export type ResponsiveContainerProps = {
  width?: number | string;
  height?: number | string;
  aspect?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export declare const ResponsiveContainer: (
  props: ResponsiveContainerProps,
) => JSX.Element;
