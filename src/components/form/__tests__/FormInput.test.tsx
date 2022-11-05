import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";

describe("FormInput component", () => {
  it("renders label and input elements", () => {
    render(
      <FormInput
        key={1}
        name="testInput"
        type="text"
        label="Test Input"
        value="testvalue"
        errorMsg="Error message."
        description="This is a test input."
      />
    );
    expect(screen.getByText("Test Input")).toBeInTheDocument();
    expect(screen.getByText("optional")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Input optional")).toBeInTheDocument();
    expect(screen.getByText("This is a test input.")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Test Input optional").getAttribute("value")
    ).toEqual("testvalue");
  });

  it("renders error message", async () => {
    const user = userEvent.setup();

    render(
      <FormInput
        key={1}
        name="testInput"
        type="text"
        label="Test Input"
        value="testvalue"
        errorMsg="Error message."
        description="This is a test input."
        validate={() => false}
      />
    );

    await user.type(screen.getByLabelText("Test Input optional"), "a");

    expect(screen.getByText("Error message.")).toBeInTheDocument();
  });

  it("calls validate function", async () => {
    const mockFunc = jest.fn();
    const user = userEvent.setup();

    render(
      <FormInput
        key={1}
        name="testInput"
        type="text"
        label="Test Input"
        value="testvalue"
        errorMsg="Error message."
        description="This is a test input."
        validate={mockFunc}
      />
    );

    await user.type(screen.getByLabelText("Test Input optional"), "a");
    expect(mockFunc).toBeCalledTimes(1);
  });

  it("calls onChange handler", async () => {
    const mockFunc = jest.fn();
    const user = userEvent.setup();

    render(
      <FormInput
        key={1}
        name="testInput"
        type="text"
        label="Test Input"
        value="testvalue"
        errorMsg="Error message."
        description="This is a test input."
        onChange={mockFunc}
      />
    );

    await user.type(screen.getByLabelText("Test Input optional"), "a");
    expect(mockFunc).toBeCalledTimes(1);
  });
});
