import React from "react";
import "../Field.scss";

export interface ITextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  required = false,
  error = "",
}: ITextFieldProps) {
  return (
    <div className="Field">
      <label htmlFor={id}>{label}</label>
      <input
        required={required}
        type="text"
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
