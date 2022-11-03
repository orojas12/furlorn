import { useState, useEffect } from "react";
import { Form } from "../../components";
import { IFetchedBreeds } from "../../api/pet";
import { getBreeds } from "../../api/pet";
import usePostForm from "./forms/usePostForm";
import { ActionType } from "./forms/ActionType";
import { Route, Routes, useNavigate } from "react-router-dom";
import PetDetailsForm from "./forms/PetDetailsForm";
import PostImagesForm from "./forms/PostImagesForm";
import PostDetailsForm from "./forms/PostDetailsForm";

import "./styles/NewPost.scss";

export interface INewPostProps {}

export default function NewPost(props: INewPostProps) {
  const { state, dispatch, errors, errorDispatch, submit } = usePostForm();
  const [fetchedBreeds, setFetchedBreeds] = useState<IFetchedBreeds>({
    dogs: [],
    cats: [],
  });
  const sectionNames = ["Pet", "Images", "Other Details", "Review"];
  const sectionPaths = ["pet", "images", "details", "review"];
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBreeds() {
      const breeds = await getBreeds();
      setFetchedBreeds(breeds);
    }
    fetchBreeds();
    navigate("pet", { replace: true });
  }, []);

  return (
    <Form title={sectionNames[currentSection]} onSubmit={() => {}} error="">
      <Routes>
        <Route
          index
          element={<PetDetailsForm state={state} dispatch={dispatch} />}
        />
        <Route
          path="pet"
          element={<PetDetailsForm state={state} dispatch={dispatch} />}
        />
        <Route
          path="images/*"
          element={<PostImagesForm state={state} dispatch={dispatch} />}
        />
        <Route
          path="details"
          element={<PostDetailsForm state={state} dispatch={dispatch} />}
        />
      </Routes>
      <div className="NewPost__section-nav">
        {currentSection !== 0 ? (
          <button
            className="NewPost__section-nav-back"
            type="button"
            onClick={() => {
              navigate(sectionPaths[currentSection - 1], { replace: true });
              setCurrentSection((prevSection) => prevSection - 1);
            }}
          >
            {"< Prev"}
          </button>
        ) : null}
        {currentSection < sectionPaths.length - 1 ? (
          <button
            className="NewPost__section-nav-next"
            type="button"
            onClick={() => {
              navigate(sectionPaths[currentSection + 1], { replace: true });
              setCurrentSection((prevSection) => prevSection + 1);
            }}
          >
            {"Next >"}
          </button>
        ) : null}
      </div>
      {currentSection === sectionPaths.length - 1 ? (
        <button type="submit">Create Post</button>
      ) : null}
    </Form>
  );
}
