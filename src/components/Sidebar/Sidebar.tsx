import React from "react";
import "./Sidebar.scss";

export interface ISidebarProps {
  show: boolean;
  side: "left" | "right";
  onHide?: () => void;
  children?: React.ReactNode;
}

export default function Sidebar({
  show,
  side,
  onHide,
  children,
}: ISidebarProps) {
  return show ? (
    <div className={`Sidebar Sidebar--${side}`}>
      <div className="Sidebar__header">
        <h1 className="Sidebar__title">Title</h1>
        <button type="button" className="Sidebar__hide" onClick={onHide}>
          &times;
        </button>
      </div>
      <div className="Sidebar__body">{children}</div>
    </div>
  ) : null;
}
