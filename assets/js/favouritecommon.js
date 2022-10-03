function getFavourite() {
  //get 'favourite' from localstorage(if not empty)
  if (localStorage.getItem("favourites") === null) {
    return [];
  }
  //return favourite as object
  return JSON.parse(localStorage.getItem("favourites"));
}

//Save favourite to localstorage
function saveFavourite(data) {
  localStorage.setItem("favourites", JSON.stringify(data));
}
