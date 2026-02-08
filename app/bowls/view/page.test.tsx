import type { ReactNode } from "react";

import { describe, it, expect, vi, afterEach } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

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

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  PieChart: ({ children, ...props }: { children: ReactNode }) => (
    <div {...props}>{children}</div>
  ),
  Pie: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Cell: () => null,
}));

const useBowlsMock = vi.fn();

vi.mock("@/entities/bowl", () => ({
  useBowls: () => useBowlsMock(),
  BowlRatingBadge: ({ rating }: { rating: number }) => (
    <span aria-label={`Моя оценка: ${rating}`}>{rating}</span>
  ),
}));

const getWindowWithResizeObserver = () =>
  window as typeof window & { ResizeObserver?: typeof ResizeObserver };

const originalResizeObserver = getWindowWithResizeObserver().ResizeObserver;

describe("ViewBowlPage", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
    useBowlsMock.mockReset();
    const windowWithObserver = getWindowWithResizeObserver();

    if (originalResizeObserver) {
      windowWithObserver.ResizeObserver = originalResizeObserver;
    } else {
      delete windowWithObserver.ResizeObserver;
    }
  });

  it("renders banner when percentages are disabled and navigates to edit", () => {
    useBowlsMock.mockReturnValue({
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
          strength: 5,
        },
      ],
      removeBowl: vi.fn(),
      isLoading: false,
    });

    render(<ViewBowlPage />);

    const banner = screen.getByRole("button", {
      name: /проценты для этой чаши отключены/i,
    });

    expect(banner).toBeTruthy();
    expect(screen.getByText("Крепость: 5")).toBeTruthy();

    const heading = screen.getByRole("heading", { level: 1 });
    const ratingBadge = within(heading).getByLabelText(/Моя оценка/i);

    expect(ratingBadge.textContent).toBe("3");
    expect(screen.queryByLabelText(/Параметры чаши/i)).toBeNull();

    fireEvent.click(banner);

    expect(push).toHaveBeenCalledWith("/bowls/edit?id=1");
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("shows chart placeholder when ResizeObserver is unavailable", () => {
    useBowlsMock.mockReturnValue({
      bowls: [
        {
          id: "1",
          name: "Test bowl",
          usePercentages: true,
          tobaccos: [
            {
              name: "Mint",
              percentage: 100,
            },
          ],
          rating: 4,
          strength: 4,
        },
      ],
      removeBowl: vi.fn(),
      isLoading: false,
    });

    const windowWithObserver = getWindowWithResizeObserver();

    delete windowWithObserver.ResizeObserver;

    render(<ViewBowlPage />);

    expect(screen.getByTestId("bowl-chart-placeholder")).toBeTruthy();
  });

  it("renders chart when ResizeObserver is available", () => {
    useBowlsMock.mockReturnValue({
      bowls: [
        {
          id: "1",
          name: "Test bowl",
          usePercentages: true,
          tobaccos: [
            {
              name: "Mint",
              percentage: 100,
            },
          ],
          rating: 5,
          strength: 6,
        },
      ],
      removeBowl: vi.fn(),
      isLoading: false,
    });

    const windowWithObserver = getWindowWithResizeObserver();

    windowWithObserver.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    render(<ViewBowlPage />);

    expect(screen.getByTestId("bowl-chart")).toBeTruthy();
  });
});
