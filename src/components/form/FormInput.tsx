import React, { useState } from "react";
import { Badge, Tooltip } from "../ui";

export interface IFormInputProps {
  key?: number;
  name: string;
  type: string;
  label: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLElement>;
  required?: boolean;
  errorMsg?: string;
  description?: string;
  pattern?: string;
  formId?: string;
  validate?: (input: any) => boolean;
}

export default function FormInput(props: IFormInputProps) {
  const [isValid, setIsValid] = useState(true);

  const badge = !props.required ? <Badge>optional</Badge> : "";
  const {
    label,
    errorMsg,
    description,
    onChange,
    validate,
    formId,
    ...inputProps
  } = props;
  const inputId = `${props.formId}_${inputProps.name}`;
  const descId = `desc_${inputId}`;
  const errorId = `error_${inputId}`;
  const hint = props.description ? (
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
        onChange={(e) => {
          if (onChange) onChange(e);
          if (validate) setIsValid(validate(e.target.value));
        }}
        aria-errormessage={errorId}
        aria-describedby={descId}
        className={!isValid ? "invalid" : ""}
        {...inputProps}
      />
      <div id={errorId} className="input-error">
        {!isValid ? errorMsg : ""}
      </div>
    </div>
  );
}
