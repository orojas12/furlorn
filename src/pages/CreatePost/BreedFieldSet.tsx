import React, { useState } from "react";
import MixBreedSelector from "./MixBreedSelector";
import PureBreedSelector from "./PureBreedSelector";
import { SelectField, Button, Modal } from "../../components";
import { IBreed, IFetchedBreeds } from "../../services/pet";

export interface IBreedFieldSetProps {
  species: string;
  breedType: string;
  fetchedBreeds: IFetchedBreeds;
  selectedBreeds: IBreed[];
  onSetBreed: (breed: IBreed) => void;
  onAddBreed: (breed: IBreed) => void;
  onRemoveBreed: (id: number) => void;
  onClearAllBreeds: () => void;
  onBreedTypeChange: (breedType: string) => void;
}

export default function BreedFieldSet(props: IBreedFieldSetProps) {
  const [showSelectBreedModal, setShowSelectBreedModal] = useState(false);

  function handleSelectBreedModalToggle() {
    setShowSelectBreedModal((prevState) => !prevState);
  }

  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    breed: IBreed
  ) {
    if (e.target.checked) {
      props.onAddBreed({
        id: breed.id,
        name: breed.name,
        animal: breed.animal,
      });
    } else {
      props.onRemoveBreed(breed.id);
    }
  }

  function getSelectedBreedsLabel(): React.ReactNode {
    return `${props.selectedBreeds.reduce(
      (prevBreed, currentBreed, index, arr) =>
        prevBreed + `${currentBreed.name}${index < arr.length - 1 ? "/" : ""}`,
      ""
    )} ${
      props.breedType === "mix" && props.selectedBreeds.length > 0 ? "Mix" : ""
    }`;
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
        onChange={(e) => props.onBreedTypeChange(e.target.value)}
        value={props.breedType}
        required
      />
      <div className="Field">
        <div className="CreatePostForm__selected-breeds">
          {getSelectedBreedsLabel()}
        </div>
        {props.breedType !== "unknown" ? (
          <Button
            type="button"
            btnStyle="secondary"
            onClick={handleSelectBreedModalToggle}
          >
            Select Breed...
          </Button>
        ) : null}

        <Modal
          show={showSelectBreedModal}
          onClose={handleSelectBreedModalToggle}
          title="Select Breed"
        >
          {props.breedType === "mix" ? (
            <MixBreedSelector
              species={props.species}
              fetchedBreeds={props.fetchedBreeds}
              selectedBreeds={props.selectedBreeds}
              onChange={handleCheckboxChange}
              onClearAll={props.onClearAllBreeds}
            />
          ) : (
            <PureBreedSelector
              species={props.species}
              fetchedBreeds={props.fetchedBreeds}
              selectedBreeds={props.selectedBreeds}
              onChange={props.onSetBreed}
            />
          )}

          <Button
            type="button"
            btnStyle="primary"
            onClick={handleSelectBreedModalToggle}
          >
            Close
          </Button>
        </Modal>
      </div>
    </fieldset>
  );
}
