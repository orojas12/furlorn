import React from "react";
import { Badge, Tooltip } from "../ui";

export interface IFormInputProps {
  key: number;
  name: string;
  type: string;
  label: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required: boolean;
  errorMsg: string;
  description?: string;
  pattern?: string;
  hint?: string;
  formId?: string;
}

export default function FormInput(props: IFormInputProps) {
  const badge = !props.required ? <Badge>optional</Badge> : "";
  const { label, errorMsg, description, onChange, formId, ...inputProps } =
    props;
  const inputId = `${props.formId}_${inputProps.name}`;
  const descId = `desc_${inputId}`;
  const errorId = `error_${inputId}`;
  const hint = props.hint ? (
    <Tooltip
      id={descId}
      position="right-start"
      textAlign="left"
      content={description}
    >
      <i className="fa-solid fa-circle-info"></i>
    </Tooltip>
  ) : (
    ""
  );

  return (
    <div className="form-input">
      <div className="input-header">
        <label htmlFor={inputId}>
          {label}
          &nbsp;
          {badge}
        </label>
        {hint}
      </div>
      <input
        id={inputId}
        onChange={onChange}
        aria-errormessage={errorId}
        aria-describedby={descId}
        {...inputProps}
      />
      <span id={errorId}>{errorMsg}</span>
      <div id={descId} className="form-input__description">
        {description}
      </div>
    </div>
  );
}
