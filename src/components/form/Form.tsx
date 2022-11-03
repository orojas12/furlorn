import { useState } from "react";
import FormInput, { IFormInputProps } from "./FormInput";

export interface IFormProps {
  id: string;
  inputs: IFormInputProps[];
  initialState: any;
}

export default function Form(props: IFormProps) {
  const [state, setState] = useState(props.initialState);

  function onChange(e: any) {
    setState((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form className="form">
      {props.inputs.map((input) => (
        <FormInput
          {...input}
          value={state[input.name]}
          onChange={onChange}
          formId={props.id}
        />
      ))}
      <button className="btn btn--block btn--primary" type="submit">
        Submit
      </button>
    </form>
  );
}
