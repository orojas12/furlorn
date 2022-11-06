import { Outlet } from "react-router-dom";
import "./sass/main.scss";

function App() {
  return (
    <div className="App container container--fluid bg-light ff-sans">
      <Outlet />
    </div>
  );
}

export default App;
