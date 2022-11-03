import * as React from "react";
import { NumberField, SelectField, TextField } from "../../../components";
import BreedSelector from "./fields/BreedSelector";
import ColorSelector from "./fields/ColorSelector";
import { ActionType } from "./ActionType";
import { IFormAction, IPostFormState } from "./PostFormReducer";

export interface IPetDetailsFormProps {
  state: IPostFormState;
  dispatch: React.Dispatch<IFormAction>;
}

export default function PetDetailsForm({
  state,
  dispatch,
}: IPetDetailsFormProps) {
  return (
    <div>
      <SelectField
        id="status"
        label="Status"
        options={[
          { label: "Lost", value: "lost" },
          { label: "Found", value: "found" },
        ]}
        onChange={(e) => {
          dispatch({ type: ActionType.SET_STATUS, payload: e.target.value });
        }}
        value={state.status}
        required
      />
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
      <BreedSelector state={state} dispatch={dispatch} />
      <ColorSelector
        colorOptions={state.fetchedColors}
        selected={state.coatColors}
        onCheck={(color) =>
          dispatch({ type: ActionType.ADD_COAT_COLOR, payload: color })
        }
        onUncheck={(color) =>
          dispatch({ type: ActionType.REMOVE_COAT_COLOR, payload: color })
        }
        onClear={() => {
          dispatch({ type: ActionType.CLEAR_COAT_COLORS, payload: null });
        }}
      />
      <ColorSelector
        colorOptions={state.fetchedColors}
        selected={state.eyeColors}
        onCheck={(color) =>
          dispatch({ type: ActionType.ADD_EYE_COLOR, payload: color })
        }
        onUncheck={(color) =>
          dispatch({ type: ActionType.REMOVE_EYE_COLOR, payload: color })
        }
        onClear={() => {
          dispatch({ type: ActionType.CLEAR_EYE_COLORS, payload: null });
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
    </div>
  );
}
