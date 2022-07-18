import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../../lib/utils";
import "../Field.scss";

export interface INumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

export default function NumberField({
  id,
  label,
  value,
  onChange,
  required = false,
  error = "",
}: INumberFieldProps) {
  return (
    <div className="Field">
      <label className="Field__label" htmlFor={id}>
        {label}
      </label>
      <input
        required={required}
        type="number"
        id={id}
        onChange={onChange}
        value={value}
      />
      <div className="Field__optional-text">
        {!required ? "(optional)" : null}
      </div>
      <div className="Field__error">{error}</div>
    </div>
  );
}
