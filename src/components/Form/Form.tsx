import * as React from "react";
import Button from "../Button/Button";
import { capitalizeFirstLetter, splitCamelCase } from "../../lib/utils";
import "./Form.scss";

type fieldType =
  | "text"
  | "email"
  | "password"
  | "checkbox"
  | "date"
  | "file"
  | "number";

interface IFormProps {
  title?: string;
  fields: {
    [label: string]: {
      type: fieldType;
      state: any;
      setState: React.Dispatch<React.SetStateAction<string>>;
    };
  };
  submitText?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit: Function;
}

function generateFormInputs(fields: IFormProps["fields"]) {
  const inputs = Object.entries(fields).map(([label, field]) => {
    return (
      <label htmlFor={label} className="field">
        <div className="field__label">
          {splitCamelCase(capitalizeFirstLetter(label)).join(" ")}
        </div>
        <input
          type={field.type}
          name={label}
          onChange={(e) => field.setState(e.target.value)}
          value={field.state}
        />
        <div className="field__error"></div>
      </label>
    );
  });
  return inputs;
}

export default function Form({
  title,
  fields,
  submitText,
  onSubmit,
  children,
  footer,
}: IFormProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {title ? <h1 className="Form__title">{title}</h1> : null}
      {generateFormInputs(fields)}
      {children}
      <Button type="submit" btnStyle="primary">
        {submitText || "Submit"}
      </Button>
      {footer}
    </form>
  );
}
