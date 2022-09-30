//Render Movie Info on movie page

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";
const YOUTUBE_API_KEY = "AIzaSyDPP8A921zDu8qi7NMvErqHkexWvB-Q498";

function getId() {
  let id = decodeURIComponent(new URL(location.href).searchParams.get("id"));
  return id;

  //get id from location.search ?id={ID}
  //return fetchable Url for TMDB Search by ID API with ID and APIKEY
}

function fetchInfo(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      renderInfo(data);
    })
    .catch((error) => {
      //Redirect to Error Page
      console.log(error.status);
    });
  //fetch from url given
  //Once data obtain call renderInfo(data)
  //catch Error
}

function renderInfo(data) {
  renderFvrtBtn(data.id, data.title, data.poster_path);
  renderVideo(data);
  //Render #movieInfoContainer with data given
  //Call renderFvrtBtn()
}

function getTitle() {
  //get title from location.search ?title={TITLE}
  //return Youtube search API url from TITLE
}

function fetchVideo(url) {
  //fetch from url given
  //Once data obtain call renderVideo(data)
  //catch Error
}

function renderVideo(data) {
  fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${data.title}&key=${YOUTUBE_API_KEY}`)
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      for (let i in data.items) {
        let item = data.items[i];

        let videoId = item.id.videoId;
        let iframe = $('<iframe>').attr({
          width: '300',
          height: '200',
          src: 'https://www.youtube.com/embed/' + videoId,
          frameborder: '0'
        });

        let container = $('<div class="col s3">').appendTo("#relatedVideoContainer");
        container.append(iframe);
      }
    })
    .catch((error) => {
      //Redirect to Error Page
      console.log(error.status);
    });
  //Render #relatedVideoContainer with data given
  //Make to render in iframe Format
}

function renderFvrtBtn(id, title, url) {
  $("#addFavouriteBtn").attr({
    'data-title': title,
    'data-id': id,
    'data-poster_url': url
  });

  $("#deleteFavouriteBtn").attr({
    'data-title': title,
    'data-id': id,
    'data-poster_url': url
  });


  displayFavourite();
  //render FavouriteBtn with parameter given
  //Favourite Btn will have data-title, data-id, data-poster_url
  //Check if localstorage have data-id already, look will be different
  //return the Btn Element
}



$("#addFavouriteBtn").click(function (event) {
  let title = event.currentTarget.attributes["data-title"].value;
  let id = event.currentTarget.attributes["data-id"].value;
  let posterUrl = event.currentTarget.attributes["data-poster_url"].value;

  let data = getFavourite();

  if (!data.results) {
    data.results = [];
  }

  data.results.push({
    id: id,
    title: title,
    poster_path: posterUrl
  });

  saveFavourite(data);
  displayFavourite();
});


$("#deleteFavouriteBtn").click(function (event) {
  let data = getFavourite();
  if (!data || !data.results || data.results.length == 0) {
    return;
  }

  let id = event.currentTarget.attributes["data-id"].value;
  let index = data.results.findIndex(r => r.id == id);
  if (index >= 0) {
    data.results.splice(index, 1);
  }
  saveFavourite(data);
  displayFavourite();
});

function displayFavourite() {

  let data = getFavourite();

  let id = decodeURIComponent(new URL(location.href).searchParams.get("id"));

  if (data && data.results && data.results.some(r => r.id == id)) {
    $("#deleteFavouriteBtn").removeClass('hide');
    $("#addFavouriteBtn").addClass('hide');
  } else {
    $("#addFavouriteBtn").removeClass('hide');
    $("#deleteFavouriteBtn").addClass('hide');
  }
}

//Add EventListener for FvrtBtn to add Movie to favourite in Local Storage

fetchInfo(getId());