import React from "react";
import "./ImageFileField.scss";

export interface IImageFileFieldProps {
  inputRef?: any;
  id: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
}

export default function ImageFileField({
  inputRef = null,
  id,
  label,
  onChange,
  error = "",
  required = false,
}: IImageFileFieldProps) {
  return (
    <div className="Field ImageFileField">
      <label htmlFor={id}>
        {label}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png"
          onChange={onChange}
          onClick={(e) => (e.currentTarget.value = "")}
        />
      </label>
      <div className="Field__error">{error}</div>
    </div>
  );
}
