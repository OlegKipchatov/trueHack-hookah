import type { BowlTobacco } from "../model/bowl";

import { Chip } from "@heroui/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

const useHoverMock = vi.hoisted(() => vi.fn(() => [null, false]));

vi.mock("@uidotdev/usehooks", () => ({
  useHover: useHoverMock,
}));

import { BowlCardChip } from "./bowl-card-chip";

describe("BowlCardChip", () => {
  const tobacco: BowlTobacco = { name: "Alpha", percentage: 50 };

  afterEach(() => {
    cleanup();
  });

  it("calls onSelect on click", () => {
    const onSelect = vi.fn();

    render(<BowlCardChip tobacco={tobacco} onSelect={onSelect} />);
    fireEvent.click(screen.getByText(tobacco.name));

    expect(onSelect).toHaveBeenCalledWith(tobacco.name);
  });

  it("uses solid variant on hover", () => {
    useHoverMock.mockReturnValueOnce([null, true]);
    const element = BowlCardChip({ tobacco });

    expect(element.props.variant).toBe("solid");
  });

  it("uses flat variant when not hovered", () => {
    const element = BowlCardChip({ tobacco });

    expect(element.props.variant).toBe("flat");
  });

  it("renders percentage inline when percentages are shown", () => {
    render(<BowlCardChip tobacco={tobacco} />);

    expect(screen.getByText(tobacco.name)).toBeTruthy();
    expect(screen.getByText(`${tobacco.percentage}%`)).toBeTruthy();
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
