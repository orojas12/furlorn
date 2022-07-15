import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../../lib/utils";
import "../Field.scss";

export interface INumberFieldProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

function getLabelFromName(name: string) {
  return splitCamelCase(capitalizeFirstLetter(name)).join(" ");
}

function getInputElementFromProps(props: INumberFieldProps) {
  return (
    <input
      required={props.required}
      type="number"
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    />
  );
}

export default function NumberField(props: INumberFieldProps) {
  return (
    <label htmlFor={props.name} className="Field">
      <div className="Field__label">{getLabelFromName(props.name)}</div>
      {getInputElementFromProps(props)}
      <div className="Field__optional-text">
        {!props.required ? "(optional)" : null}
      </div>
      <div className="Field__error">{props.error || ""}</div>
    </label>
  );
}
