import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageFileField from "../fields/ImageFileField";

describe("ImageFileField", () => {
  it("renders file input element", () => {
    render(<ImageFileField id="photoUpload" label="Upload Photo" />);
    const element = screen.getByLabelText("Upload Photo");
    expect(element).toBeInTheDocument();
    expect(element.getAttribute("type")).toEqual("file");
  });

  it("displays error message", () => {
    render(
      <ImageFileField
        id="photoUpload"
        label="Upload Photo"
        error="Error Message"
      />
    );
    const errorMsg = screen.getByText("Error Message");
    expect(errorMsg).toBeInTheDocument();
  });

  it("only allows image/jpeg and image/png file types", () => {
    render(<ImageFileField id="photoUpload" label="Upload Photo" />);
    const element = screen.getByLabelText("Upload Photo");
    expect(element.getAttribute("accept")).toEqual("image/jpeg,image/png");
  });

  it("calls onChange after change event", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <ImageFileField
        id="photoUpload"
        label="Upload Photo"
        onChange={onChange}
      />
    );
    const element = screen.getByLabelText("Upload Photo");
    await user.upload(
      element,
      new File([""], "test.png", { type: "image/png" })
    );
    expect(onChange).toBeCalledTimes(1);
  });
});
