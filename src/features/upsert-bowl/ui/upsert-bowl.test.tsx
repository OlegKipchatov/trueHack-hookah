import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { UpsertBowl } from "./upsert-bowl";

describe("UpsertBowl", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const openModal = () => {
    fireEvent.click(screen.getByRole("button", { name: /create bowl/i }));
  };

  it("adds and removes tobacco fields", () => {
    render(<UpsertBowl onSubmit={vi.fn()} />);
    openModal();

    expect(screen.getAllByPlaceholderText("pineapple").length).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: /add tobacco/i }));
    expect(screen.getAllByPlaceholderText("pineapple").length).toBe(2);

    const deleteButtons = screen.getAllByLabelText("Delete tobacco");

    fireEvent.click(deleteButtons[1]);

    expect(screen.getAllByPlaceholderText("pineapple").length).toBe(1);
  });

  it("disables Save button when total percent not 100 or name empty", () => {
    render(<UpsertBowl onSubmit={vi.fn()} />);
    openModal();

    const saveBtn = screen.getByRole("button", {
      name: /save/i,
    }) as HTMLButtonElement;

    expect(saveBtn.disabled).toBe(true);

    fireEvent.change(screen.getByPlaceholderText("My mix"), {
      target: { value: "Test" },
    });
    expect(saveBtn.disabled).toBe(false);

    fireEvent.input(screen.getByRole("slider"), { target: { value: "50" } });
    expect(saveBtn.disabled).toBe(true);
  });

  it("resets fields after successful creation", () => {
    const onSubmit = vi.fn();

    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("uuid");

    render(<UpsertBowl onSubmit={onSubmit} />);
    openModal();

    fireEvent.change(screen.getByPlaceholderText("My mix"), {
      target: { value: "New Bowl" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "uuid",
      name: "New Bowl",
      tobaccos: [{ name: "", percentage: 100 }],
    });

    fireEvent.click(screen.getByRole("button", { name: /create bowl/i }));
    expect(
      (screen.getByPlaceholderText("My mix") as HTMLInputElement).value,
    ).toBe("");

    const tobaccoInputs = screen.getAllByPlaceholderText("pineapple");

    expect(tobaccoInputs.length).toBe(1);
    expect((tobaccoInputs[0] as HTMLInputElement).value).toBe("");

    expect((screen.getByRole("slider") as HTMLInputElement).value).toBe("100");
  });
});
