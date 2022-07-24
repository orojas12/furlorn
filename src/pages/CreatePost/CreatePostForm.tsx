import React, { useState, useEffect, useReducer } from "react";
import {
  Form,
  TextField,
  NumberField,
  SelectField,
  TextAreaField,
  ImageFileField,
} from "../../components";
import BreedFieldSet from "./BreedFieldSet";
import ColorSelector from "./ColorSelector";
import { IBreed, IFetchedBreeds } from "../../services/pet";
import ImageFileList from "./ImageFileList";
import { getBreeds } from "../../services/pet";

export interface ICreatePostFormProps {}

interface ICreatePostFormState {
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

enum ActionType {
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

interface IFormAction {
  type: ActionType;
  payload: any;
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

export default function CreatePostForm(props: ICreatePostFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fetchedBreeds, setFetchedBreeds] = useState<IFetchedBreeds>({
    dogBreeds: [],
    catBreeds: [],
  });

  useEffect(() => {
    async function fetchBreeds() {
      const breeds = await getBreeds();
      setFetchedBreeds(breeds);
    }
    fetchBreeds();
  }, []);

  function setBreedType(breedType: string) {
    dispatch({ type: ActionType.SET_BREED_TYPE, payload: breedType });

    if (state.breeds.length === 0) {
      return;
    } else if (breedType === "unknown") {
      clearAllBreeds();
    } else if (breedType === "purebred") {
      dispatch({
        type: ActionType.SET_BREED,
        payload: state.breeds[0],
      });
    }
  }

  function setBreed(breed: IBreed) {
    dispatch({
      type: ActionType.SET_BREED,
      payload: breed,
    });
  }

  function addBreed(breed: IBreed) {
    dispatch({
      type: ActionType.ADD_BREED,
      payload: breed,
    });
  }

  function removeBreed(id: number) {
    dispatch({
      type: ActionType.REMOVE_BREED,
      payload: id,
    });
  }

  function clearAllBreeds() {
    dispatch({ type: ActionType.CLEAR_BREEDS, payload: null });
  }

  function addCoatColor(color: string) {
    dispatch({ type: ActionType.ADD_COAT_COLOR, payload: color });
  }

  function removeCoatColor(color: string) {
    dispatch({ type: ActionType.REMOVE_COAT_COLOR, payload: color });
  }

  function clearCoatColors() {
    dispatch({ type: ActionType.CLEAR_COAT_COLORS, payload: null });
  }

  function addEyeColor(color: string) {
    dispatch({ type: ActionType.ADD_EYE_COLOR, payload: color });
  }

  function removeEyeColor(color: string) {
    dispatch({ type: ActionType.REMOVE_EYE_COLOR, payload: color });
  }

  function clearEyeColors() {
    dispatch({ type: ActionType.CLEAR_EYE_COLORS, payload: null });
  }

  async function createPost() {
    return;
  }

  return (
    <Form
      title="Create Post"
      submitText="Create"
      onSubmit={createPost}
      error=""
    >
      {/**
       * TODO:
       *
       * Add fields:
       * Name - done
       * Species - done
       * Sex - done
       * Breed - done
       * Age - done
       * Weight - done
       * Microchip - done
       * Coat colors - done
       * Eye colors - done
       * Photos - done
       * Description - done
       *
       * Add styles to non-text fields
       * Add form submission
       */}
      <TextField
        id="name"
        label="Name"
        onChange={(e) => {
          dispatch({ type: ActionType.SET_NAME, payload: e.target.value });
        }}
        value={state.name}
      />
      <SelectField
        id="species"
        label="Species"
        options={[
          { label: "Dog", value: "dog" },
          { label: "Cat", value: "cat" },
        ]}
        onChange={(e) => {
          dispatch({ type: ActionType.SET_SPECIES, payload: e.target.value });
          dispatch({ type: ActionType.CLEAR_BREEDS, payload: null });
        }}
        value={state.species}
        required
      />
      <SelectField
        id="age"
        label="Age"
        options={[
          { label: "Unknown", value: "0" },
          { label: "Young", value: "1" },
          { label: "Adult", value: "2" },
          { label: "Senior", value: "3" },
        ]}
        onChange={(e) => {
          dispatch({ type: ActionType.SET_AGE, payload: e.target.value });
        }}
        value={state.age}
        required
      />
      <SelectField
        id="sex"
        label="Sex"
        options={[
          { label: "Unknown", value: "0" },
          { label: "Male", value: "1" },
          { label: "Female", value: "2" },
        ]}
        onChange={(e) => {
          dispatch({ type: ActionType.SET_SEX, payload: e.target.value });
        }}
        value={state.sex}
        required
      />
      <BreedFieldSet
        species={state.species}
        breedType={state.breedType}
        fetchedBreeds={fetchedBreeds}
        selectedBreeds={state.breeds}
        onSetBreed={setBreed}
        onAddBreed={addBreed}
        onRemoveBreed={removeBreed}
        onBreedTypeChange={setBreedType}
        onClearAllBreeds={clearAllBreeds}
      />
      <ColorSelector
        colorOptions={["red", "green", "blue"]}
        selected={state.coatColors}
        onChange={(e) => {
          const value = e.target.value;
          if (e.target.checked) {
            addCoatColor(value);
          } else {
            removeCoatColor(value);
          }
        }}
        onClear={(e) => {
          clearCoatColors();
        }}
      />
      <ColorSelector
        colorOptions={["orange", "yellow", "purple"]}
        selected={state.eyeColors}
        onChange={(e) => {
          const value = e.target.value;
          if (e.target.checked) {
            addEyeColor(value);
          } else {
            removeEyeColor(value);
          }
        }}
        onClear={(e) => {
          clearEyeColors();
        }}
      />
      <NumberField
        id="weight"
        label="Weight"
        onChange={(e) => {
          dispatch({ type: ActionType.SET_WEIGHT, payload: e.target.value });
        }}
        value={state.weight}
      />
      <TextField
        id="microchip"
        label="Microchip"
        onChange={(e) => {
          dispatch({ type: ActionType.SET_MICROCHIP, payload: e.target.value });
        }}
        value={state.microchip}
      />
      <ImageFileList
        files={state.imageFiles}
        onDelete={(e) => {
          const index = parseInt(
            e.currentTarget.dataset.fileListIndex as string
          );
          dispatch({ type: ActionType.REMOVE_IMAGE_FILE, payload: index });
        }}
      />
      <ImageFileField
        id="uploadPhoto"
        label="Upload Photo"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          for (let i = 0; i < files.length; i++) {
            dispatch({
              type: ActionType.ADD_IMAGE_FILE,
              payload: files.item(i),
            });
          }
        }}
      />
      <TextAreaField
        id="description"
        label="Description"
        onChange={(e) => {
          dispatch({
            type: ActionType.SET_DESCRIPTION,
            payload: e.target.value,
          });
        }}
        value={state.description}
      />
    </Form>
  );
}
