function getError() {
    //Get error from url
    return decodeURIComponent(new URL(location.href).searchParams.get("error"));
}

function showError(error) {
    $(".errorHandling").html(error).removeClass("hide");
}
showError(getError());