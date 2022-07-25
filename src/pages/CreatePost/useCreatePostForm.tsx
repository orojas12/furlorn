import { useReducer } from "react";
import { IBreed } from "../../services/pet";

export enum ActionType {
  SET_NAME = "setName",
  SET_SPECIES = "setSpecies",
  SET_SEX = "setSex",
  SET_BREEDS = "setBreeds",
  SET_BREED = "setBreed",
  ADD_BREED = "addBreed",
  REMOVE_BREED = "removeBreed",
  CLEAR_BREEDS = "clearBreeds",
  SET_BREED_TYPE = "setBreedType",
  SET_AGE = "setAge",
  SET_WEIGHT = "setWeight",
  SET_MICROCHIP = "setMicrochip",
  SET_DESCRIPTION = "setDescription",
  ADD_COAT_COLOR = "addCoatColor",
  REMOVE_COAT_COLOR = "removeCoatColor",
  CLEAR_COAT_COLORS = "clearCoatColors",
  ADD_EYE_COLOR = "addEyeColor",
  REMOVE_EYE_COLOR = "removeEyeColor",
  CLEAR_EYE_COLORS = "clearEyeColors",
  REMOVE_IMAGE_FILE = "removeImageFile",
  ADD_IMAGE_FILE = "addImageFile",
}

export interface IFormAction {
  type: ActionType;
  payload: any;
}

export interface ICreatePostFormState {
  name: string;
  species: string;
  sex: string;
  breedType: string;
  breeds: IBreed[];
  age: string;
  weight: string;
  microchip: string;
  coatColors: string[];
  eyeColors: string[];
  imageFiles: File[];
  description: string;
}

interface IErrorState {
  name: string;
  species: string;
  sex: string;
  breed: string;
  age: string;
  weight: string;
  microchip: string;
  coatColors: string;
  eyeColors: string;
  fileUpload: string;
  description: string;
}

function reducer(
  state: ICreatePostFormState,
  action: IFormAction
): ICreatePostFormState {
  switch (action.type) {
    case ActionType.SET_NAME:
      return { ...state, name: action.payload };
    case ActionType.SET_SPECIES:
      return { ...state, species: action.payload };
    case ActionType.SET_SEX:
      return { ...state, sex: action.payload };
    case ActionType.SET_BREEDS:
      return { ...state, breeds: action.payload };
    case ActionType.SET_BREED:
      return { ...state, breeds: [action.payload] };
    case ActionType.ADD_BREED:
      return { ...state, breeds: [...state.breeds, action.payload] };
    case ActionType.REMOVE_BREED:
      return {
        ...state,
        breeds: state.breeds.filter((breed) => breed.id !== action.payload),
      };
    case ActionType.CLEAR_BREEDS:
      return { ...state, breeds: [] };
    case ActionType.SET_BREED_TYPE:
      return { ...state, breedType: action.payload };
    case ActionType.SET_AGE:
      return { ...state, age: action.payload };
    case ActionType.SET_WEIGHT:
      return { ...state, weight: action.payload };
    case ActionType.SET_MICROCHIP:
      return { ...state, microchip: action.payload };
    case ActionType.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case ActionType.ADD_COAT_COLOR:
      return { ...state, coatColors: [...state.coatColors, action.payload] };
    case ActionType.REMOVE_COAT_COLOR:
      return {
        ...state,
        coatColors: state.coatColors.filter(
          (value) => value !== action.payload
        ),
      };
    case ActionType.CLEAR_COAT_COLORS:
      return { ...state, coatColors: [] };
    case ActionType.ADD_EYE_COLOR:
      return { ...state, eyeColors: [...state.eyeColors, action.payload] };
    case ActionType.REMOVE_EYE_COLOR:
      return {
        ...state,
        eyeColors: state.eyeColors.filter((value) => value !== action.payload),
      };
    case ActionType.CLEAR_EYE_COLORS:
      return { ...state, eyeColors: [] };
    case ActionType.ADD_IMAGE_FILE:
      return { ...state, imageFiles: [...state.imageFiles, action.payload] };
    case ActionType.REMOVE_IMAGE_FILE:
      return {
        ...state,
        imageFiles: state.imageFiles.filter((file, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}

function errorReducer(
  state: IErrorState,
  action: { type: string; payload: string }
): IErrorState {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "species":
      return { ...state, species: action.payload };
    case "sex":
      return { ...state, sex: action.payload };
    case "breed":
      return { ...state, breed: action.payload };
    case "age":
      return { ...state, age: action.payload };
    case "weight":
      return { ...state, weight: action.payload };
    case "microchip":
      return { ...state, microchip: action.payload };
    case "coatColors":
      return { ...state, coatColors: action.payload };
    case "eyeColors":
      return { ...state, eyeColors: action.payload };
    case "fileUpload":
      return { ...state, fileUpload: action.payload };
    case "description":
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

const initialState = {
  name: "",
  species: "",
  sex: "",
  breedType: "unknown",
  breeds: [],
  age: "",
  weight: "",
  microchip: "",
  coatColors: ["red", "green", "blue"],
  eyeColors: ["orange", "yellow", "purple"],
  imageFiles: [],
  description: "",
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
};

export default function useCreatePostForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, errorDispatch] = useReducer(errorReducer, initialErrors);

  return { state, dispatch, errors, errorDispatch };
}
