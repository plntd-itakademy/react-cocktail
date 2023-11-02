import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

function Cocktail() {
  const [cocktail, setCocktail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setCocktail(data.drinks[0]);
      })
      .catch(() => setIsError(true));
  }, [id]);

  return (
    <>
      <h1>{cocktail?.strDrink}</h1>
      {!isLoading && cocktail ? (
        <div className="cocktail-infos">
          <img src={cocktail?.strDrinkThumb} alt="Cocktail" />
        </div>
      ) : isError ? (
        <p>An error occured while fetching data.</p>
      ) : (
        isLoading && <p>Loading...</p>
      )}
    </>
  );
}

export default Cocktail;
