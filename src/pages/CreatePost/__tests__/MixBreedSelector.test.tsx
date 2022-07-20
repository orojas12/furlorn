import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MixBreedSelector from "../MixBreedSelector";

describe("MixBreedSelector", () => {
  it("has all checkboxes", () => {
    render(
      <MixBreedSelector
        breeds={[
          { id: 1, value: "breed1" },
          { id: 2, value: "breed2" },
          { id: 3, value: "breed3" },
        ]}
        selectedBreeds={[]}
        onChange={jest.fn()}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByLabelText("breed1")).toBeInTheDocument();
    expect(screen.getByLabelText("breed2")).toBeInTheDocument();
    expect(screen.getByLabelText("breed3")).toBeInTheDocument();
  });

  it("calls handlers on click", async () => {
    const onChange = jest.fn();
    const onClearAll = jest.fn();
    const user = userEvent.setup();
    render(
      <MixBreedSelector
        breeds={[
          { id: 1, value: "breed1" },
          { id: 2, value: "breed2" },
          { id: 3, value: "breed3" },
        ]}
        selectedBreeds={[]}
        onChange={onChange}
        onClearAll={onClearAll}
      />
    );

    await Promise.all([
      user.click(screen.getByLabelText("breed1")),
      user.click(screen.getByLabelText("breed2")),
      user.click(screen.getByLabelText("breed3")),
    ]);
    expect(onChange).toBeCalledTimes(3);
    await Promise.all([
      user.click(screen.getByLabelText("breed1")),
      user.click(screen.getByLabelText("breed2")),
      user.click(screen.getByLabelText("breed3")),
    ]);
    expect(onChange).toBeCalledTimes(6);
  });
});
