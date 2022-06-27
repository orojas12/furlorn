import * as React from "react";

import "./Button.scss";

export interface IButtonProps {
  type: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Button(props: IButtonProps) {
  return (
    <button
      type="button"
      className={`Button Button--${props.type}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
