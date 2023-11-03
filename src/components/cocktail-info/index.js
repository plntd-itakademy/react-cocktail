import { useState } from "react";
import { addFavorite, isFavorite, removeFavorite } from "../../utils/favorites";
import { useFavoritesContext } from "../../favorites-context";
import "./style.scss";

function CocktailInfo({ cocktail, ingredients }) {
  const [favorite, setFavorite] = useState(isFavorite(cocktail?.idDrink));
  const favoriteBtnText = favorite ? "Remove from favorites" : "Add to favorites";
  const { favoritesCount, setFavoritesCount } = useFavoritesContext();

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(cocktail?.idDrink);
      setFavoritesCount(favoritesCount - 1);
    } else {
      addFavorite(cocktail?.idDrink);
      setFavoritesCount(favoritesCount + 1);
    }

    setFavorite(!favorite);
  };

  return (
    <div className="cocktail-infos">
      <div className="cocktail-left">
        <img className="thumbnail" src={cocktail?.strDrinkThumb} alt="Cocktail" />

        <button className="favorite-btn" onClick={handleFavorite}>
          {favoriteBtnText}
        </button>
      </div>

      <div className="cocktail-right">
        <h2>How to make this cocktail?</h2>
        <p>{cocktail.strInstructions}</p>
        {ingredients && ingredients?.length > 0 && (
          <div className="cocktail-ingredients">
            <h3>Ingredients</h3>
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Measure</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.ingredient}</td>
                    <td>{ingredient.measure}</td>
                    <td>
                      <img
                        src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.ingredient}-Small.png`}
                        alt={ingredient.ingredient}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CocktailInfo;
