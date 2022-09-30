function getFavourite() {
    //get 'favourite' from localstorage(if not empty)
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

//save favourite to localstorage