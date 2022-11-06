import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ImageFileField, ImageFilePreview } from "../../../components";
import { ActionType } from "./ActionType";
import ImageFileList from "./ImageFileList";
import { IFormAction, IPostFormState } from "./PostFormReducer";

export interface IPostImagesFormProps {
  state: IPostFormState;
  dispatch: React.Dispatch<IFormAction>;
}

function validateFile(file: File) {
  const maxSize = 10000 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File too large. Maximum file size is 10MB.");
  }
}

export default function PostImagesForm({
  state,
  dispatch,
}: IPostImagesFormProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (state.uploadedImage) {
      navigate("preview", { replace: true });
    } else {
      navigate("", { replace: true });
    }
  }, [navigate, state.uploadedImage]);

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <>
              <ImageFileField
                id="uploadPhoto"
                label="Add Photo..."
                error=""
                onChange={(e) => {
                  const file = e.target.files?.item(0);
                  if (!file) return;

                  try {
                    validateFile(file);
                  } catch (error: any) {
                    // errorDispatch({ type: "fileUpload", payload: error.message });
                    return;
                  }
                  dispatch({
                    type: ActionType.SET_UPLOADED_IMAGE,
                    payload: file,
                  });
                }}
              />
              <ImageFileList
                blobs={state.savedImages}
                onDelete={(blob) => {
                  dispatch({
                    type: ActionType.REMOVE_SAVED_IMAGE,
                    payload: blob,
                  });
                }}
              />
            </>
          }
        />
        <Route
          path="preview"
          element={
            <ImageFilePreview
              file={state.uploadedImage}
              maxWidth={400}
              maxHeight={400}
              onSave={(img) => {
                dispatch({ type: ActionType.ADD_SAVED_IMAGE, payload: img });
                dispatch({
                  type: ActionType.SET_UPLOADED_IMAGE,
                  payload: null,
                });
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}
