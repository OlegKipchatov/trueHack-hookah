import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

import { BowlCard } from "./bowl-card";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

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
    vi.clearAllMocks();
  });

  it("navigates to edit page when edit action is pressed", () => {
    render(<BowlCard bowl={bowl} />);

    fireEvent.click(screen.getByLabelText(/edit bowl/i));

    expect(push).toHaveBeenCalledWith(`/bowls/edit?id=${bowl.id}`);
  });

  it("links to bowl details", () => {
    render(<BowlCard bowl={bowl} />);

    const detailLink = screen.getByRole("link", {
      name: new RegExp(bowl.name),
    });

    expect(detailLink.getAttribute("href")).toBe(`/bowls/${bowl.id}`);
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
  });

  it("calls onTobaccoClick when tobacco entry is selected", () => {
    const onTobaccoClick = vi.fn();

    render(<BowlCard bowl={bowl} onTobaccoClick={onTobaccoClick} />);

    fireEvent.click(screen.getByText(/Alpha — 50%/));

    expect(onTobaccoClick).toHaveBeenCalledWith("Alpha");
  });
});
