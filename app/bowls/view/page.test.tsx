import type { ReactNode } from "react";

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ViewBowlPage from "./page";

const push = vi.fn();

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
  useSearchParams: () => ({
    get: () => "1",
  }),
}));

vi.mock("@/entities/bowl", () => ({
  useBowls: () => ({
    bowls: [
      {
        id: "1",
        name: "Test bowl",
        usePercentages: false,
        tobaccos: [
          {
            name: "Mint",
          },
        ],
      },
    ],
    removeBowl: vi.fn(),
    isLoading: false,
  }),
}));

describe("ViewBowlPage", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
  });

  it("renders banner when percentages are disabled and navigates to edit", () => {
    render(<ViewBowlPage />);

    const banner = screen.getByRole("button", {
      name: /проценты для этой чаши отключены/i,
    });

    expect(banner).toBeTruthy();

    fireEvent.click(banner);

    expect(push).toHaveBeenCalledWith("/bowls/edit?id=1");
    expect(push).toHaveBeenCalledTimes(1);
  });
});
