import { BrowserRouter, Route, Routes } from "react-router-dom";
import Components from "./pages/Components";
import Login from "./pages/Login";

import "./sass/main.scss";

function App() {
  return (
    <div className="App bg-light ff-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/">
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
    </div>
  );
}

export default App;
