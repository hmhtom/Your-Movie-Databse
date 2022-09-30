//Search Bar/Search Btn on Nav Bar Functionality

//SearchBtn EventHandler
function handleSearch(event) {
  //Get Query from user input in searchbar
  let query = $("#searchBar").val().trim();
  //Alert if user input is empty
  if (!query) {
    var alert = M.Modal.init($("#alert")[0], {
      onOpenEnd: () => {
        setTimeout(() => {
          alert.close();
        }, 300);
      },
    });
    alert.open();
  } else {
    //Relocate to search-result page with query
    location.replace(`./search-result.html?q=${encodeURIComponent(query)}`);
  }
}
//Add alert to page
$("body").append(`
<div id="alert" class="modal">
  <h4 class="center user-select-none">Search cannot be empty</h4>
</div>`);

//SearchBtn Click EventListener
$("#searchBtn").on("click", handleSearch);
