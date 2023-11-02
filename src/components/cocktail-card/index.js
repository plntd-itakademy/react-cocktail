import { Link } from "react-router-dom";
import "./style.scss";

function CocktailCard({ id, name, thumbnailUrl }) {
  return (
    <Link to={`cocktail/${id}`} className="cocktail-card">
      <div className="cocktail-card-content">
        <p>{name}</p>
      </div>

      <div className="cocktail-card-thumbnail">
        <img src={thumbnailUrl} alt="Cocktail" />
      </div>
    </Link>
  );
}

export default CocktailCard;
