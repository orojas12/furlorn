import React, { useState } from "react";
import MixBreedSelector from "./MixBreedSelector";
import PureBreedSelector from "./PureBreedSelector";
import { SelectField, Modal } from "../../../../components";
import { IBreed } from "../../../../api/pet";
import { IFormAction, IPostFormState } from "../PostFormReducer";
import { ActionType } from "../ActionType";

export interface IBreedSelectorProps {
  state: IPostFormState;
  dispatch: React.Dispatch<IFormAction>;
}

export default function BreedSelector({
  state,
  dispatch,
}: IBreedSelectorProps) {
  const [showSelectBreedModal, setShowSelectBreedModal] = useState(false);

  function handleSelectBreedModalToggle() {
    setShowSelectBreedModal((prevState) => !prevState);
  }

  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    breed: IBreed
  ) {
    if (e.target.checked) {
      dispatch({ type: ActionType.ADD_BREED, payload: breed });
    } else {
      dispatch({ type: ActionType.REMOVE_BREED, payload: breed.id });
    }
  }

  function getSelectedBreedsLabel(): React.ReactNode {
    return `${state.breeds.reduce(
      (prevBreed, currentBreed, index, arr) =>
        prevBreed + `${currentBreed.name}${index < arr.length - 1 ? "/" : ""}`,
      ""
    )} ${state.breedType === "mix" && state.breeds.length > 0 ? "Mix" : ""}`;
  }

  return (
    <fieldset className="CreatePostForm__breed Field">
      <legend>Breed</legend>
      <SelectField
        id="breedType"
        label="Type"
        options={[
          { label: "Unknown", value: "unknown" },
          { label: "Purebred", value: "purebred" },
          { label: "Mix", value: "mix" },
        ]}
        onChange={(e) => {
          dispatch({
            type: ActionType.SET_BREED_TYPE,
            payload: e.target.value,
          });

          if (state.breeds.length === 0) {
            return;
          } else if (state.breedType === "unknown") {
            dispatch({ type: ActionType.CLEAR_BREEDS, payload: null });
          } else if (state.breedType === "purebred") {
            dispatch({
              type: ActionType.SET_BREED,
              payload: state.breeds[0],
            });
          }
        }}
        value={state.breedType}
        required
      />
      <div className="Field">
        <div className="CreatePostForm__selected-breeds">
          {getSelectedBreedsLabel()}
        </div>
        <button
          type="button"
          onClick={handleSelectBreedModalToggle}
          disabled={state.breedType === "unknown"}
        >
          Select Breed...
        </button>
        <Modal
          show={showSelectBreedModal}
          onClose={handleSelectBreedModalToggle}
          title="Select Breed"
        >
          {state.breedType === "mix" ? (
            <MixBreedSelector
              species={state.species}
              fetchedBreeds={state.fetchedBreeds}
              selectedBreeds={state.breeds}
              onChange={handleCheckboxChange}
              onClearAll={() => {
                dispatch({ type: ActionType.CLEAR_BREEDS, payload: null });
              }}
            />
          ) : (
            <PureBreedSelector
              species={state.species}
              fetchedBreeds={state.fetchedBreeds}
              selectedBreeds={state.breeds}
              onChange={(breed) => {
                dispatch({ type: ActionType.SET_BREED, payload: breed });
              }}
            />
          )}

          <button type="button" onClick={handleSelectBreedModalToggle}>
            Close
          </button>
        </Modal>
      </div>
    </fieldset>
  );
}
