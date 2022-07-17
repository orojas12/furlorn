import React from "react";
import "./Modal.scss";

export interface IModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Modal({
  show,
  onClose,
  title = "",
  children,
}: IModalProps) {
  return show ? (
    <div className="Modal__backdrop" onClick={onClose}>
      <div
        className="Modal"
        role="dialog"
        aria-labelledby="modalTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="Modal__header">
          <h3 id="modalTitle" className="Modal__title">
            {title}
          </h3>
          <button
            className="Modal__close"
            type="button"
            name="close"
            title="Close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
}
