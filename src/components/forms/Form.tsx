import * as React from "react";
import "./Form.scss";

interface IFormProps {
  title?: string;
  submitText?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit: Function;
  error: string;
}

export default function Form({
  title,
  submitText,
  onSubmit,
  children,
  footer,
  error,
}: IFormProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      {title ? <h1 className="Form__title">{title}</h1> : null}
      {children}

      {submitText ? <button type="submit">{submitText}</button> : null}
      <div className="Form__error">{error}</div>
      {footer}
    </form>
  );
}
