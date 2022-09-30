//Favourite drag/drop feature on main page and searchpage

//make all box in #trendingContainer and #searchResultContainer draggable/droppable from jQuery UI
//draggable: {helper:'clone'}
//droppable: {drop: function(event, ui){} classes: ui-droppable active, ui state active}


$("#addFavouriteBtn").click(function (event) {
    debugger;
    console.log(event);
    let data = getFavourite();

    if (!data.results) {
        data.results = [];
    }

    console.log(event);
    data.results.push({
        id: 1
    });
});


$("#deleteFavouriteBtn").click(function (event) {
    console.log("remove from favourite");
});

function displayFavourite() {
    let data = getFavourite();

    let id = decodeURIComponent(new URL(location.href).searchParams.get("id"));

    if (data && data.results && data.results.some(r => r.id == id)) {
        $("#deleteFavouriteBtn").removeClass('hide');
    } else {
        $("#addFavouriteBtn").removeClass('hide');
    }
}

displayFavourite();