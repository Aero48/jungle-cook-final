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
    MODEL.changePage(pageID, subpageID, createRecipeListeners);
  } else if (pageID == "your-recipes") {
    MODEL.changePage(pageID, subpageID, yourRecipeListeners);
  } else if (pageID == "recipe-edit") {
    MODEL.changePage(pageID, subpageID, editRecipeListeners);
  } else {
    MODEL.changePage(pageID);
  }
}

function yourRecipeListeners() {
  yourRecipeDeleteListener();
}

function yourRecipeDeleteListener() {
  $(".recipe-delete-btn").on("click", (e) => {
    let id = e.target.id.substring(14);
    console.log(id);
    MODEL.deleteRecipe(id);
  })
}

// create recipe function



function createRecipeListeners() {
  let ingredCnt = 3;
  let stepCnt = 3;

  $(".addBtn").on("click", (e) => {
    $(".recipe-create-formHolder .ingred ").append(
      `<div class="recipe-input-container" ><input type="text" id="ingred${ingredCnt}" placeholder="Ingredient #${ingredCnt + 1
      }" /> </div>`
    );
    ingredCnt++;
  });

  $(".addSBtn").on("click", (e) => {
    $(".recipe-create-formHolder .steps").append(
      `<div class="recipe-input-container" ><input type="text" id="step${stepCnt}" placeholder="Instruction #${stepCnt + 1
      }" /></div>`
    );
    stepCnt++;
  });

  $("#createRecipeBtn").on("click", (e) => {
    e.preventDefault();

    let recipeObj = {
      id: 0,
      name: "",
      img: "",
      description: "",
      totalTime: "",
      servings: "",
      ingredients: [],
      instructions: [],
      userId: 1
    };

    recipeObj.img = $(".recipe-create-formHolder #create-recipe-img").val();
    recipeObj.name = $(".recipe-create-formHolder #create-recipe-name").val();
    recipeObj.description = $(".recipe-create-formHolder #create-recipe-description").val();
    recipeObj.totalTime = $(".recipe-create-formHolder #create-recipe-time").val();
    recipeObj.servings = $(".recipe-create-formHolder #create-recipe-serving").val();
    $(".recipe-create-formHolder .ingred input").each((idx, ingred) => {
      recipeObj.ingredients.push(ingred.value);
    });
    $(".recipe-create-formHolder .steps input").each((idx, step) => {
      recipeObj.instructions.push(step.value);
    });


    console.log(recipeObj);

    MODEL.addRecipe(recipeObj);
    window.location.hash = "recipes"
  });
}
// end recipe function

function editRecipeListeners(ingredLength, stepsLength, id) {
  let ingredCnt = ingredLength;
  let stepCnt = stepsLength;

  // console.log(ingredLength)
  // console.log(stepsLength)
  $(".addBtn").on("click", (e) => {
    $(".recipe-create-formHolder .ingred ").append(
      `<div class="recipe-input-container" ><input type="text" id="ingred${ingredCnt}" placeholder="Ingredient #${ingredCnt + 1
      }" /> </div>`
    );
    ingredCnt++;
  });

  $(".addSBtn").on("click", (e) => {
    $(".recipe-create-formHolder .steps").append(
      `<div class="recipe-input-container" ><input type="text" id="step${stepCnt}" placeholder="Instruction #${stepCnt + 1
      }" /></div>`
    );
    stepCnt++;
  });

  $("#createRecipeBtn").on("click", (e) => {
    e.preventDefault();

    let recipeObj = {
      id: id,
      name: "",
      img: "",
      description: "",
      totalTime: "",
      servings: "",
      ingredients: [],
      instructions: [],
      userId: 1
    };

    recipeObj.img = $(".recipe-create-formHolder #edit-recipe-img").val();
    recipeObj.name = $(".recipe-create-formHolder #edit-recipe-name").val();
    recipeObj.description = $(".recipe-create-formHolder #edit-recipe-description").val();
    recipeObj.totalTime = $(".recipe-create-formHolder #edit-recipe-time").val();
    recipeObj.servings = $(".recipe-create-formHolder #edit-recipe-serving").val();
    $(".recipe-create-formHolder .ingred input").each((idx, ingred) => {
      recipeObj.ingredients.push(ingred.value);
    });
    $(".recipe-create-formHolder .steps input").each((idx, step) => {
      recipeObj.instructions.push(step.value);
    });


    console.log(recipeObj);

    MODEL.updateRecipe(recipeObj);
    window.location.hash = "recipes"
  })
}

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
