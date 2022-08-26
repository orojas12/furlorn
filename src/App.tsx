import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import { Card } from "./components";
import Breadcrumb from "./components/Breadcrumb";
import { Home, Login, SignUp } from "./pages";
import EditPost from "./pages/Posts/EditPost";
import NewPost from "./pages/Posts/NewPost";
import Post from "./pages/Posts/Post";
import Posts from "./pages/Posts/Posts";

function App() {
  return (
    <div className="App bg-light ff-sans">
      <div
        className="container flex flex-column justify-center align-center"
        style={{ minHeight: "inherit" }}
      >
        <h1 className="text-4xl ff-cursive spacing-tight">Display</h1>
        <h1 className="text-4xl spacing-tight">Heading 1</h1>
        <h2 className="text-3xl">Heading 2</h2>
        <h3 className="text-2xl">Heading 3</h3>
        <h4 className="text-xl">Heading 4</h4>
        <h5 className="text-lg">Heading 5</h5>
        <p className="text-base">Paragraph base</p>
        <p className="text-sm spacing-wide">Paragraph small</p>
        <p className="text-xs spacing-wider">Paragraph extra small</p>
        <button className="btn--primary">Button</button>
        <button className="btn--primary-outline">Button</button>
        <button className="btn--secondary">Button</button>
        <button className="btn--secondary-outline">Button</button>
        <Card />
        <Breadcrumb />
      </div>

      {/* <BrowserRouter>
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
      </BrowserRouter> */}
    </div>
  );
}

export default App;
