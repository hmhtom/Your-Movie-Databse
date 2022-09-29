//Rendering Search Results on search-result.html

const TMDB_API_KEY = "d94dfa549a03679b14c6609bddc9a3b0";

function getQuery() {
  //Get search query from location.search
  return decodeURIComponent(new URL(location.href).searchParams.get("q"));
}

function fetchSearch(query) {
  $("#searchResultQuery").text(query);
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
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
    });
}

function renderSearch(data) {
  //Render #searchResultQuery and #searchResultContainer with data given
  $("#searchResultQuery").append(` and found ${data.results.length} results.`);

  for (var i in data.results) {
    let imgUrl = `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`;
    let imgBox = $("<div>").css({
      "background-image": "url(" + imgUrl + ")",
      "background-repeat": "no-repeat",
      "background-size": "contain",
      "background-position": "center",
    });
    let resultBox = $('<a class="col s2 center searchResultBox hoverable">')
      .append(imgBox, `<h6>${data.results[i].title}</h6>`)
      .attr({
        "data-title": data.results[i].title,
        "data-id": data.results[i].id,
        "data-imgUrl": imgUrl,
        href: `static-movie-page.html?id=${data.results[i].id}`,
      });

    $("#searchResultContainer").append(resultBox);
  }
}

fetchSearch(getQuery());
