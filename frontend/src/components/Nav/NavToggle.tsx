import React from "react";

import "./NavToggle.scss";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavToggle({ setIsOpen }: Props) {
  function handleToggle() {
    setIsOpen((isOpen: boolean) => !isOpen);
  }

  return (
    <button className="NavToggle" onClick={handleToggle}>
      <div className="NavToggle__bar"></div>
      <div className="NavToggle__bar"></div>
      <div className="NavToggle__bar"></div>
    </button>
  );
}
