import * as React from "react";
import { TextAreaField } from "../../../components";
import { ActionType } from "./ActionType";
import { IFormAction, IPostFormState } from "./PostFormReducer";

export interface IPostDetailsFormProps {
  state: IPostFormState;
  dispatch: React.Dispatch<IFormAction>;
}

export default function PostDetailsForm({
  state,
  dispatch,
}: IPostDetailsFormProps) {
  return (
    <div>
      <TextAreaField
        id="description"
        label="Description"
        onChange={(e) => {
          dispatch({
            type: ActionType.SET_DESCRIPTION,
            payload: e.target.value,
          });
        }}
        value={state.description}
      />
    </div>
  );
}
