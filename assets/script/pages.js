let page = "";

function goto(path, forceLoad = false) {
    // set path to current path if not provided
    if (!path) path = window.location.pathname;

    // if index is requested, we get the home page
    if (path == "/") path = "/home";

    // same page, dont bother
    if (path == page && !forceLoad) return;
    page = path;

    // we reset to avoid flickering
    $("#replacable").html("");
    $("#page-style").attr("href", "");

    // load the page and set the style
    $("#replacable").load(path + "/page.html");
    $("#page-style").attr("href", path + "/style.css");

    // set /home to / for the url
    if (path == "/home") path = "/";

    // update the url in the browser
    window.history.pushState({}, "", path);
}

function loadInitial() {
    $.get("/index.html", function (d) {
        document.documentElement.innerHTML = d;
        goto();
    });
}

// update the page when the url changes
window.onpopstate = function () {
    goto("", true);
}