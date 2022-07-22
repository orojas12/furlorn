import * as React from "react";

export interface IImageFileListProps {
  files: File[];
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ImageFileList({
  files,
  onDelete,
}: IImageFileListProps) {
  return (
    <div className="ImageFileList">
      {files.map((file, index) => {
        return (
          <div key={index}>
            <div
              className="ImageFileList__details"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>{file.name}</p>
              <button
                data-file-list-index={index.toString()}
                onClick={onDelete}
              >
                Remove
              </button>
            </div>
            <img
              className="ImageFileList__image"
              src={URL.createObjectURL(file)}
              alt="pet"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        );
      })}
    </div>
  );
}
