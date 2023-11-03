import { Link } from "react-router-dom";
import "./style.scss";

function FavoritesList({ favorites }) {
  console.log("favorites", favorites);

  return (
    <div className="cocktail-elements">
      {favorites && favorites.length > 0 ? (
        <>
          {favorites.map((el, index) => (
            <Link key={el.idDrink} to={`/cocktail/${el.idDrink}`} className="cocktail-element">
              <div className="thumbnail-wrapper">
                <img src={el.strDrinkThumb} alt="Cocktail" />
              </div>

              <div className="content">
                <p className="title">{el.strDrink}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <p>No favorite.</p>
      )}
    </div>
  );
}

export default FavoritesList;
