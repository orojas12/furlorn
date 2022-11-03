import React, { useState } from "react";
import { IBreed, IFetchedBreeds } from "../../../../api/pet";

interface IMixBreedSelectorProps {
  species: string;
  fetchedBreeds: IFetchedBreeds;
  selectedBreeds: IBreed[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, breed: IBreed) => void;
  onClearAll: () => void;
}

export default function MixBreedSelector({
  species,
  fetchedBreeds,
  selectedBreeds,
  onChange,
  onClearAll,
}: IMixBreedSelectorProps) {
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function getCheckboxes(breeds: IBreed[]) {
    return breeds.map((breed) => {
      return (
        <div key={breed.id}>
          <input
            type="checkbox"
            id={breed.id.toString()}
            checked={selectedBreeds.some((obj) => obj.id === breed.id)}
            onChange={(e) => onChange(e, breed)}
          />
          <label htmlFor={breed.id.toString()}>{breed.name}</label>
        </div>
      );
    });
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
        {getCheckboxes(filterBreeds(fetchedBreeds, searchText, species))}
      </fieldset>
      <button type="button" onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
}
