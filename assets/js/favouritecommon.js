function getFavourite() {
    //get 'favourite' from localstorage(if not empty)
    // stores the key as favourites in local storage. its not a variable so it has to have quotations
    let favourites = localStorage.getItem("favourites");
    if (favourites == null) {
        return {};
    }
    //return favourite as object
    return JSON.parse(favourites);
}

function saveFavourite(data) {
    localStorage.setItem("favourites", JSON.stringify(data));
}