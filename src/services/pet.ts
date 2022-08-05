const URL = "http://localhost:8000/api/pets";

export interface IBreed {
  id: number;
  name: string;
  species: string;
}

export interface IFetchedBreeds {
  dogs: IBreed[];
  cats: IBreed[];
}

export interface IColor {
  id: string;
  name: string;
  hex: string;
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
  return arrayOfBreeds.filter((breed) => breed.species === "dog");
}

export function _getCatBreedsFromArray(arrayOfBreeds: IBreed[]) {
  return arrayOfBreeds.filter((breed) => breed.species === "cat");
}

export async function getBreeds(): Promise<IFetchedBreeds> {
  const breeds = await _fetchBreeds();
  const dogs = _getDogBreedsFromArray(breeds);
  const cats = _getCatBreedsFromArray(breeds);
  return { dogs, cats };
}
