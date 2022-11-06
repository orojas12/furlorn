import * as React from "react";
import { IColor } from "../../../../api/pet";

export interface IColorSelectorProps {
  colorOptions: IColor[];
  selected: IColor[];
  onCheck: (color: IColor) => void;
  onUncheck: (color: IColor) => void;
  onClear: () => void;
}

export default function ColorSelector({
  colorOptions,
  selected,
  onCheck,
  onUncheck,
  onClear,
}: IColorSelectorProps) {
  return (
    <div className="ColorSelector Field">
      <div className="ColorSelector__colors">
        {colorOptions.map((color) => {
          return (
            <div key={color.id}>
              <input
                id={`checkbox-${color.id}`}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    onCheck(color);
                  } else {
                    onUncheck(color);
                  }
                }}
                checked={selected.some(
                  (selectedColor) => selectedColor.id === color.id
                )}
              />
              <label htmlFor={`checkbox-${color.id}`}>{color.name}</label>
            </div>
          );
        })}
      </div>
      <button type="button" onClick={(e) => onClear()}>
        Clear All
      </button>
    </div>
  );
}
