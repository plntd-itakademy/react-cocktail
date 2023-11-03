import { Fragment, useEffect, useState } from "react";
import CocktailCard from "../cocktail-card";
import "./style.scss";

function Cocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [letter, setLetter] = useState("a");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("Cocktails");

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => setCategories(data.drinks))
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(`Cocktails starting by "${letter}"`);
        setCocktails(data.drinks);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [letter]);

  useEffect(() => {
    if (category) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(`Cocktails of the category "${category}"`);
          setCocktails(data.drinks);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [category]);

  return (
    <div className="cocktails">
      <div className="filters">
        <div className="select-group">
          <label>Cocktails starting by</label>
          <select value={letter} onChange={(e) => setLetter(e.target.value)}>
            {alphabet.map((letter) => (
              <option key={letter} value={letter}>
                {letter.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Filter by category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories &&
              categories.length > 0 &&
              categories.map((el, index) => (
                <option key={index} value={el.strCategory}>
                  {el.strCategory}
                </option>
              ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error while fetching data.</p>
      ) : (
        <>
          {cocktails && cocktails?.length > 0 ? (
            <div className="cocktails-section">
              <h2>{title}</h2>
              <div className="cocktails-grid">
                {cocktails.map((cocktail, index) => (
                  <CocktailCard
                    key={index}
                    id={cocktail?.idDrink}
                    name={cocktail?.strDrink}
                    thumbnailUrl={cocktail?.strDrinkThumb}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No cocktails found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Cocktails;
