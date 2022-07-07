import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

const Home = React.lazy(() => import("./pages/Home/Home"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const Login = React.lazy(() => import("./pages/Login/Login"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
