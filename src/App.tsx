import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.scss";
import EditPost from "./pages/Posts/EditPost";
import PetDetailsForm from "./pages/Posts/forms/PetDetailsForm";
import PostDetailsForm from "./pages/Posts/forms/PostDetailsForm";
import PostImagesForm from "./pages/Posts/forms/PostImagesForm";
import NewPost from "./pages/Posts/NewPost";
import Post from "./pages/Posts/Post";

const Home = React.lazy(() => import("./pages/Home/Home"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Posts = React.lazy(() => import("./pages/Posts/Posts"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":id" element={<Post />} />
                <Route path=":id/edit" element={<EditPost />} />
                <Route path="new/*" element={<NewPost />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
}

export default App;
