import * as React from "react";
import { Button } from "../../components";

export interface IColorSelectorProps {
  colorOptions: any[];
  selected: any[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ColorSelector({
  colorOptions,
  selected,
  onChange,
  onClear,
}: IColorSelectorProps) {
  return (
    <div className="ColorSelector Field">
      <div className="ColorSelector__colors">
        {colorOptions.map((color) => {
          return (
            <div key={color}>
              <input
                id={`checkbox-${color}`}
                type="checkbox"
                onChange={onChange}
                checked={selected.some(
                  (selectedColor) => selectedColor === color
                )}
                value={color}
              />
              <label htmlFor={`checkbox-${color}`}>{color}</label>
            </div>
          );
        })}
      </div>
      <Button type="button" btnStyle="secondary" onClick={onClear}>
        Clear All
      </Button>
    </div>
  );
}
