import * as MODEL from "./model.js";

function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];
  if (pageID == "" || pageID == "home" || pageID == "login") {
    MODEL.changePage(pageID, subpageID, loginController);
  } else if (pageID == "recipe-view") {
    MODEL.changePage(pageID, subpageID);
  } else if (pageID == "recipe-create") {
    MODEL.changePage(pageID, subpageID, createRecipeController);
  } else {
    MODEL.changePage(pageID);
  }
}

// create recipe function

function createRecipeController() {
  initListener();
}

var ingredCnt = 3;
var stepCnt = 3;

var recipes = [];

function initListener() {
  $(".addBtn").on("click", (e) => {
    $(".recipe-create-formHolder .ingred ").append(
      `<div class="recipe-input-container" ><input type="text" id="ingred${ingredCnt}" placeholder="Ingredient #${
        ingredCnt + 1
      }" /> </div>`
    );
    ingredCnt++;
  });

  $(".addSBtn").on("click", (e) => {
    $(".recipe-create-formHolder .steps").append(
      `<div class="recipe-input-container" ><input type="text" id="step${stepCnt}" placeholder="Instruction #${
        stepCnt + 1
      }" /></div>`
    );
    stepCnt++;
  });

  $("#createRecipeBtn").on("click", (e) => {
    let recipeObj = {
      description: "",
      steps: [],
      ingredients: [],
    };

    e.preventDefault();
    $(".recipe-create-formHolder .steps input").each((idx, step) => {
      recipeObj.steps.push({ step: step.value });
    });
    $(".recipe-create-formHolder .ingred input").each((idx, ingred) => {
      recipeObj.ingredients.push({ ingred: ingred.value });
    });

    recipes.push(recipeObj);

    console.log(recipeObj);
  });
}
// end recipe function

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

// calls signup/login functions
function loginController() {
  initLoginListener();
  initSignUpListener();
}

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
      //console.log("hello");
      let newUserObj = {
        firstName: fn,
        lastName: ln,
        email: em,
        password: pw,
      };

      MODEL.setLoginInfo(newUserObj);
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
