import React, { useState } from "react";
import { Button } from "../../components";
import IBreed from "./IBreed";

export default function PureBreedSelector({
  breeds,
  selectedBreeds,
  onChange,
}: {
  breeds: IBreed[];
  selectedBreeds: IBreed[];
  onChange: (breed: IBreed) => void;
}) {
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = parseInt(e.target.id);
    const value = e.target.value;
    if (e.target.checked) {
      onChange({ id, value });
    }
  }

  function filterBreeds(breeds: IBreed[], filterText: string) {
    return breeds.filter((breed) => breed.value.includes(filterText));
  }

  function getRadioInputsFromBreeds(breeds: IBreed[]) {
    return breeds.map((breed) => {
      return (
        <div key={breed.id}>
          <input
            type="radio"
            id={breed.id.toString()}
            checked={selectedBreeds.some((obj) => obj.id === breed.id)}
            value={breed.value}
            onChange={handleRadioChange}
          />
          <label htmlFor={breed.id.toString()}>{breed.value}</label>
        </div>
      );
    });
  }

  return (
    <div className="CreatePostForm__breed-selector">
      <input
        className=""
        type="text"
        placeholder="Type to search..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <fieldset className="CreatePostForm__breed-list">
        {getRadioInputsFromBreeds(filterBreeds(breeds, searchText))}
      </fieldset>
    </div>
  );
}
