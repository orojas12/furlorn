import { useReducer } from "react";
import useAuth from "../../../lib/auth/useAuth";
import { fetchCreatePost } from "../../../services/post";
import PostFormReducer from "./PostFormReducer";
import PostFormErrorReducer from "./PostFormErrorReducer";

const initialState = {
  name: "",
  species: "dog",
  sex: "",
  breedType: "unknown",
  breeds: [],
  age: "",
  weight: "",
  microchip: "",
  coatColors: [],
  eyeColors: [],
  savedImages: [],
  uploadedImage: null,
  description: "",
  status: "",
  fetchedBreeds: {
    dogs: [],
    cats: [],
  },
  fetchedColors: [],
};

const initialErrors = {
  name: "",
  species: "",
  sex: "",
  breed: "",
  age: "",
  weight: "",
  microchip: "",
  coatColors: "",
  eyeColors: "",
  fileUpload: "",
  description: "",
  status: "",
};

export default function usePostForm() {
  const [state, dispatch] = useReducer(PostFormReducer, initialState);
  const [errors, errorDispatch] = useReducer(
    PostFormErrorReducer,
    initialErrors
  );
  const auth = useAuth();

  async function submit() {
    const data = new FormData();
    const pet = {
      name: state.name,
      species: state.species,
      breed: state.breeds.map((breed) => breed.id.toString()),
      sex: state.sex,
      age: state.age,
      weight: state.weight,
      microchip: state.microchip,
      eye_color: state.eyeColors[0],
      coat_color: state.coatColors[0],
    };
    data.append("pet", JSON.stringify(pet));
    data.append("status", state.status);
    data.append("description", state.description);

    for (const file of state.savedImages) {
      data.append("photos", file);
    }

    const res = await fetchCreatePost(data, auth.accessToken);
    console.log(res);
  }

  return { state, dispatch, errors, errorDispatch, submit };
}
