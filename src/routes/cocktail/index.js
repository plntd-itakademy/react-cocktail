import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cocktail() {
  const [cocktail, setCocktail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setCocktail(data.drinks[0]);
      });
  }, [id]);

  return (
    <>
      <h1>Cocktail</h1>
      {!isLoading && cocktail ? <p>{cocktail.strDrink}</p> : <p>Loading...</p>}
    </>
  );
}

export default Cocktail;
