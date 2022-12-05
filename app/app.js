import * as MODEL from "./model.js";

function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");

  //Takes each piece of the array and assigns them to pageID and subpageID respectively
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];

  //Loads different model functions depending on the pageID
  if (pageID == "" || pageID == "home") {
    MODEL.changePage(pageID);
  } else if (pageID == "login") {
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

/**
 * When the user clicks on a recipe-delete-btn, get the id of the recipe and pass it to the
 * deleteRecipe function in the MODEL.
 */
function yourRecipeListeners() {
  $(".recipe-delete-btn").on("click", (e) => {
    let id = e.target.id.substring(14);
    MODEL.deleteRecipe(id);
  })
}

/**
 * It's a function that creates event listeners for the create recipe page.
 */
function createRecipeListeners() {
  //Variables that determine the amount of ingredients & steps in the current recipe form (starts at 3)
  let ingredCnt = 3;
  let stepCnt = 3;

  //Click listeners that add new ingredient/step rows to the form
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

  //Pulls all the information from the form, stores it in a temporary object, then adds the recipe through the model
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

    MODEL.addRecipe(recipeObj);
    window.location.hash = "recipes"
  });
}

// Event listeners for edit recipe page
function editRecipeListeners(ingredLength, stepsLength, id) {
  // Pulls amount of ingredents & steps from selected recipe
  let ingredCnt = ingredLength;
  let stepCnt = stepsLength;

  // Click listeners that add new ingredient/step rows to the form
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

  //Pulls all the information from the form, stores it in a temporary object, then updates the current recipe through the model
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

    MODEL.updateRecipe(recipeObj);
    window.location.hash = "recipes"
  })
}

// calls signup/login functions
function loginController() {
  initLoginListener();
  initSignUpListener();
}

// Listener for the sign up form. When button is clicked, sign up info is stored and user is logged in.
function initSignUpListener() {
  $("#signup-submit").on("click", function (e) {

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

// Listener for the login form. When button is clicked, login info is stored and user is logged in.
function initLoginListener() {
  $("#login-submit").on("click", function (e) {
    let lem = $("#login-email").val();
    let lpw = $("#login-pw").val();

    if (lem == "") {
      alert("Enter email.");
    } else if (lpw == "") {
      alert("Enter password.");
    } else {
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

// Listens for hash changes and changes the route depending on it
function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

// Runs initURLListener function when the page is ready
$(document).ready(function () {
  initURLListener();
});
