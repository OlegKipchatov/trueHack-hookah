import { describe, it, expect, vi } from "vitest";

vi.mock("@/shared/lib/i18n/provider", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    setLanguage: vi.fn(),
    language: "en",
  }),
}));

import { BowlFilters } from "./bowl-filters";

describe("BowlFilters", () => {
  it("calls onSearchChange when text changes", () => {
    const onSearchChange = vi.fn();
    const element = BowlFilters({
      search: "",
      onSearchChange,
      flavors: [],
      onRemoveFlavor: vi.fn(),
      sortOrder: "default",
      onSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const input = children[0];

    input.props.onChange({ target: { value: "mint" } });

    expect(onSearchChange).toHaveBeenCalledWith("mint");
  });

  it("calls onRemoveFlavor when chip is closed", () => {
    const onRemoveFlavor = vi.fn();
    const flavors = ["Mint"];
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors,
      onRemoveFlavor,
      sortOrder: "default",
      onSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const wrapper = children[2];
    const chip = Array.isArray(wrapper.props.children)
      ? wrapper.props.children[0]
      : wrapper.props.children;

    chip.props.onClose();

    expect(onRemoveFlavor).toHaveBeenCalledWith("Mint");
  });

  it("renders chips for each flavor", () => {
    const flavors = ["Mint", "Berry"];
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors,
      onRemoveFlavor: vi.fn(),
      sortOrder: "default",
      onSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const wrapper = children[2];

    expect(wrapper).toBeTruthy();

    const chips = wrapper.props.children;
    const chipsArray = Array.isArray(chips) ? chips : [chips];

    expect(chipsArray).toHaveLength(flavors.length);
    chipsArray.forEach((chip, index) => {
      expect(chip.props.children).toBe(flavors[index]);
    });
  });

  it("passes selected sort order to dropdown menu", () => {
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors: [],
      onRemoveFlavor: vi.fn(),
      sortOrder: "rating-desc",
      onSortChange: vi.fn(),
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const dropdown = children[1];
    const menu = Array.isArray(dropdown.props.children)
      ? dropdown.props.children[1]
      : dropdown.props.children;

    expect(menu.props.selectedKeys).toEqual(["rating-desc"]);
  });

  it("calls onSortChange when dropdown action is triggered", () => {
    const onSortChange = vi.fn();
    const element = BowlFilters({
      search: "",
      onSearchChange: vi.fn(),
      flavors: [],
      onRemoveFlavor: vi.fn(),
      sortOrder: "default",
      onSortChange,
    });

    const children = Array.isArray(element.props.children)
      ? element.props.children
      : [element.props.children];
    const dropdown = children[1];
    const menu = Array.isArray(dropdown.props.children)
      ? dropdown.props.children[1]
      : dropdown.props.children;

    menu.props.onAction("rating-asc");

    expect(onSortChange).toHaveBeenCalledWith("rating-asc");
  });
});
