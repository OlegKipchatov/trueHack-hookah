import type { Bowl } from "@/entities/bowl";

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import NewBowlPage from "./page";

const push = vi.fn();
const addBowl = vi.fn();
const mockBowl: Bowl = {
  id: "new-bowl",
  name: "New Bowl",
  tobaccos: [],
  usePercentages: false,
  strength: 5,
  rating: 3,
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

vi.mock("@/entities/bowl", () => ({
  useBowls: () => ({
    addBowl,
  }),
}));

vi.mock("@/features/upsert-bowl", () => ({
  BowlForm: ({ onSubmit }: { onSubmit: (bowl: Bowl) => void }) => (
    <button type="button" onClick={() => onSubmit(mockBowl)}>
      Submit
    </button>
  ),
}));

describe("NewBowlPage", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
    addBowl.mockClear();
  });

  it("adds bowl and redirects to view page", () => {
    render(<NewBowlPage />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    expect(addBowl).toHaveBeenCalledWith(mockBowl);
    expect(push).toHaveBeenCalledWith(`/bowls/view?id=${mockBowl.id}`);
  });
});
