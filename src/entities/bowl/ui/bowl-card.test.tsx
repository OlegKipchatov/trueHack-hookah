import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

import { BowlCard } from "./bowl-card";

const bowl: Bowl = {
  id: "1",
  name: "Test bowl",
  tobaccos: [
    { name: "Alpha", percentage: 50 },
    { name: "Beta", percentage: 50 },
  ],
};

describe("BowlCard", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
  });

  it("navigates to edit page when edit button is pressed", () => {
    render(<BowlCard bowl={bowl} />);

    fireEvent.click(screen.getByLabelText(/edit bowl/i));

    expect(push).toHaveBeenCalledWith(`/bowls/edit?id=${bowl.id}`);
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("navigates to bowl view when card is pressed", () => {
    render(<BowlCard bowl={bowl} />);

    fireEvent.click(screen.getByRole("button", { name: /test bowl/i }));

    expect(push).toHaveBeenCalledWith(`/bowls/view?id=${bowl.id}`);
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("hides delete button when onRemove is missing", () => {
    render(<BowlCard bowl={bowl} />);

    expect(screen.queryByLabelText(/delete bowl/i)).toBeNull();
  });

  it("calls onRemove when Delete is confirmed", () => {
    const onRemove = vi.fn();

    render(<BowlCard bowl={bowl} onRemove={onRemove} />);

    fireEvent.click(screen.getByLabelText(/delete bowl/i));
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onRemove).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("calls onTobaccoClick when tobacco chip is selected", () => {
    const onTobaccoClick = vi.fn();

    render(<BowlCard bowl={bowl} onTobaccoClick={onTobaccoClick} />);

    const chip = screen.getAllByText("Alpha")[0];

    fireEvent.click(chip.parentElement!);

    expect(onTobaccoClick).toHaveBeenCalledWith("Alpha");
    expect(push).not.toHaveBeenCalled();
  });
});
