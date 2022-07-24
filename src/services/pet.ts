const URL = "http://localhost:8000/api/pets";

export interface IBreed {
  id: number;
  name: string;
  animal: string;
}

export interface IFetchedBreeds {
  dogBreeds: IBreed[];
  catBreeds: IBreed[];
}

export async function _fetchBreeds() {
  let res;
  try {
    res = await fetch(URL + "/breeds", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }

  if (res?.ok) {
    return res.json();
  } else return null;
}

export function _getDogBreedsFromArray(arrayOfBreeds: IBreed[]) {
  return arrayOfBreeds.filter((breed) => breed.animal === "dog");
}

export function _getCatBreedsFromArray(arrayOfBreeds: IBreed[]) {
  return arrayOfBreeds.filter((breed) => breed.animal === "cat");
}

export async function getBreeds(): Promise<IFetchedBreeds> {
  const breeds = await _fetchBreeds();
  const dogBreeds = _getDogBreedsFromArray(breeds);
  const catBreeds = _getCatBreedsFromArray(breeds);
  return { dogBreeds, catBreeds };
}
