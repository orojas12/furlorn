import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ColorSelector from "../forms/fields/ColorSelector";

describe("ColorSelector", () => {
  const colorOptions = [
    { id: "red", name: "red", hex: "#fff" },
    { id: "green", name: "green", hex: "#fff" },
    { id: "blue", name: "blue", hex: "#fff" },
  ];

  it("renders a list of checkboxes with colors", () => {
    const selectedColors: any[] = [];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={() => {}}
        onUncheck={() => {}}
        onClear={() => {}}
      />
    );
    colorOptions.forEach((color) => {
      const element = screen.getByLabelText(color.name);
      expect(element).toBeInTheDocument();
      expect(element.getAttribute("type")).toEqual("checkbox");
    });
  });

  it("renders a button with 'Clear All' text", () => {
    const selectedColors: any[] = [];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={() => {}}
        onUncheck={() => {}}
        onClear={() => {}}
      />
    );
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("renders checkboxes with checked/unchecked state", () => {
    const selectedColors = [{ id: "red", name: "red", hex: "#fff" }];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={() => {}}
        onUncheck={() => {}}
        onClear={() => {}}
      />
    );
    expect(screen.getByLabelText("red")).toBeChecked();
    expect(screen.getByLabelText("blue")).not.toBeChecked();
    expect(screen.getByLabelText("green")).not.toBeChecked();
  });

  it("calls onCheck when checked", async () => {
    const selectedColors: any = [];
    const onCheck = jest.fn();
    const onUncheck = jest.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={onCheck}
        onUncheck={onUncheck}
        onClear={() => {}}
      />
    );

    // check all checkboxes
    await Promise.all(
      colorOptions.map((color) => user.click(screen.getByLabelText(color.name)))
    );
    expect(onCheck).toBeCalledTimes(colorOptions.length);
  });

  it("calls onUncheck when unchecked", async () => {
    const selectedColors = [...colorOptions];
    const onCheck = jest.fn();
    const onUncheck = jest.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={onCheck}
        onUncheck={onUncheck}
        onClear={() => {}}
      />
    );

    // uncheck all checkboxes
    await Promise.all(
      colorOptions.map((color) => user.click(screen.getByLabelText(color.name)))
    );
    expect(onUncheck).toBeCalledTimes(colorOptions.length);
  });

  it("calls onClear when button is clicked", async () => {
    const selectedColors = [{ id: "red", name: "red", hex: "#fff" }];
    const onClear = jest.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onCheck={() => {}}
        onUncheck={() => {}}
        onClear={onClear}
      />
    );
    await user.click(screen.getByText("Clear All"));
    expect(onClear).toBeCalledTimes(1);
  });
});
