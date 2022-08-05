import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostFormReducer from "../forms/PostFormReducer";

describe("usePostForm reducer", () => {
  const prevState: any = {
    name: "",
    species: "",
    sex: "",
    breedType: "unknown",
    breeds: ["breed1"],
    age: "",
    weight: "",
    microchip: "",
    coatColors: ["red"],
    eyeColors: ["orange"],
    savedImages: [],
    uploadedImage: null,
    description: "",
  };

  function stateIsEqual(
    prevState: { [key: string]: any },
    state: { [key: string]: any },
    exclude: string[]
  ) {
    for (const [key, value] of Object.entries(state)) {
      if (value !== prevState[key] && !exclude.includes(key)) return false;
    }
    return true;
  }

  it("sets name", () => {
    const state = PostFormReducer(prevState, {
      type: "setName" as any,
      payload: "test",
    });
    expect(state.name).toEqual("test");
    expect(stateIsEqual(prevState, state, ["name"])).toEqual(true);
  });

  it("sets species", () => {
    const state = PostFormReducer(prevState, {
      type: "setSpecies" as any,
      payload: "test",
    });
    expect(state.species).toEqual("test");
    expect(stateIsEqual(prevState, state, ["species"])).toEqual(true);
  });

  it("sets sex", () => {
    const state = PostFormReducer(prevState, {
      type: "setSex" as any,
      payload: "test",
    });
    expect(state.sex).toEqual("test");
    expect(stateIsEqual(prevState, state, ["sex"])).toEqual(true);
  });

  it("sets breeds", () => {
    const state = PostFormReducer(prevState, {
      type: "setBreeds" as any,
      payload: ["breed1", "breed2"],
    });
    expect(state.breeds).toEqual(["breed1", "breed2"]);
    expect(stateIsEqual(prevState, state, ["breeds"])).toEqual(true);
  });

  it("sets breed", () => {
    const state = PostFormReducer(prevState, {
      type: "setBreed" as any,
      payload: "breed1",
    });
    expect(state.breeds).toEqual(["breed1"]);
    expect(stateIsEqual(prevState, state, ["breeds"])).toEqual(true);
  });

  it("adds breed", () => {
    const state = PostFormReducer(prevState, {
      type: "addBreed" as any,
      payload: "breed2",
    });
    expect(state.breeds).toEqual([...prevState.breeds, "breed2"]);
    expect(stateIsEqual(prevState, state, ["breeds"])).toEqual(true);
  });

  it("removes breed", () => {
    const state = PostFormReducer(prevState, {
      type: "setBreed" as any,
      payload: "breed1",
    });
    expect(state.breeds).toEqual(["breed1"]);
    expect(stateIsEqual(prevState, state, ["breeds"])).toEqual(true);
  });

  it("clears breeds", () => {
    const state = PostFormReducer(prevState, {
      type: "clearBreeds" as any,
      payload: "breed1",
    });
    expect(state.breeds).toEqual([]);
    expect(stateIsEqual(prevState, state, ["breeds"])).toEqual(true);
  });

  it("sets breed type", () => {
    const state = PostFormReducer(prevState, {
      type: "setBreedType" as any,
      payload: "type1",
    });
    expect(state.breedType).toEqual("type1");
    expect(stateIsEqual(prevState, state, ["breedType"])).toEqual(true);
  });

  it("sets age", () => {
    const state = PostFormReducer(prevState, {
      type: "setAge" as any,
      payload: 1,
    });
    expect(state.age).toEqual(1);
    expect(stateIsEqual(prevState, state, ["age"])).toEqual(true);
  });

  it("sets weight", () => {
    const state = PostFormReducer(prevState, {
      type: "setWeight" as any,
      payload: 1,
    });
    expect(state.weight).toEqual(1);
    expect(stateIsEqual(prevState, state, ["weight"])).toEqual(true);
  });

  it("sets microchip", () => {
    const state = PostFormReducer(prevState, {
      type: "setMicrochip" as any,
      payload: 1,
    });
    expect(state.microchip).toEqual(1);
    expect(stateIsEqual(prevState, state, ["microchip"])).toEqual(true);
  });

  it("sets description", () => {
    const state = PostFormReducer(prevState, {
      type: "setDescription" as any,
      payload: 1,
    });
    expect(state.description).toEqual(1);
    expect(stateIsEqual(prevState, state, ["description"])).toEqual(true);
  });

  it("adds coat color", () => {
    const state = PostFormReducer(prevState, {
      type: "addCoatColor" as any,
      payload: "blue",
    });
    expect(state.coatColors).toEqual([...prevState.coatColors, "blue"]);
    expect(stateIsEqual(prevState, state, ["coatColors"])).toEqual(true);
  });

  it("removes coat color", () => {
    const state = PostFormReducer(prevState, {
      type: "removeCoatColor" as any,
      payload: "red",
    });
    expect(state.coatColors).toEqual([]);
    expect(stateIsEqual(prevState, state, ["coatColors"])).toEqual(true);
  });

  it("clears coat colors", () => {
    const state = PostFormReducer(prevState, {
      type: "clearCoatColors" as any,
      payload: "green",
    });
    expect(state.coatColors).toEqual([]);
    expect(stateIsEqual(prevState, state, ["coatColors"])).toEqual(true);
  });

  it("adds eye color", () => {
    const state = PostFormReducer(prevState, {
      type: "addEyeColor" as any,
      payload: "blue",
    });
    expect(state.eyeColors).toEqual([...prevState.eyeColors, "blue"]);
    expect(stateIsEqual(prevState, state, ["eyeColors"])).toEqual(true);
  });

  it("removes eye color", () => {
    const state = PostFormReducer(prevState, {
      type: "removeEyeColor" as any,
      payload: "orange",
    });
    expect(state.eyeColors).toEqual([]);
    expect(stateIsEqual(prevState, state, ["eyeColors"])).toEqual(true);
  });

  it("clears eye colors", () => {
    const state = PostFormReducer(prevState, {
      type: "clearEyeColors" as any,
      payload: "green",
    });
    expect(state.eyeColors).toEqual([]);
    expect(stateIsEqual(prevState, state, ["eyeColors"])).toEqual(true);
  });

  it("sets uploaded image", () => {
    const file = new File([new ArrayBuffer(1)], "test.png");
    const state = PostFormReducer(prevState, {
      type: "setUploadedImage" as any,
      payload: file,
    });
    expect(state.uploadedImage).toEqual(file);
    expect(stateIsEqual(prevState, state, ["uploadedImage"])).toEqual(true);
  });

  it("adds saved image", () => {
    const blob = new Blob();
    const state = PostFormReducer(prevState, {
      type: "addSavedImage" as any,
      payload: blob,
    });
    expect(state.savedImages).toEqual([...prevState.savedImages, blob]);
    expect(stateIsEqual(prevState, state, ["savedImages"])).toEqual(true);
  });

  it("removes saved image", () => {
    const blob = new Blob();
    const firstState = PostFormReducer(prevState, {
      type: "addSavedImage" as any,
      payload: blob,
    });
    const secondState = PostFormReducer(firstState, {
      type: "removeSavedImage" as any,
      payload: blob,
    });
    expect(secondState.savedImages).toEqual([]);
    expect(stateIsEqual(prevState, secondState, ["savedImages"])).toEqual(true);
  });

  it("returns previous state if invalid action type", () => {
    const state = PostFormReducer(prevState, {
      type: "invalid" as any,
      payload: 1,
    });
    expect(state).toEqual(prevState);
  });
});
