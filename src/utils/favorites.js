function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}

function addFavorite(id) {
  const favorites = getFavorites();
  const newFavorites = [...favorites, id];
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
}

function removeFavorite(id) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((favorite) => favorite !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
}

function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}

export { getFavorites, addFavorite, removeFavorite, isFavorite };
