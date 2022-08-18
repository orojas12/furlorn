import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../Modal";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
  it("renders a modal", () => {
    render(
      <Modal show={true} onClose={() => {}} title="Title">
        <div>child1</div>
        <div>child2</div>
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByTitle("Close")).toBeInTheDocument();
    expect(screen.getByText("child1")).toBeInTheDocument();
    expect(screen.getByText("child2")).toBeInTheDocument();
  });

  it("calls onClose on button click", async () => {
    const stub = jest.fn();
    const user = userEvent.setup();
    render(<Modal show={true} onClose={stub} />);
    await user.click(screen.getByTitle("Close"));
    expect(stub).toBeCalledTimes(1);
  });
});
