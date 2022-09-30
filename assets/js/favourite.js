//Favourite Page Render

function renderFavourite(data) {
  //For each result create card
  for (var i in data.results) {
    let card = $(`
    <div class="col s6 m4 l3 xl2 card-container">
      <div class="card medium hoverable user-select-none">
        <div class="card-image">
          <img 
            src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" 
            onerror="this.src='https://via.placeholder.com/300?text=YMDB'"
            alt="poster"/>
        </div>
        <div class="card-content">
          <span class="card-main-title grey-text text-darken-4">${data.results[i].title
      }</span>
        </div>
        <div class="card-action">
          <a href="static-movie-page.html?id=${data.results[i].id
      }&title=${encodeURIComponent(data.results[i].title)}">View Detail</a>
          <i class="material-icons right activator">more_vert</i>
        </div>
        <div class="card-reveal">
          <span class="card-title">${data.results[i].title
      }<i class="material-icons right">close</i></span>
          <p>${data.results[i].overview}</p>
        </div>
      </div>
    </div>`);
    card.attr({
      "data-title": `${data.results[i].title}`,
      "data-id": `${data.results[i].id}`,
      "data.poster_path": `${data.results[i].poster_path}`,
    });
    $("#favouriteContainer").append(card);
  }
}
renderFavourite(getFavourite());
//call getFavourite()
//render Favourite Thumbnails on page from data given
//render to #favouriteContainer
///EveryFavouriteBox will have a href link to (moviepage.html?id={id}&title={TITLE}) to a new tab, and a delete btn with data-id


function handleDelete(event) {
  debugger;
  console.log('delete')
  //event handler for delete BTN
  //call getFavourite()
  //remove the movie from data-id
  //save favourite to localstorage
  //call renderFavourite()
}

//add eventlistener for deleteBtn
