import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import ImageFileList from "../forms/ImageFileList";

describe("ImageFileList", () => {
  const mockCreateObjectURL = jest.fn();

  beforeAll(() => {
    window.URL.createObjectURL = mockCreateObjectURL;
  });

  afterEach(() => {
    mockCreateObjectURL.mockReset();
  });

  // it("display file names", () => {
  //   render(
  //     <ImageFileList
  //       blobs={[
  //         new File([], "file1.png"),
  //         new File([], "file2.png"),
  //         new File([], "file3.png"),
  //       ]}
  //       onDelete={() => {}}
  //     />
  //   );
  //   expect(screen.getByText("file1.png")).toBeInTheDocument();
  //   expect(screen.getByText("file2.png")).toBeInTheDocument();
  //   expect(screen.getByText("file3.png")).toBeInTheDocument();
  // });

  it("display delete button on each image", () => {
    render(
      <ImageFileList
        blobs={[
          new File([], "file1.png"),
          new File([], "file2.png"),
          new File([], "file3.png"),
        ]}
        onDelete={() => {}}
      />
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("calls onDelete on button click", async () => {
    const onDelete = jest.fn();
    const user = userEvent.setup();
    render(
      <ImageFileList
        blobs={[
          new File([], "file1.png"),
          new File([], "file2.png"),
          new File([], "file3.png"),
        ]}
        onDelete={onDelete}
      />
    );
    const buttons = screen.getAllByRole("button");
    await Promise.all(buttons.map((button) => user.click(button)));
    expect(onDelete).toBeCalledTimes(3);
  });
});
