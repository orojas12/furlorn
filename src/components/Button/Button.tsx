import * as React from "react";

import "./Button.scss";

export interface IButtonProps {
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
  btnStyle: "primary" | "secondary";
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export default function Button(props: IButtonProps) {
  const styles = {
    width: props.width,
    height: props.height,
  };

  return (
    <button
      type={props.type}
      className={`Button Button--${props.btnStyle} ` + props.className}
      style={styles}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
