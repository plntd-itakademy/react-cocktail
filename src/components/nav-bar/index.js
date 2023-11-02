import { NavLink } from "react-router-dom";
import "./style.scss";

function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to={"/"}>Home Page</NavLink>
        </li>
        <li>
          <NavLink to={"/favorites"}>Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
