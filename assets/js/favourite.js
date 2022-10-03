//Favourite Page Render

function renderFavourite(data) {
  $("#favouriteContainer").empty();
  //For each result create card
  for (var i in data) {
    let card = $(`
    <div class="col s6 m4 l3 xl2 card-container">
      <div class="card medium hoverable user-select-none">
        <div class="card-image">
          <img 
            src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" 
            onerror="this.src='https://via.placeholder.com/300?text=YMDB'"
            alt="poster"/>
        </div>
        <div class="card-content">
          <span class="card-main-title grey-text text-darken-4">${
            data[i].title
          }</span>
        </div>
        <div class="card-action">
          <a href="static-movie-page.html?id=${
            data[i].id
          }&title=${encodeURIComponent(data[i].title)}">View Detail</a>
          <i class="material-icons right delete-favourite">close</i></span>
        </div>
      </div>
    </div>`);
    card.attr({
      "data-title": `${data[i].title}`,
      "data-id": `${data[i].id}`,
      "data.poster_path": `${data[i].poster_path}`,
    });
    let id = data[i].id;
    //render to #favouriteContainer
    $("#favouriteContainer").append(card);
    //add eventlistener for deleteBtn

    card.find(".delete-favourite").click(function (event) {
      let index = data.findIndex((r) => r.id == id);
      if (index >= 0) {
        data.splice(index, 1);
      }
      saveFavourite(data);
      renderFavourite(getFavourite());
    });
  }
}
renderFavourite(getFavourite());
//call getFavourite()
//render Favourite Thumbnails on page from data given

///EveryFavouriteBox will have a href link to (moviepage.html?id={id}&title={TITLE}) to a new tab, and a delete btn with data-id
