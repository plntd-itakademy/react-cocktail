import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CocktailInfo from "../../components/cocktail-info";

function Cocktail() {
  const [cocktail, setCocktail] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const cocktailData = data?.drinks[0];
        const tempIngredients = [];

        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktailData[`strIngredient${i}`];
          const measure = cocktailData[`strMeasure${i}`];

          if (measure && ingredient) {
            tempIngredients.push({
              measure: measure,
              ingredient: ingredient,
            });
          }
        }

        setCocktail(cocktailData);
        setIngredients(tempIngredients);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [id]);

  return (
    <>
      <h1>{cocktail?.strDrink}</h1>
      {!isLoading && cocktail ? (
        <CocktailInfo cocktail={cocktail} ingredients={ingredients} />
      ) : isError ? (
        <p>An error occured while fetching data.</p>
      ) : (
        isLoading && <p>Loading...</p>
      )}
    </>
  );
}

export default Cocktail;
