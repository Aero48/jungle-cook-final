import * as MODEL from "./model.js";

function changeRoute() {
    let pageID = window.location.hash.replace('#', '');
    if (pageID == "" || pageID == "home") {
        MODEL.changePage(pageID);
    } else {
        MODEL.changePage(pageID);
    }
}

function initURLListener() {
    $(window).on('hashchange', changeRoute);
    changeRoute();
}

$(document).ready(function () {
    initURLListener();
});