import * as MODEL from "./model.js";

function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];
  if (pageID == "" || pageID == "home" || pageID == "login") {
    MODEL.changePage(pageID, subpageID, initSignUpListener, initLoginListener);
  } else if (pageID == "recipe-view") {
    MODEL.changePage(pageID, subpageID);
  } else {
    MODEL.changePage(pageID);
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

// sign-up function

function initSignUpListener() {
  $("#signup-submit").on("click", function (e) {
    console.log("submit");

    let fn = $("#signup-fn").val();
    let ln = $("#signup-ln").val();
    let em = $("#signup-email").val();
    let pw = $("#signup-pw").val();

    if (fn == "") {
      alert("Enter first name.");
    } else if (ln == "") {
      alert("Enter last name.");
    } else if (em == "") {
      alert("Enter email.");
    } else if (pw == "") {
      alert("Enter password.");
    } else {
      console.log("hello");
      let newUserObj = {
        firstName: fn,
        lastName: ln,
        email: em,
        password: pw,
      };

      MODEL.setSignUpInfo(newUserObj);
      MODEL.toggleLogin();
      window.location.hash = "home";
    }
  });
}
// login function
function initLoginListener() {
  $("#login-submit").on("click", function (e) {
    console.log("submit");

    let lem = $("#login-email").val();
    let lpw = $("#login-pw").val();

    if (lem == "") {
      alert("Enter email.");
    } else if (lpw == "") {
      alert("Enter password.");
    } else {
      console.log("welcome");
      let userObj = {
        email: lem,
        password: lpw,
      };

      MODEL.setLoginInfo(userObj);
      MODEL.toggleLogin();
      window.location.hash = "home";
    }
  });
}

$(document).ready(function () {
  initURLListener();
});
