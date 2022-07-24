const URL = "http://localhost:8000/api/pets";

interface IBreed {
  id: number;
  name: string;
  type: string;
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
  return arrayOfBreeds.filter((breed) => breed.type === "dog");
}

export function _getCatBreedsFromArray(arrayOfBreeds: IBreed[]) {
  return arrayOfBreeds.filter((breed) => breed.type === "cat");
}

export async function getBreeds(animal: string, src: any = null) {
  const breeds = src ? src() : await _fetchBreeds();
  if (animal === "dog") {
    return _getDogBreedsFromArray(breeds);
  } else if (animal === "cat") {
    return _getCatBreedsFromArray(breeds);
  } else return null;
}
