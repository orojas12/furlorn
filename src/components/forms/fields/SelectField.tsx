import React from "react";
import "./Field.scss";

export interface ISelectFieldProps {
  id: string;
  label: string;
  options: Array<{
    label: string;
    value: any;
  }>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  required?: boolean;
  error?: string;
}

export default function SelectField({
  id,
  label,
  options,
  onChange,
  value,
  required = false,
  error = "",
}: ISelectFieldProps) {
  return (
    <div className="Field">
      <label className="Field__label" htmlFor={id}>
        {label}
      </label>
      <select id={id} value={value} onChange={onChange}>
        {options.map(({ label, value }) => {
          return <option value={value}>{label}</option>;
        })}
      </select>
      <div className="Field__optional-text">
        {!required ? "(optional)" : null}
      </div>
      <div className="Field__error">{error}</div>
    </div>
  );
}
