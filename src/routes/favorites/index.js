import { useEffect, useState } from "react";
import FavoritesList from "../../components/favorites-list";
import { getFavorites } from "../../utils/favorites";

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    const favorites = getFavorites();

    if (!favorites || favorites.length === 0) {
      setFavoritesList([]);
      return;
    }

    const fetchDataForFavorites = async () => {
      const fetchPromises = favorites.map(async (element) => {
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element}`)
          .then((response) => response.json())
          .then((data) => data.drinks[0])
          .catch(() => null);
      });

      const favoriteData = await Promise.all(fetchPromises);
      const filteredFavorites = favoriteData.filter((element) => element !== null);
      setFavoritesList(filteredFavorites);
    };

    fetchDataForFavorites();
  }, []);

  return (
    <>
      <h1>Favorites</h1>
      <FavoritesList favorites={favoritesList} />
    </>
  );
}

export default Favorites;
