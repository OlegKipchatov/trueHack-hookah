import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

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
  afterEach(cleanup);
  it("renders edit link with proper href", () => {
    render(<BowlCard bowl={bowl} />);

    const editLink = screen
      .getAllByRole("link")
      .find(
        (item) => item.getAttribute("href") === `/bowls/edit?id=${bowl.id}`,
      );

    expect(editLink).toBeDefined();
  });

  it("links to bowl details", () => {
    render(<BowlCard bowl={bowl} />);

    const detailLinks = screen
      .getAllByRole("link")
      .filter((item) => item.getAttribute("href") === `/bowl?id=${bowl.id}`);

    expect(detailLinks.length).toBeGreaterThan(0);
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

  it("calls onTobaccoClick when tobacco chip is selected", () => {
    const onTobaccoClick = vi.fn();

    render(<BowlCard bowl={bowl} onTobaccoClick={onTobaccoClick} />);

    const chip = screen.getAllByText("Alpha")[0];

    fireEvent.click(chip.parentElement!);

    expect(onTobaccoClick).toHaveBeenCalledWith("Alpha");
  });
});
