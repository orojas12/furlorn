import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FormInput from "../FormInput";
import Form from "../Form";

describe("Form component", () => {
  it("renders all form inputs", () => {
    render(
      <Form
        id="testForm"
        inputs={[
          {
            key: 1,
            name: "input1",
            type: "text",
            label: "Input 1",
          },
          {
            key: 2,
            name: "input2",
            type: "text",
            label: "Input 2",
          },
        ]}
        initialState={{}}
        submitText="Log In"
      />
    );

    expect(screen.getByLabelText("Input 1 optional")).toBeInTheDocument();
    expect(screen.getByLabelText("Input 2 optional")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("calls onSubmit handler", async () => {
    const mockFunc = jest.fn();
    const user = userEvent.setup();

    render(
      <Form
        id="testForm"
        inputs={[
          {
            key: 1,
            name: "input1",
            type: "text",
            label: "Input 1",
          },
          {
            key: 2,
            name: "input2",
            type: "text",
            label: "Input 2",
          },
        ]}
        initialState={{}}
        onSubmit={mockFunc}
      />
    );

    const button = screen.getByText("Submit");
    await user.click(button);
    expect(mockFunc).toBeCalledTimes(1);
  });
});
