import React, { useReducer } from "react";
import { TextField, NumberField, SelectField, TextAreaField } from "./Fields";
import Form from "./Form";

export interface ICreatePostFormProps {}

// interface ICreatePostFormState {
//   name: string;
//   species: string;
//   sex: number;
//   breed: string[];
//   age: number | null;
//   weight: number | null;
//   microchip: string;
//   coatColor: string[];
//   eyeColor: string[];
//   photos: any[];
//   description: string;
// }

const initialState = {
  name: "",
  species: "",
  sex: "",
  breed: [],
  age: "",
  weight: "",
  microchip: "",
  coatColor: [],
  eyeColor: [],
  photos: [],
  description: "",
};

function reducer(state: any, action: { type: string; payload: any }) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "species":
      return { ...state, species: action.payload };
    case "sex":
      return { ...state, sex: action.payload };
    // case "breed":
    //   return ({...state, breed: [action.payload});
    case "age":
      return { ...state, age: action.payload };
    case "weight":
      return { ...state, weight: action.payload };
    case "microchip":
      return { ...state, microchip: action.payload };
    case "description":
      return { ...state, description: action.payload };
  }
}

export default function CreatePostForm(props: ICreatePostFormProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function createPost() {
    return;
  }

  function setState(e: any) {
    dispatch({ type: e.target.name, payload: e.target.value });
  }

  return (
    <div>
      <Form
        title="Create Post"
        submitText="Create"
        onSubmit={createPost}
        error=""
      >
        {/**
         * TODO:
         *
         * Fields:
         * Name /
         * Species /
         * Sex /
         * Breed
         * Age /
         * Weight /
         * Microchip /
         * Coat colors
         * Eye colors
         * Photos
         * Description /
         *
         * Add styles to non-text fields
         */}
        <TextField name="name" onChange={setState} value={state.name} />
        <SelectField
          name="species"
          options={[
            { label: "Dog", value: "dog" },
            { label: "Cat", value: "cat" },
          ]}
          onChange={setState}
          value={state.species}
        />
        <SelectField
          name="sex"
          options={[
            { label: "Unknown", value: "0" },
            { label: "Male", value: "1" },
            { label: "Female", value: "2" },
          ]}
          onChange={setState}
          value={state.sex}
        />
        <NumberField name="weight" onChange={setState} value={state.weight} />
        <NumberField name="age" onChange={setState} value={state.age} />
        <TextAreaField
          name="description"
          onChange={setState}
          value={state.description}
        />
      </Form>
    </div>
  );
}
