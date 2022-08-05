import React, { useState } from "react";
import { IBreed, IFetchedBreeds } from "../../../../services/pet";

interface IPureBreedSelectorProps {
  species: string;
  fetchedBreeds: IFetchedBreeds;
  selectedBreeds: IBreed[];
  onChange: (breed: IBreed) => void;
}

export default function PureBreedSelector({
  species,
  fetchedBreeds,
  selectedBreeds,
  onChange,
}: IPureBreedSelectorProps) {
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function handleRadioChange(
    e: React.ChangeEvent<HTMLInputElement>,
    breed: IBreed
  ) {
    if (e.target.checked) {
      onChange(breed);
    }
  }

  function filterBreeds(
    breeds: IFetchedBreeds,
    filterText: string,
    species: string
  ) {
    if (species === "dog") {
      return breeds.dogs.filter((breed: IBreed) =>
        breed.name.includes(filterText)
      );
    } else if (species === "cat") {
      return breeds.cats.filter((breed: IBreed) =>
        breed.name.includes(filterText)
      );
    } else return [];
  }

  function getRadioInputsFromBreeds(breeds: IBreed[]) {
    return breeds.map((breed) => {
      return (
        <div key={breed.id}>
          <input
            type="radio"
            id={breed.id.toString()}
            checked={selectedBreeds.some((obj) => obj.id === breed.id)}
            onChange={(e) => handleRadioChange(e, breed)}
          />
          <label htmlFor={breed.id.toString()}>{breed.name}</label>
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
        {getRadioInputsFromBreeds(
          filterBreeds(fetchedBreeds, searchText, species)
        )}
      </fieldset>
    </div>
  );
}
