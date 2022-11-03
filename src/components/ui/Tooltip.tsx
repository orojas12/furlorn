import { ReactNode, useState } from "react";

export interface ITooltipProps {
  id: string;
  children?: ReactNode;
  content?: ReactNode;
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "right-start"
    | "right"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  textAlign?: "left" | "center" | "right";
}

export default function Tooltip(props: ITooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const position = props.position || "bottom";
  const textAlign = props.textAlign || "center";
  const content = props.content || "";
  const srOnly = !isOpen ? "sr-only" : "";

  return (
    <div className="tooltip">
      <div
        className="tooltip-trigger"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {props.children}
      </div>
      <div
        id={props.id}
        className={`tooltip-text tooltip-text--${position} text-${textAlign} ${srOnly}`}
      >
        {content}
      </div>
    </div>
  );
}
