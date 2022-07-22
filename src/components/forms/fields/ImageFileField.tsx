import React from "react";

export interface IImageFileFieldProps {
  id: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
}

export default function ImageFileField({
  id,
  label,
  onChange,
  error = "",
  required = false,
}: IImageFileFieldProps) {
  return (
    <div className="Field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={onChange}
      />
      <div className="Field__optional-text">
        {!required ? "(optional)" : null}
      </div>
      <div className="Field__error">{error}</div>
    </div>
  );
}
