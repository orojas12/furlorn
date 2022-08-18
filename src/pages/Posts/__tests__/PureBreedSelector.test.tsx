import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PureBreedSelector from "../forms/fields/PureBreedSelector";

describe("PureBreedSelector", () => {
  it("has all radio buttons", () => {
    render(
      <PureBreedSelector
        species="dog"
        fetchedBreeds={{
          dogs: [
            { id: 1, name: "breed1", species: "dog" },
            { id: 2, name: "breed2", species: "dog" },
          ],
          cats: [],
        }}
        selectedBreeds={[]}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("breed1")).toBeInTheDocument();
    expect(screen.getByLabelText("breed2")).toBeInTheDocument();
  });

  it("calls onChange on click", async () => {
    const stub = jest.fn();
    const user = userEvent.setup();
    render(
      <PureBreedSelector
        species="dog"
        fetchedBreeds={{
          dogs: [
            { id: 1, name: "breed1", species: "dog" },
            { id: 2, name: "breed2", species: "dog" },
          ],
          cats: [],
        }}
        selectedBreeds={[]}
        onChange={stub}
      />
    );

    await user.click(screen.getByLabelText("breed1"));
    expect(stub).toBeCalledTimes(1);
  });
});
