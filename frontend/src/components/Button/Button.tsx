import * as React from "react";

import "./Button.scss";

export interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  btnStyle: "primary" | "secondary";
  width?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Button(props: IButtonProps) {
  const styles = {
    width: props.width,
  };

  return (
    <button
      type={props.type}
      className={`Button Button--${props.btnStyle}`}
      style={styles}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
