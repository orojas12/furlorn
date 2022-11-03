import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";

describe("FormInput component", () => {
  it("renders correctly", () => {
    render(
      <FormInput
        key={1}
        name="testInput"
        type="text"
        label="Test Input"
        value=""
        onChange={() => {}}
        required={false}
        errorMsg="Error message."
        description="This is a test input."
        pattern="[A-Za-z]{2,10}"
      />
    );
    expect(screen.getByText("Test Input")).toBeInTheDocument();
    expect(screen.getByText("optional")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Input optional")).toBeInTheDocument();
    expect(screen.getByText("Error message.")).toBeInTheDocument();
    expect(screen.getByText("This is a test input.")).toBeInTheDocument();
  });
});
