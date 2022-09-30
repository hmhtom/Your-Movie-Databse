//Rendering Search Results on search-result.html

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";

function getQuery() {
  //Get search query from location.search
  return decodeURIComponent(new URL(location.href).searchParams.get("q"));
}

function fetchSearch(query) {
  $("#searchResultQuery").text(query);
  fetch(
    `https://api.themoviedb.org/3/searchhh/movie?api_key=${TMDB_API_KEY}&query=${query}`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      renderSearch(data);
    })
    .catch((error) => {
      //Redirect to Error Page
      console.log(error.status);
      window.location.href = "./error-status.html?error=We are having trouble fetching your results, please try again later!";

    });
}

function renderSearch(data) {
  //Render #searchResultQuery and #searchResultContainer with data given
  $("#searchResultQuery").append(` and found ${data.results.length} results.`);
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
      "data-poster_path": `${data.results[i].poster_path}`,
    });

    card.draggable({
      helper: "clone",
      scroll: false,
    });

    $("#searchResultContainer").append(card);
  }
}

fetchSearch(getQuery());
