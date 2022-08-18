import React from "react";
import "./Field.scss";

export interface ITextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  error?: string;
}

export default function TextAreaField({
  id,
  label,
  value,
  onChange,
  required = false,
  error = "",
}: ITextAreaFieldProps) {
  return (
    <div className="Field">
      <label className="Field__label" htmlFor={id}>
        {label}
      </label>
      <textarea id={id} onChange={onChange} value={value} required={required} />
      <div className="Field__optional-text">
        {!required ? "(optional)" : null}
      </div>
      <div className="Field__error">{error}</div>
    </div>
  );
}
