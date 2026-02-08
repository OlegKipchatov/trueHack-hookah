import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

import { BowlCard } from "./bowl-card";

import en from "@/shared/config/i18n/en.json";

const enDictionary = en as Record<string, unknown>;

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
      const template = resolveKey(enDictionary, key);

      if (typeof template !== "string") {
        return key;
      }

      return interpolate(template, values);
    },
    language: "en",
    setLanguage: vi.fn(),
  }),
}));

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
  rating: 4,
  strength: 3,
};

describe("BowlCard", () => {
  afterEach(() => {
    cleanup();
    push.mockClear();
  });

  it("navigates to edit page when edit button is pressed", () => {
    render(<BowlCard bowl={bowl} />);

    const ratingBadge = screen.getByLabelText(/My rating/i);

    expect(ratingBadge.textContent).toBe("4");

    fireEvent.click(screen.getByLabelText(/edit bowl/i));

    expect(push).toHaveBeenCalledWith(`/bowls/edit?id=${bowl.id}`);
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("shows tobacco percentages when enabled", () => {
    render(<BowlCard bowl={{ ...bowl, usePercentages: true }} />);

    expect(screen.getAllByText(/50%/)).toHaveLength(2);
  });

  it("hides tobacco percentages when disabled", () => {
    render(<BowlCard bowl={{ ...bowl, usePercentages: false }} />);

    expect(screen.queryByText(/50%/)).toBeNull();
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
