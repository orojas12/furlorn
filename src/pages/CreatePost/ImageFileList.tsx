import * as React from "react";

export interface IImageFileListProps {
  blobs: Blob[];
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ImageFileList({
  blobs,
  onDelete,
}: IImageFileListProps) {
  return (
    <div className="ImageFileList">
      {blobs.map((blob, index) => {
        return (
          <div key={index}>
            <div
              className="ImageFileList__details"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                data-file-list-index={index.toString()}
                onClick={onDelete}
              >
                Remove
              </button>
            </div>
            <img
              className="ImageFileList__image"
              src={URL.createObjectURL(blob)}
              alt="pet"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        );
      })}
    </div>
  );
}
