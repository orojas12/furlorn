import { FormEvent, useState } from "react";
import FormInput, { IFormInputProps } from "./FormInput";

export interface IFormProps {
  id: string;
  title: string;
  inputs: IFormInputProps[];
  initialState: any;
  submitText?: string;
  onSubmit?: (data: FormData) => void;
}

export default function Form(props: IFormProps) {
  const [state, setState] = useState(props.initialState);

  function onChange(e: any) {
    setState((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!props.onSubmit) return;
    const data = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      data.append(key, value as any);
    });
    props.onSubmit(data);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form-title">{props.title}</h2>
      {props.inputs.map((input) => (
        <FormInput
          {...input}
          onChange={onChange}
          value={state[input.name]}
          validate={input.validate}
          formId={props.id}
        />
      ))}
      <button className="btn btn--block btn--primary" type="submit">
        {props.submitText || "Submit"}
      </button>
    </form>
  );
}
