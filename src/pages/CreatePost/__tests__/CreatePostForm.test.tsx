import { getByLabelText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePostForm from "../CreatePostForm";
import userEvent from "@testing-library/user-event";

describe("CreatePostForm", () => {
  it("has a 'name' textbox", () => {
    render(<CreatePostForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });
});
