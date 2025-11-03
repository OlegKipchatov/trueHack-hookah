import type { ReactNode } from "react";

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ViewBowlPage from "./page";

import ru from "@/shared/config/i18n/ru.json";

const ruDictionary = ru as Record<string, unknown>;

const resolveKey = (dictionary: Record<string, unknown>, key: string) =>
  key.split(".").reduce<unknown>((current, segment) => {
    if (
      current === undefined ||
      current === null ||
      typeof current !== "object"
    ) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, dictionary);

const interpolate = (template: string, values?: Record<string, unknown>) =>
  template.replace(/\{(\w+)\}/g, (_, placeholder: string) => {
    if (!values) {
      return `{${placeholder}}`;
    }

    const value = values[placeholder];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });

vi.mock("@/shared/lib/i18n/provider", () => ({
  useTranslation: () => ({
    t: (key: string, values?: Record<string, unknown>) => {
      const template = resolveKey(ruDictionary, key);

      if (typeof template !== "string") {
        return key;
      }

      return interpolate(template, values);
    },
    language: "ru",
    setLanguage: vi.fn(),
  }),
}));

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
        rating: 3,
      },
    ],
    removeBowl: vi.fn(),
    isLoading: false,
  }),
  BowlRatingBadge: ({ rating }: { rating: number }) => (
    <span aria-label={`Моя оценка: ${rating}`}>{rating}</span>
  ),
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
    expect(screen.getByText(/Моя оценка/i).textContent).toContain("Моя оценка");
    const ratingBadge = screen.getByLabelText(/Моя оценка/i);

    expect(ratingBadge.textContent).toBe("3");

    fireEvent.click(banner);

    expect(push).toHaveBeenCalledWith("/bowls/edit?id=1");
    expect(push).toHaveBeenCalledTimes(1);
  });
});
