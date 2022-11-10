import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Components, Home, Login } from "./pages";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="components" element={<Components />} />
          {/* <Route path="signup" element={<SignUp />} />
            <Route path="posts">
              <Route index element={<Posts />} />
              <Route path=":id" element={<Post />} />
              <Route path=":id/edit" element={<EditPost />} />
              <Route path="new/*" element={<NewPost />} />
            </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
