import type { ReactNode } from "react";

import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ru from "@/shared/config/i18n/ru.json";

const ruDictionary = ru as Record<string, string>;

const interpolate = (
  template: string,
  values?: Record<string, unknown>,
) =>
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
      const template = ruDictionary[key];

      if (!template) {
        return key;
      }

      return interpolate(template, values);
    },
    language: "ru",
    setLanguage: vi.fn(),
  }),
}));

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
