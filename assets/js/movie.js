//Render Movie Info on movie page

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";
const YOUTUBE_API_KEY = "AIzaSyDPP8A921zDu8qi7NMvErqHkexWvB-Q498";

function fetchInfo() {
  fetch(
    `https://api.themoviedb.org/3/movie/${decodeURIComponent(
      new URL(location.href).searchParams.get("id")
    )}?api_key=${TMDB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      //Once data obtain call renderInfo(data)
      renderInfo(data);
    })
    .catch((error) => {
      //Redirect to Error Page
      console.log(error.status);
    });
}

function renderInfo(data) {
  let genres = [];
  for (var i in data.genres) {
    genres.push(data.genres[i].name);
  }

  let production = [];
  for (var i in data.production_companies) {
    production.push(data.production_companies[i].name);
  }

  let movieInfoEl =
    $(`<div class="col s6 offset-s3 m5 offset-m3 l4 xl3 offset-m1 offset-l2 offset-xl3">
  <img
    class="responsive-img"
    src="https://www.themoviedb.org/t/p/original/${data.poster_path}" />
</div>
<div class="col s12 l6 xl4">
  <ul class="collection with-header">
    <li class="collection-header">
      <h3>${data.title}</h3>
    </li>
    <li class="collection-item">
      <h5>Genres:</h5>
      ${genres.join(", ")}
    </li>
    <li class="collection-item">
      <h5>Release Date:</h5>
      ${data.release_date}
    </li>
    <li class="collection-item">
      <h5>Overview:</h5>
      ${data.overview}
    </li>
    <li class="collection-item">
      <h5>Production Companies:</h5>
      ${production.join(", ")}
    </li>
    <li class="collection-item">
      <h5>IMDB:</h5>
      <a href="https://www.imdb.com/title/${data.imdb_id}">IMDB Link</a>
    </li>
  </ul>
</div>`);

  $("#movieInfoContainer").append(movieInfoEl);

  renderFvrtBtn(data.id, data.title, data.poster_path);
  renderVideo(data);
}

//Render #relatedVideoContainer with data given
function renderVideo(data) {
  fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${data.title}&key=${YOUTUBE_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      for (let i in data.items) {
        let item = data.items[i];
        //Make to render in iframe Format

        let videoId = item.id.videoId;
        let iframe = $("<iframe>").attr({
          width: "300",
          height: "200",
          src: "https://www.youtube.com/embed/" + videoId,
          frameborder: "0",
        });

        let container = $('<div class="col s12 m6 l4 xl3 center">').appendTo(
          "#relatedVideoContainer"
        );
        container.append(iframe);
      }
    })
    .catch((error) => {
      console.log(error.status);
    });
}

//render FavouriteBtn with parameter given
//Favourite Btn will have data-title, data-id, data-poster_url
function renderFvrtBtn(id, title, url) {
  $("#addFavouriteBtn").attr({
    "data-title": title,
    "data-id": id,
    "data-poster_url": url,
  });

  $("#deleteFavouriteBtn").attr({
    "data-title": title,
    "data-id": id,
    "data-poster_url": url,
  });

  displayFavourite();
}

//Add EventListener for FvrtBtn to add Movie to favourite in Local Storage
$("#addFavouriteBtn").click(function (event) {
  let title = event.currentTarget.attributes["data-title"].value;
  let id = event.currentTarget.attributes["data-id"].value;
  let posterUrl = event.currentTarget.attributes["data-poster_url"].value;

  let data = getFavourite();
  data.push({
    id: id,
    title: title,
    poster_path: `https://image.tmdb.org/t/p/w500${posterUrl}`,
  });

  saveFavourite(data);
  displayFavourite();
});

$("#deleteFavouriteBtn").click(function (event) {
  let data = getFavourite();
  let id = event.currentTarget.attributes["data-id"].value;
  let index = data.findIndex((r) => r.id == id);
  if (index >= 0) {
    data.splice(index, 1);
  }
  saveFavourite(data);
  displayFavourite();
});

function displayFavourite() {
  let data = getFavourite();

  let id = decodeURIComponent(new URL(location.href).searchParams.get("id"));

  if (data && data.some((r) => r.id == id)) {
    //figure out how to change favourite button to scale out. cause when removing the hide class it makes the button functionality not work
    $("#deleteFavouriteBtn").removeClass("hide");
    $("#addFavouriteBtn").addClass("hide");
  } else {
    $("#addFavouriteBtn").removeClass("hide");
    $("#deleteFavouriteBtn").addClass("hide");
  }
}

fetchInfo();
