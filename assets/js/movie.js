//Render Movie Info on movie page

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";

function getId() {
  //get id from location.search ?id={ID}
  //return fetchable Url for TMDB Search by ID API with ID and APIKEY
}

function fetchInfo(url) {
  //fetch from url given
  //Once data obtain call renderInfo(data)
  //catch Error
}

function renderInfo(data) {
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
  //Render #relatedVideoContainer with data given
  //Make to render in iframe Format
}

function renderFvrtBtn(id, title, url) {
  //render FavouriteBtn with parameter given
  //Favourite Btn will have data-title, data-id, data-poster_url
  //Check if localstorage have data-id already, look will be different
  //return the Btn Element
}

//Add EventListener for FvrtBtn to add Movie to favourite in Local Storage
