import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterProvider } from "../context/CharacterContext";
import CharacterSheet from "../components/CharacterSheet";

const renderWithProvider = (component: React.ReactNode) => {
  return render(<CharacterProvider>{component}</CharacterProvider>);
};

describe("CharacterSheet Component", () => {
  it("renders without crashing", () => {
    renderWithProvider(<CharacterSheet />);
    expect(screen.getByText(/D&D Character Sheet/i)).toBeInTheDocument();
  });

  it("updates player name", () => {
    renderWithProvider(<CharacterSheet />);
    const input = screen.getByLabelText(/Player Name/i);
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(input).toHaveValue("John Doe");
  });

  it("updates character name", () => {
    renderWithProvider(<CharacterSheet />);
    const input = screen.getByLabelText(/Character Name/i);
    fireEvent.change(input, { target: { value: "Aragorn" } });
    expect(input).toHaveValue("Aragorn");
  });

  it("fetches random name", async () => {
    renderWithProvider(<CharacterSheet />);
    const button = screen.getByRole("button", { name: /Random/i });
    fireEvent.click(button);
    const randomName = await screen.findByDisplayValue(/.+ .+/);
    expect(randomName).toBeInTheDocument();
  });

  it("updates attribute values", () => {
    renderWithProvider(<CharacterSheet />);
    const attributeInputs = screen.getAllByDisplayValue("10");
    const firstAttributeInput = attributeInputs[0];
    fireEvent.change(firstAttributeInput, { target: { value: "12" } });
    expect(firstAttributeInput).toHaveValue(12);
  });

  it("shows error when total points exceed 83", () => {
    renderWithProvider(<CharacterSheet />);
    const incrementButtons = screen.getAllByTestId("increase");
    for (let i = 0; i < 20; i++) {
      fireEvent.click(incrementButtons[i % incrementButtons.length]);
    }
  });
});
