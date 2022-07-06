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
  fields: { [label: string]: fieldType };
  submitText?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function generateFormInputs(fields: IFormProps["fields"]) {
  const inputs = Object.entries(fields).map(([label, type]) => {
    return (
      <label htmlFor={label} className="field">
        <div className="field__label">
          {splitCamelCase(capitalizeFirstLetter(label)).join(" ")}
        </div>
        <input type={type} name={label} />
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
  return (
    <form className="Form" onSubmit={onSubmit}>
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
