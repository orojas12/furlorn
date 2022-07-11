import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../lib/utils";
import "./Field.scss";

export interface IFieldProps {
  label: string;
  type: "text" | "email" | "password" | "checkbox" | "date" | "file" | "number";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  required?: boolean;
  error?: string;
}

export default function Field({
  label,
  type,
  onChange,
  value,
  required = false,
  error,
}: IFieldProps) {
  return (
    <label htmlFor={label} className="Field">
      <div className="Field__label">
        {splitCamelCase(capitalizeFirstLetter(label)).join(" ")}
      </div>
      <input
        required={required}
        type={type}
        name={label}
        onChange={onChange}
        value={value}
      />
      <div className="Field__optional-text">
        {!required ? "(optional)" : null}
      </div>
      <div className="Field__error">{error || ""}</div>
    </label>
  );
}
