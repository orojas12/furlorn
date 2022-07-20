import { useState } from "react";
import { Button } from "../../components";
import IBreed from "./IBreed";

interface IMixBreedSelectorProps {
  breeds: IBreed[];
  selectedBreeds: IBreed[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClearAll: () => void;
}

export default function MixBreedSelector({
  breeds,
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
            value={breed.value}
            checked={selectedBreeds.some((obj) => obj.id === breed.id)}
            onChange={onChange}
          />
          <label htmlFor={breed.id.toString()}>{breed.value}</label>
        </div>
      );
    });
  }

  function filterBreeds(breeds: IBreed[], filterText: string) {
    return breeds.filter((breed) => breed.value.includes(filterText));
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
        {getCheckboxes(filterBreeds(breeds, searchText))}
      </fieldset>
      <Button type="button" btnStyle="secondary" onClick={onClearAll}>
        Clear All
      </Button>
    </div>
  );
}
