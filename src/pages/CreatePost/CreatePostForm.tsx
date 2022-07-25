import { useState, useEffect } from "react";
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
import useCreatePostForm, { ActionType } from "./useCreatePostForm";

export interface ICreatePostFormProps {}

export default function CreatePostForm(props: ICreatePostFormProps) {
  const { state, dispatch, errors, errorDispatch } = useCreatePostForm();
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

  async function submit() {
    return;
  }

  function validateFile(file: File) {
    const maxSize = 1000 * 1024; // 1MB
    if (file.size > maxSize) {
      throw new Error("File too large. Maximum file size is 10MB.");
    }
  }

  return (
    <Form title="Create Post" submitText="Create" onSubmit={submit} error="">
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
        error={errors.fileUpload}
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          for (let i = 0; i < files.length; i++) {
            const file = files.item(i) as File;
            try {
              validateFile(file);
            } catch (error: any) {
              errorDispatch({ type: "fileUpload", payload: error.message });
              return;
            }

            dispatch({
              type: ActionType.ADD_IMAGE_FILE,
              payload: file,
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
