//Search Bar/Search Btn on Nav Bar Functionality

//SearchBtn EventHandler
function handleSearch(event) {
  //Get Query from user input in searchbar
  let query = $("#searchBar").val().trim();
  //Alert if user input is empty
  if (!query) {
    alert("Search cannot be empty.");
  } else {
    //Relocate to search-result page with query
    location.replace(`./search-result.html?q=${encodeURIComponent(query)}`);
  }
}

//SearchBtn Click EventListener
$("#searchBtn").on("click", handleSearch);
