import type { BowlTobacco } from "../model/bowl";

import { Chip, Badge } from "@heroui/react";
import { describe, it, expect, vi } from "vitest";

const useHoverMock = vi.hoisted(() => vi.fn(() => [null, false]));

vi.mock("@uidotdev/usehooks", () => ({
  useHover: useHoverMock,
}));

import { BowlCardChip } from "./bowl-card-chip";

describe("BowlCardChip", () => {
  const tobacco: BowlTobacco = { name: "Alpha", percentage: 50 };

  it("calls onSelect on click", () => {
    const onSelect = vi.fn();
    const element = BowlCardChip({ tobacco, onSelect });

    const chip = element.props.children;

    chip.props.onClick();

    expect(onSelect).toHaveBeenCalledWith(tobacco.name);
  });

  it("uses solid variant on hover", () => {
    useHoverMock.mockReturnValueOnce([null, true]);
    const element = BowlCardChip({ tobacco });

    const chip = element.props.children;

    expect(chip.props.variant).toBe("solid");
  });

  it("uses flat variant when not hovered", () => {
    const element = BowlCardChip({ tobacco });

    const chip = element.props.children;

    expect(chip.props.variant).toBe("flat");
  });

  it("wraps chip in badge when percentages are shown", () => {
    const element = BowlCardChip({ tobacco });

    expect(element.type).toBe(Badge);
    expect(element.props.content).toBe(`${tobacco.percentage}%`);
  });

  it("returns chip when percentages are hidden", () => {
    const element = BowlCardChip({ tobacco, showPercentages: false });

    expect(element.type).toBe(Chip);
  });

  it("returns chip when percentage is missing", () => {
    const element = BowlCardChip({ tobacco: { name: "Alpha" } });

    expect(element.type).toBe(Chip);
  });
});
