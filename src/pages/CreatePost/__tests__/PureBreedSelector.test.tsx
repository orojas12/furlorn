import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PureBreedSelector from "../PureBreedSelector";

describe("PureBreedSelector", () => {
  it("has all radio buttons", () => {
    render(
      <PureBreedSelector
        species="dog"
        fetchedBreeds={{
          dogBreeds: [
            { id: 1, name: "breed1", animal: "dog" },
            { id: 2, name: "breed2", animal: "dog" },
          ],
          catBreeds: [],
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
          dogBreeds: [
            { id: 1, name: "breed1", animal: "dog" },
            { id: 2, name: "breed2", animal: "dog" },
          ],
          catBreeds: [],
        }}
        selectedBreeds={[]}
        onChange={stub}
      />
    );

    await user.click(screen.getByLabelText("breed1"));
    expect(stub).toBeCalledTimes(1);
  });
});
