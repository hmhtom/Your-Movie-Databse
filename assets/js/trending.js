//Rendering trending on index.html

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";

function fetchTrending() {
  //Fetch response from Trending API on TMDB
  fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    //Call renderTrending() in successful response
    .then((data) => {
      renderTrending(data);
    })
    //Catch Error
    .catch((error) => {
      console.log(error.status);
    });
}

//Render Trending
function renderTrending(data) {
  //Render Trending from successful data fetched
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
          <span class="card-main-title grey-text text-darken-4">${
            data.results[i].title
          }</span>
        </div>
        <div class="card-action">
          <a href="static-movie-page.html?id=${
            data.results[i].id
          }&title=${encodeURIComponent(data.results[i].title)}">View Detail</a>
          <i class="material-icons right activator">more_vert</i>
        </div>
        <div class="card-reveal">
          <span class="card-title">${
            data.results[i].title
          }<i class="material-icons right">close</i></span>
          <p>${data.results[i].overview}</p>
        </div>
      </div>
    </div>`);
    card.attr({
      "data-title": `${data.results[i].title}`,
      "data-id": `${data.results[i].id}`,
      "data-poster_path": `${data.results[i].poster_path}`,
    });
    card.draggable({
      helper: "clone",
      scroll: false,
    });

    $("#trendingContainer").append(card);
  }
}

fetchTrending();
