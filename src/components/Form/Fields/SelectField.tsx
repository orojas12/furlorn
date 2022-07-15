import React from "react";
import { capitalizeFirstLetter, splitCamelCase } from "../../../lib/utils";
import "../Field.scss";

export interface ISelectFieldProps {
  name: string;
  options: Array<{
    label: string;
    value: any;
  }>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  required?: boolean;
  error?: string;
}

function getLabelFromName(name: string) {
  return splitCamelCase(capitalizeFirstLetter(name)).join(" ");
}

function getInputElementFromProps(props: ISelectFieldProps) {
  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
      {props.options.map(({ label, value }) => {
        return <option value={value}>{label}</option>;
      })}
    </select>
  );
}

export default function SelectField(props: ISelectFieldProps) {
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
