import type { Bowl } from "@/entities/bowl";

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { BowlForm } from "./bowl-form";

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

describe("BowlForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("submits with percentages enabled", () => {
    const bowl: Bowl = {
      id: "1",
      name: "My mix",
      tobaccos: [
        { name: "Mint", percentage: 60 },
        { name: "Lime", percentage: 40 },
      ],
      usePercentages: true,
    };
    const onSubmit = vi.fn();

    render(<BowlForm bowl={bowl} onSubmit={onSubmit} />);

    expect(
      screen.getAllByRole("slider", { name: /percentage/i }).length,
    ).toBeGreaterThan(0);

    const saveButton = screen.getByRole("button", { name: /save/i });
    const form = saveButton.closest("form");

    expect(form).not.toBeNull();

    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalledWith({ ...bowl });
  });

  it("allows saving when percentages are disabled", async () => {
    const bowl: Bowl = {
      id: "2",
      name: "Custom mix",
      tobaccos: [
        { name: "Berry", percentage: 60 },
        { name: "Peach", percentage: 60 },
      ],
      usePercentages: true,
    };
    const onSubmit = vi.fn();

    render(<BowlForm bowl={bowl} onSubmit={onSubmit} />);

    const saveButton = screen.getByRole("button", { name: /save/i });

    expect((saveButton as HTMLButtonElement).disabled).toBe(true);

    const toggle = screen.getByRole("button", { name: /toggle percentages/i });

    expect(toggle.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-pressed")).toBe("false");

    expect(screen.queryByRole("slider", { name: /percentage/i })).toBeNull();
    await waitFor(() => {
      const refreshedButton = screen.getByRole("button", {
        name: /save/i,
      }) as HTMLButtonElement;

      expect(refreshedButton.disabled).toBe(false);
    });

    const form = screen.getByRole("button", { name: /save/i }).closest("form");

    expect(form).not.toBeNull();

    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalledWith({ ...bowl, usePercentages: false });
  });

  it("restores slider values when re-enabling percentages", () => {
    const bowl: Bowl = {
      id: "3",
      name: "Floral mix",
      tobaccos: [
        { name: "Rose", percentage: 25 },
        { name: "Jasmine", percentage: 75 },
      ],
      usePercentages: true,
    };
    const onSubmit = vi.fn();

    render(<BowlForm bowl={bowl} onSubmit={onSubmit} />);

    const slidersBeforeToggle = screen.getAllByRole("slider", {
      name: /percentage/i,
    });

    expect(slidersBeforeToggle.length).toBeGreaterThan(0);

    const toggle = screen.getByRole("button", { name: /toggle percentages/i });

    expect(toggle.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(screen.queryByRole("slider", { name: /percentage/i })).toBeNull();

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-pressed")).toBe("true");

    const slidersAfterToggle = screen.getAllByRole("slider", {
      name: /percentage/i,
    });

    expect(slidersAfterToggle.length).toBeGreaterThan(0);

    const saveButton = screen.getByRole("button", { name: /save/i });
    const form = saveButton.closest("form");

    expect(form).not.toBeNull();

    fireEvent.submit(form!);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const submittedBowl = onSubmit.mock.calls[0][0] as Bowl;

    expect(submittedBowl.tobaccos[0]?.percentage).toBe(25);
  });
});
