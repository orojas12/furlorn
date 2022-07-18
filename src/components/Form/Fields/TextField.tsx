import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../../lib/utils";
import "../Field.scss";

export interface ITextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

export default function TextField(props: ITextFieldProps) {
  return (
    <div className="Field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        required={props.required}
        type="text"
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />
      <div className="Field__optional-text">
        {!props.required ? "(optional)" : null}
      </div>
      <div className="Field__error">{props.error || ""}</div>
    </div>
  );
}
