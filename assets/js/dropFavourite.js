$("#favouriteBtn").droppable({
  tolerance: "touch",
  drop: function (event, ui) {
    //Get dragged movie info
    const id = ui.draggable[0].getAttribute("data-id");
    const title = ui.draggable[0].getAttribute("data-title");
    const poster_path = ui.draggable[0].getAttribute("data-poster_path");
    //Check if localstorage already have item
    if (
      localStorage.getItem("favourites") !== null &&
      JSON.parse(localStorage.getItem("favourites")).some((r) => r.id == id)
    ) {
      //Prompt already in favourite
      M.toast({
        html: `<h6>${title} already in favourite</h6>`,
        displayLength: 1500,
        classes: "red",
      });
      favouriteRed();
    } else {
      //Prompt add to favourite
      M.toast({
        html: `<h6>${title} added to favourite</h6>`,
        displayLength: 1500,
        classes: "green",
      });
      favouriteGreen();
      //Save item to local storage
      saveToFavourite(id, title, poster_path);
    }
  },
});

function saveToFavourite(id, title, poster_path) {
  let favouriteList;
  if (localStorage.getItem("favourites") === null) {
    favouriteList = [
      {
        id: id,
        title: title,
        poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
      },
    ];
  } else {
    favouriteList = JSON.parse(localStorage.getItem("favourites"));
    favouriteList.push({
      id: id,
      title: title,
      poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
    });
  }
  localStorage.setItem("favourites", JSON.stringify(favouriteList));
}

function favouriteGreen() {
  //Favourite btn color change
  $("#favouriteBtn").removeClass("yellow").addClass("green");
  setTimeout(() => {
    $("#favouriteBtn").removeClass("green").addClass("yellow");
  }, 300);
}

function favouriteRed() {
  //Favourite btn color change
  $("#favouriteBtn").removeClass("yellow").addClass("red");
  setTimeout(() => {
    $("#favouriteBtn").removeClass("red").addClass("yellow");
  }, 300);
}
