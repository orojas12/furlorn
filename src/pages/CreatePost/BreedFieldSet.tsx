import React, { useState } from "react";
import MixBreedSelector from "./MixBreedSelector";
import PureBreedSelector from "./PureBreedSelector";
import { SelectField, Button, Modal } from "../../components";
import IBreed from "./IBreed";

export interface IBreedFieldSetProps {
  breedType: string;
  breeds: IBreed[];
  onSetSingleBreed: (breed: IBreed) => void;
  onAddBreed: (breed: IBreed) => void;
  onRemoveBreed: (breed: IBreed) => void;
  onClearAllBreeds: () => void;
  onBreedTypeChange: (breedType: string) => void;
}

export default function BreedFieldSet({
  breedType,
  breeds,
  onSetSingleBreed,
  onAddBreed,
  onRemoveBreed,
  onClearAllBreeds,
  onBreedTypeChange,
}: IBreedFieldSetProps) {
  const [showSelectBreedModal, setShowSelectBreedModal] = useState(false);

  function handleSelectBreedModalToggle() {
    setShowSelectBreedModal((prevState) => !prevState);
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = parseInt(e.target.id);
    const value = e.target.value;
    if (e.target.checked) {
      onAddBreed({ id, value });
    } else {
      onRemoveBreed({ id, value });
    }
  }

  function getBreedName(): React.ReactNode {
    return `${breeds.reduce(
      (prevBreed, currentBreed, index, arr) =>
        prevBreed + `${currentBreed.value}${index < arr.length - 1 ? "/" : ""}`,
      ""
    )} ${breedType === "mix" && breeds.length > 0 ? "Mix" : ""}`;
  }

  return (
    <fieldset className="CreatePostForm__breed">
      <legend>Breed</legend>
      <SelectField
        id="breedType"
        label="Type"
        options={[
          { label: "Unknown", value: "unknown" },
          { label: "Purebred", value: "purebred" },
          { label: "Mix", value: "mix" },
        ]}
        onChange={(e) => onBreedTypeChange(e.target.value)}
        value={breedType}
        required
      />
      <div className="Field">
        <div className="CreatePostForm__selected-breeds">{getBreedName()}</div>
        {breedType !== "unknown" ? (
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
          {breedType === "mix" ? (
            <MixBreedSelector
              breeds={[
                { id: 1, value: "breed1" },
                { id: 2, value: "breed2" },
                { id: 3, value: "breed3" },
                { id: 4, value: "breed4" },
                { id: 5, value: "breed5" },
                { id: 6, value: "breed6" },
                { id: 7, value: "breed7" },
                { id: 8, value: "breed8" },
                { id: 9, value: "breed9" },
                { id: 10, value: "breed10" },
                { id: 11, value: "breed11" },
                { id: 12, value: "breed12" },
                { id: 13, value: "breed13" },
              ]}
              selectedBreeds={breeds}
              onChange={handleCheckboxChange}
              onClearAll={onClearAllBreeds}
            />
          ) : (
            <PureBreedSelector
              breeds={[
                { id: 1, value: "breed1" },
                { id: 2, value: "breed2" },
                { id: 3, value: "breed3" },
                { id: 4, value: "breed4" },
                { id: 5, value: "breed5" },
                { id: 6, value: "breed6" },
                { id: 7, value: "breed7" },
                { id: 8, value: "breed8" },
                { id: 9, value: "breed9" },
                { id: 10, value: "breed10" },
                { id: 11, value: "breed11" },
                { id: 12, value: "breed12" },
                { id: 13, value: "breed13" },
              ]}
              selectedBreeds={breeds}
              onChange={onSetSingleBreed}
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
