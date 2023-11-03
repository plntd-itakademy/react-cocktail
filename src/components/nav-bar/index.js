import { NavLink } from "react-router-dom";
import { useFavoritesContext } from "../../favorites-context";
import "./style.scss";

function NavBar() {
  const { favoritesCount } = useFavoritesContext();

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to={"/"}>Home Page</NavLink>
        </li>
        <li>
          <NavLink to={"/favorites"}>
            Favorites <span className="badge">{favoritesCount}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
