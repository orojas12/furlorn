import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

import "./App.scss";

const Home = React.lazy(() => import("./pages/Home/Home"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
