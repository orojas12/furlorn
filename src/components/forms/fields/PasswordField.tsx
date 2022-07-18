import React from "react";
import "./Field.scss";

export interface IPasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  required = false,
  error = "",
}: IPasswordFieldProps) {
  return (
    <div className="Field">
      <label htmlFor={id}>{label}</label>
      <input
        required={required}
        type="password"
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
