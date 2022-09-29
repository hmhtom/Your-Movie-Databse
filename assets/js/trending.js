//Rendering trending on index.html

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";
//trending/movie/week
function fetchTrending() {
  //Fetch response from Trending API on TMDB
  fetch(
    `https:api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
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
  let row = null;
  for (var i in data.results) {
    if (i % 6 == 0) {
      row = $('<div class="row">');
      $("#trendingContainer").append(row);
    }
    debugger;
    let imgUrl = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    let imgBox = $("<div>").css({
      "background-image": "url(" + imgUrl + ")",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center",
    });
    //instead of appending results boc to trending container, append  results box to row
    let resultBox = $('<a class="col s2 center searchResultBox hoverable">')
      .append(imgBox, `<h6>${data.results[i].title}</h6>`)
      .attr({
        "data-title": data.results[i].title,
        "data-id": data.results[i].id,
        "data-imgUrl": imgUrl,
        href: `static-movie-page.html?id=${data.results[i].id}`,
      });

    row.append(resultBox);
    console.log(data);
  }
}


//Render into #trendingContainer
//EveryTrendingBox will have a href link to (moviepage.html?id={id}&title={TITLE}) to a new tab
//Trending box will have data-title, data-id, data-poster_url

fetchTrending();