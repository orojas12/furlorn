import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PureBreedSelector from "../PureBreedSelector";

describe("PureBreedSelector", () => {
  it("has all radio buttons", () => {
    render(
      <PureBreedSelector
        breeds={[
          { id: 1, value: "breed1" },
          { id: 2, value: "breed2" },
          { id: 3, value: "breed3" },
        ]}
        selectedBreeds={[]}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("breed1")).toBeInTheDocument();
    expect(screen.getByLabelText("breed2")).toBeInTheDocument();
    expect(screen.getByLabelText("breed3")).toBeInTheDocument();
  });

  it("calls onChange on click", async () => {
    const stub = jest.fn();
    const user = userEvent.setup();
    render(
      <PureBreedSelector
        breeds={[
          { id: 1, value: "breed1" },
          { id: 2, value: "breed2" },
          { id: 3, value: "breed3" },
        ]}
        selectedBreeds={[]}
        onChange={stub}
      />
    );

    await user.click(screen.getByLabelText("breed1"));
    expect(stub).toBeCalledTimes(1);
  });
});
