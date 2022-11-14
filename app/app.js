import * as MODEL from "./model.js";

function changeRoute() {
  let pageID = window.location.hash.replace("#", "");
  if (pageID == "" || pageID == "home" || pageID == "login") {
    MODEL.changePage(pageID, initSubmitListener);
  } else {
    MODEL.changePage(pageID);
  }

  if (MODEL.loggedIn == true) {
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

// sign-up function

function initSubmitListener() {
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
      let userObj = {
        firstName: fn,
        lastName: ln,
        email: em,
        password: pw,
      };

      MODEL.setUserInfo(userObj);
      MODEL.loggedIn = true;
    }
  });
}

$(document).ready(function () {
  initURLListener();
});
