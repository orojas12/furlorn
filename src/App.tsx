import { Outlet } from "react-router-dom";
import "./sass/main.scss";

function App() {
  return (
    <div className="App bg-light ff-sans">
      <Outlet />
    </div>
  );
}

export default App;
