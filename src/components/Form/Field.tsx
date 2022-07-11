import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../lib/utils";
import "./Field.scss";

export interface IFieldProps {
  label: string;
  type: "text" | "email" | "password" | "checkbox" | "date" | "file" | "number";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  error: string;
}

export default function Field({
  label,
  type,
  onChange,
  value,
  error,
}: IFieldProps) {
  return (
    <label htmlFor={label} className="Field">
      <div className="Field__label">
        {splitCamelCase(capitalizeFirstLetter(label)).join(" ")}
      </div>
      <input type={type} name={label} onChange={onChange} value={value} />
      <div className="Field__error">{error}</div>
    </label>
  );
}
