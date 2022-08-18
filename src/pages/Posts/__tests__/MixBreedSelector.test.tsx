import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MixBreedSelector from "../forms/fields/MixBreedSelector";

describe("MixBreedSelector", () => {
  it("has all checkboxes", () => {
    render(
      <MixBreedSelector
        species="dog"
        fetchedBreeds={{
          dogs: [
            { id: 1, name: "breed1", species: "dog" },
            { id: 2, name: "breed2", species: "dog" },
          ],
          cats: [],
        }}
        selectedBreeds={[]}
        onChange={jest.fn()}
        onClearAll={jest.fn()}
      />
    );

    expect(screen.getByLabelText("breed1")).toBeInTheDocument();
    expect(screen.getByLabelText("breed2")).toBeInTheDocument();
  });

  it("calls handlers on click", async () => {
    const onChange = jest.fn();
    const onClearAll = jest.fn();
    const user = userEvent.setup();
    render(
      <MixBreedSelector
        species="dog"
        fetchedBreeds={{
          dogs: [
            { id: 1, name: "breed1", species: "dog" },
            { id: 2, name: "breed2", species: "dog" },
          ],
          cats: [],
        }}
        selectedBreeds={[]}
        onChange={onChange}
        onClearAll={onClearAll}
      />
    );

    await Promise.all([
      user.click(screen.getByLabelText("breed1")),
      user.click(screen.getByLabelText("breed2")),
    ]);
    expect(onChange).toBeCalledTimes(2);
    await Promise.all([
      user.click(screen.getByLabelText("breed1")),
      user.click(screen.getByLabelText("breed2")),
    ]);
    expect(onChange).toBeCalledTimes(4);
  });
});
