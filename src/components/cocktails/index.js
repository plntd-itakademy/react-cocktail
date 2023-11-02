import { useEffect, useState } from "react";
import CocktailCard from "../cocktail-card";
import "./style.scss";

function Cocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const api = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const promises = [];

    alphabet.forEach((letter) => {
      const promise = fetch(`${api}${letter}`)
        .then((response) => response.json())
        .then((data) => ({ [letter]: data.drinks }))
        .catch(() => ({ [letter]: [] }));

      promises.push(promise);
    });

    Promise.all(promises)
      .then((cocktailData) => {
        const cocktailsObj = {};

        cocktailData.forEach((cocktail) => {
          const letter = Object.keys(cocktail)[0];
          cocktailsObj[letter] = cocktail[letter];
        });

        setCocktails(cocktailsObj);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  return (
    <div className="cocktails">
      {isLoading ? (
        <p>Loading...</p>
      ) : cocktails ? (
        <>
          {Object.keys(cocktails).map((letter) => (
            <>
              {cocktails[letter]?.length > 0 && (
                <div
                  key={letter}
                  id={`cocktails-${letter}`}
                  className="cocktails-section"
                >
                  <h2>Cocktails starting by "{letter.toUpperCase()}"</h2>
                  <div className="cocktails-grid">
                    {cocktails[letter].map((cocktail, index) => (
                      <CocktailCard
                        key={index}
                        id={cocktail?.idDrink}
                        name={cocktail?.strDrink}
                        thumbnailUrl={cocktail?.strDrinkThumb}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        isError && <p>An error occured while fetching data.</p>
      )}
    </div>
  );
}

export default Cocktails;
