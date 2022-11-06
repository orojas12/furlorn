import { IBreed, IColor, IFetchedBreeds } from "../../../api/pet";
import { ActionType } from "./ActionType";

export interface IFormAction {
  type: ActionType;
  payload: any;
}

export interface IPostFormState {
  name: string;
  species: string;
  sex: string;
  breedType: string;
  breeds: IBreed[];
  fetchedBreeds: IFetchedBreeds;
  fetchedColors: IColor[];
  age: string;
  weight: string;
  microchip: string;
  coatColors: IColor[];
  eyeColors: IColor[];
  savedImages: Blob[];
  uploadedImage: File | null;
  description: string;
  status: string;
}

export default function PostFormReducer(
  state: IPostFormState,
  action: IFormAction
): IPostFormState {
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
    case ActionType.SET_UPLOADED_IMAGE:
      return { ...state, uploadedImage: action.payload };
    case ActionType.ADD_SAVED_IMAGE:
      console.log(`Saved image`, action.payload);
      return { ...state, savedImages: [...state.savedImages, action.payload] };
    case ActionType.REMOVE_SAVED_IMAGE:
      return {
        ...state,
        savedImages: state.savedImages.filter((blob) => {
          return blob !== action.payload;
        }),
      };
    case ActionType.SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
