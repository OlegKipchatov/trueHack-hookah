import type { Bowl } from "../model/bowl";

import { describe, it, expect, vi } from "vitest";

import { BowlCard } from "./bowl-card";

describe("BowlCard", () => {
  const bowl: Bowl = {
    id: "1",
    name: "Test bowl",
    tobaccos: [
      { name: "Alpha", percentage: 50 },
      { name: "Beta", percentage: 50 },
    ],
  };

  it("renders edit link with proper href", () => {
    const element = BowlCard({ bowl });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];
    const link = Array.isArray(actions.props.children)
      ? actions.props.children[0]
      : actions.props.children;

    expect(link.props.href).toBe(`/bowls/edit/?id=${bowl.id}`);
  });

  it("hides delete button when onRemove is missing", () => {
    const element = BowlCard({ bowl });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];
    const children = actions.props.children;
    const deleteButton = Array.isArray(children) ? children[1] : undefined;

    expect(deleteButton).toBeUndefined();
  });

  it("calls onRemove when Delete button is pressed", () => {
    const onRemove = vi.fn();
    const element = BowlCard({ bowl, onRemove });

    const cardHeader = element.props.children[0];
    const actions = cardHeader.props.children[1];
    const buttons = actions.props.children;
    const removeButton = Array.isArray(buttons) ? buttons[1] : buttons;

    removeButton.props.onPress();
    expect(onRemove).toHaveBeenCalled();
  });

  it("calls onTobaccoClick when tobacco chip is selected", () => {
    const onTobaccoClick = vi.fn();
    const element = BowlCard({ bowl, onTobaccoClick });

    const cardBody = element.props.children[1];
    const wrapper = cardBody.props.children;
    const chips = wrapper.props.children;
    const firstChip = Array.isArray(chips) ? chips[0] : chips;

    firstChip.props.onSelect();
    expect(onTobaccoClick).toHaveBeenCalledWith(bowl.tobaccos[0].name);
  });

  it("renders proper amount of chips with correct content", () => {
    const element = BowlCard({ bowl });

    const cardBody = element.props.children[1];
    const wrapper = cardBody.props.children;
    const chips = wrapper.props.children;
    const chipsArray = Array.isArray(chips) ? chips : [chips];

    expect(chipsArray).toHaveLength(bowl.tobaccos.length);
    chipsArray.forEach((chipElement, index) => {
      expect(chipElement.props.tobacco.name).toBe(bowl.tobaccos[index].name);
      expect(chipElement.props.tobacco.percentage).toBe(
        bowl.tobaccos[index].percentage,
      );
    });
  });
});
