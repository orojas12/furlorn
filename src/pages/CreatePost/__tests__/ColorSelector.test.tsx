import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ColorSelector from "../ColorSelector";

describe("ColorSelector", () => {
  it("renders a list of checkboxes with colors", () => {
    const colorOptions = ["red", "green", "blue"];
    const selectedColors: any[] = [];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onChange={() => {}}
      />
    );
    colorOptions.forEach((color) => {
      const element = screen.getByLabelText(color);
      expect(element).toBeInTheDocument();
      expect(element.getAttribute("type")).toEqual("checkbox");
    });
  });

  it("renders a button with 'Clear All' text", () => {
    const colorOptions = ["red", "green", "blue"];
    const selectedColors: any[] = [];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("renders checkboxes with checked/unchecked state", () => {
    const colorOptions = ["red", "green", "blue"];
    const selectedColors = ["red", "blue"];
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("red")).toBeChecked();
    expect(screen.getByLabelText("blue")).toBeChecked();
    expect(screen.getByLabelText("green")).not.toBeChecked();
  });

  it("calls onChange when checked/unchecked", async () => {
    const colorOptions = ["red", "green", "blue"];
    const selectedColors = ["red", "blue"];
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={colorOptions}
        selected={selectedColors}
        onChange={onChange}
      />
    );

    // check all checkboxes
    await Promise.all(
      colorOptions.map((color) => user.click(screen.getByLabelText(color)))
    );
    expect(onChange).toBeCalledTimes(colorOptions.length);

    // uncheck all checkboxes
    await Promise.all(
      colorOptions.map((color) => user.click(screen.getByLabelText(color)))
    );
    expect(onChange).toBeCalledTimes(colorOptions.length * 2);
  });

  it("calls onClear when button is clicked", async () => {
    const colors = ["red", "green", "blue"];
    const selectedColors = ["red", "blue"];
    const onClear = jest.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector
        colorOptions={colors}
        selected={selectedColors}
        onChange={() => {}}
        onClear={onClear}
      />
    );
    await user.click(screen.getByText("Clear All"));
    expect(onClear).toBeCalledTimes(1);
  });
});
