import type { Bowl } from "@/entities/bowl";

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import EditBowlPage from "./page";

const push = vi.fn();
const updateBowl = vi.fn();
const existingBowl: Bowl = {
  id: "existing-bowl",
  name: "Existing Bowl",
  tobaccos: [],
  usePercentages: true,
  rating: 4,
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
  useSearchParams: () => ({
    get: () => existingBowl.id,
  }),
}));

vi.mock("@/entities/bowl", () => ({
  useBowls: () => ({
    bowls: [existingBowl],
    updateBowl,
    isLoading: false,
  }),
}));

vi.mock("@/features/upsert-bowl", () => ({
  BowlForm: ({ onSubmit }: { onSubmit: (bowl: Bowl) => void }) => (
    <button type="button" onClick={() => onSubmit(existingBowl)}>
      Submit
    </button>
  ),
}));

describe("EditBowlPage", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
    updateBowl.mockClear();
  });

  it("updates bowl and redirects to view page", () => {
    render(<EditBowlPage />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    expect(updateBowl).toHaveBeenCalledWith(existingBowl);
    expect(push).toHaveBeenCalledWith(`/bowls/view?id=${existingBowl.id}`);
  });
});
