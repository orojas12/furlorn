import * as React from "react";
import Button from "../Button/Button";
import "./Form.scss";

interface IFormProps {
  title?: string;
  submitText?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit: Function;
}

export default function Form({
  title,
  submitText,
  onSubmit,
  children,
  footer,
}: IFormProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {title ? <h1 className="Form__title">{title}</h1> : null}
      {children}
      <Button type="submit" btnStyle="primary">
        {submitText || "Submit"}
      </Button>
      {footer}
    </form>
  );
}
