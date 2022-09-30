$("#favouriteBtn").droppable({
  tolerance: "touch",
  drop: function (event, ui) {
    //Get dragged movie info
    const id = ui.draggable[0].getAttribute("data-id");
    const title = ui.draggable[0].getAttribute("data-title");
    const poster_path = ui.draggable[0].getAttribute("data-poster_path");
    //Check if localstorage already have item
    if (
      localStorage.getItem("favourite") !== null &&
      JSON.parse(localStorage.getItem("favourite")).hasOwnProperty(id)
    ) {
      //Prompt already in favourite
      M.toast({
        html: `${title} already in favourite`,
        displayLength: 1500,
      });
    } else {
      //Prompt add to favourite
      M.toast({
        html: `${title} added to favourite`,
        displayLength: 1500,
      });
      //Favourite btn color change
      $("#favouriteBtn").removeClass("yellow").addClass("green");
      setTimeout(() => {
        $("#favouriteBtn").removeClass("green").addClass("yellow");
      }, 300);
      //Save item to local storage
      saveToFavourite(id, title, poster_path);
    }
  },
});

function saveToFavourite(id, title, poster_path) {
  let favouriteList;
  if (localStorage.getItem("favourite") === null) {
    favouriteList = {
      [id]: {
        title: title,
        poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
      },
    };
    console.log(favouriteList);
  } else {
    favouriteList = JSON.parse(localStorage.getItem("favourite"));
    favouriteList[id] = {
      title: title,
      poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
    };
  }
  localStorage.setItem("favourite", JSON.stringify(favouriteList));
}
