import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav-bar";
import "./style.scss";

function Root() {
  return (
    <div className="root">
      <NavBar />

      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
