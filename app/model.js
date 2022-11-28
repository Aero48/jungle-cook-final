var signupInfo = {};

var loginInfo = {};

var recipeCount = 2;

var recipes = [
  {
    id: 0,
    name: "Supreme Pizza",
    img: "../images/recipe-pizza.jpg",
    description:
      "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!",
    totalTime: "1h24min",
    servings: "4",
    ingredients: [
      "150ml Water",
      "1 tsp Sugar",
      "15g Yeast",
      "225g Plain Flour",
      "1 1/2 tsp Salt",
      "Drizzle Olive Oil",
      "80g Passata",
      "70g Mozzarella",
      "Peeled and Sliced Oregano",
      "Basil Leaves",
      "Pinch of Black Pepper",
    ],
    instructions: [
      "Preheat the oven to 230°C.",
      "Add the sugar and crumble the fresh yeast into warm water.",
      "Allow the mixture to stand for 10 – 15 minutes in a warm place (we find a windowsill on a sunny day works best) until froth develops on the surface.",
      "Sift the flour and salt into a large mixing bowl, make a well in the middle and pour in the yeast mixture and olive oil.",
      "Lightly flour your hands, and slowly mix the ingredients together until they bind.",
      "Generously dust your surface with flour.",
      "Throw down the dough and begin kneading for 10 minutes until smooth, silky and soft.",
      "Place in a lightly oiled, non-stick baking tray (we use a round one, but any shape will do!)",
      "Spread the passata on top making sure you go to the edge.",
      "Evenly place the mozzarella (or other cheese) on top, season with the oregano and black pepper, then drizzle with a little olive oil.",
      "Cook in the oven for 10 – 12 minutes until the cheese slightly colours.",
      "When ready, place the basil leaf on top and tuck in!",
    ],
    userId: 0,
  },
  {
    id: 1,
    name: "Fettuccine Alfredo",
    img: "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg",
    description: "A Delicious Italian dish.",
    totalTime: "1h24min",
    servings: "4",
    ingredients: [
      "1 lb Fettuccine",
      "1/2 cup Heavy Cream",
      "1/2 cup Butter",
      "1/2 cup Parmesan",
      "2 tbsp Parsley",
      "Black Pepper",
    ],
    instructions: [
      "Cook pasta according to package instructions in a large pot of boiling water and salt.",
      "Add heavy cream and butter to a large skillet over medium heat until the cream bubbles and the butter melts.",
      "Whisk in parmesan and add seasoning (salt and black pepper).",
      "Let the sauce thicken slightly and then add the pasta and toss until coated in sauce.",
      "Garnish with parsley, and it's ready.",
    ],
    userId: 1,
  },
];

var loggedIn = false;

export function changePage(pageID, subpageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (contents) {
      $("#app").html(contents);
      console.log(pageID);
    });
  } else if (pageID == "login") {
    if (loggedIn == false) {
      $.get(`pages/login.html`, function (data) {
        $("#app").html(data);
        callback();
      });
    } else {
      toggleLogin();
      window.location.hash = "home";
    }
  } else if (pageID == "recipes") {
    $.get(`pages/recipes.html`, function (data) {
      $("#app").html(data);
      $(".recipe-list").html(``);
      $.each(recipes, function (idx, recipe) {
        $(
          ".recipe-list"
        ).append(`<div class="recipe-list-item" id="recipe-${recipe.id}">
        <div class="recipe-list-item-content">
          <a href="#recipe-view/${recipe.id}"><div
            class="recipe-list-img"
            style="background-image: url(${recipe.img})"
          ></div></a>
          <div class="recipe-list-text">
          <a href="#recipe-view/${recipe.id}"><h2>${recipe.name}</h2></a>
            <p>
              ${recipe.description}
            </p>
            <div class="recipe-list-info">
              <img src="./images/time.svg" alt="Cook Time" />
              <p>${recipe.totalTime}</p>
            </div>
            <div class="recipe-list-info">
              <img src="./images/servings.svg" alt="Servings" />
              <p>${recipe.servings} servings</p>
            </div>
          </div>
        </div>
      </div>`);
      });
    });
  } else if (pageID == "recipe-view") {
    console.log("test");
    $.get(`pages/recipe-view.html`, function (data) {
      $("#app").html(data);
      $.each(recipes, function (idx, recipe) {
        if (recipe.id == subpageID) {
          $(".recipe-view").html(`<div class="description">
        <label for="recipe-view-title" id="recipe-view-title">${recipe.name}</label>
        <div>
          <img class="recipe-image" src="${recipe.img}" alt="" />
        </div>
        <div class="recipe-description">
          <h2>Description:</h2>
          <p>
            ${recipe.description}
          </p>
          <h3>Total Time:</h3>
          <p>${recipe.totalTime}</p>
    
          <h3>Servings:</h3>
          <p>${recipe.servings} servings</p>
        </div>
      </div>
    
      <div class="ingredients">
        <h2>Ingredients:</h2>
      </div>
    
      <div class="instructions">
        <h2>Instructions:</h2>
        
      </div>
      <div class="recipe-input-container">
        
      </div>`);
          $(".ingredients").html(``);
          $.each(recipe.ingredients, function (idx, ingredient) {
            $(".ingredients").append(`<p>${ingredient}</p>`);
          });

          $(".instructions").html(``);
          $.each(recipe.instructions, function (idx, instruction) {
            $(".instructions").append(`<p>${idx + 1}. ${instruction}</p>`);
          });

          if (loggedIn == true && recipe.userId == 1) {
            $(".recipe-input-container").html(`<a href="#recipe-edit/${recipe.id}">
          <button id="editRecipe">Edit Recipe</button>
        </a>`);
          }
        }
      });
    });
  } else if (pageID == "your-recipes") {
    $.get(`pages/your-recipes.html`, function (data) {
      $("#app").html(data);
      if (loginInfo.firstName == null) {
        $(".recipe-edit h1").html(`Hey ${loginInfo.email}, edit your recipe!`);
      } else {
        $(".recipe-edit h1").html(`Hey ${loginInfo.firstName}, edit your recipe!`);
      }
      resetYourRecipesView();
      callback();
    })
  } else if (pageID == "recipe-create") {
    if (loggedIn == true) {
      $.get(`pages/recipe-create.html`, function (data) {
        $("#app").html(data);
        callback();
      })
    } else {
      window.location.hash = "login";
    }
  } else if (pageID == "recipe-edit") {
    if (loggedIn == true) {
      $.get(`pages/recipe-edit.html`, function (data) {
        $("#app").html(data);
        $.each(recipes, function (idx, recipe) {
          if (recipe.id == subpageID) {
            $(".recipe-edit").html(`
        <div class="recipe-create-formHolder">
    <h1>Hey Michael, edit your recipe!</h1>
    <div class="recipe-input-container">
      <input type="submit" value="Add File" id="addFile" />
      <input
        type="text"
        id="edit-recipe-img"
        value="${recipe.img}"
        placeholder="Add Recipe Image"
      />
    </div>
    <div class="recipe-input-container">
      <input type="text" id="edit-recipe-name"
      value="${recipe.name}" placeholder="Recipe Name" />
    </div>
    <div class="recipe-input-container">
      <input
        type="text"
        id="edit-recipe-description"
        value="${recipe.description}"
        placeholder="Recipe Description"
      />
    </div>
    <div class="recipe-input-container">
      <input
        type="text"
        id="edit-recipe-time"
        value="${recipe.totalTime}"
        placeholder="Recipe Total Time"
      />
    </div>
    <div class="recipe-input-container">
      <input
        type="text"
        id="edit-recipe-serving"
        value="${recipe.servings}"
        placeholder="Recipe Serving Size"
      />
    </div>
  </div>

  <div class="recipe-create-formHolder">
    <h2>Enter Ingredients:</h2>
    <div class="ingred">
      
      

      <div class="addBtn"><p>+</p></div>
    </div>
  </div>

  <div class="recipe-create-formHolder">
    <h2>Enter Instructions:</h2>

    <div class="steps">
      
      <div class="addSBtn"><p>+</p></div>
    </div>
  </div>

  <div class="recipe-create-formHolder">
    <div class="recipe-input-container">
      <input type="submit" id="createRecipeBtn" value="Create Recipe" />
    </div>
  </div>`)
            $.each(recipe.ingredients, function (idx, ingredient) {
              $(".ingred").append(`<div class="recipe-input-container">
              <input type="text" id="ingred${idx}" 
              value="${ingredient}" placeholder="Ingredient #${idx + 1}" />
            </div>`)
            })

            $.each(recipe.instructions, function (idx, step) {
              $(".steps").append(`<div class="recipe-input-container">
              <input type="text" id="step${idx}"
              value="${step}" placeholder="Instruction #${idx + 1}" />
            </div>`)
            })

            callback(recipe.ingredients.length, recipe.instructions.length, recipe.id);
          }
        })



      })
    } else {
      window.location.hash = "login";
    }
  } else {
    $.get(`pages/${pageID}.html`, function (contents) {
      $("#app").html(contents);
      console.log(pageID);
    });
  }
}

// export function setSignUpInfo(newUserObject) {
//   signupInfo = newUserObject;
//   console.log(signupInfo);
// }

export function setLoginInfo(userObject) {
  loginInfo = userObject;
  console.log(loginInfo);
}

export function toggleLogin() {
  if (!loggedIn) {
    loggedIn = true;
    $("#login-btn button").html("Logout");
    $("#login-footer").html("Logout");
    $("#yourRecipes").html("Your Recipes");
    $("#yourRecipes-footer").html("Your Recipes");
  } else {
    loggedIn = false;
    $("#login-btn button").html("Login");
    $("#login-footer").html("Login");
    $("#yourRecipes").html("");
    $("#yourRecipes-footer").html("");
  }
}

function resetYourRecipesView() {
  $(".recipe-list").html(``);
  $.each(recipes, function (idx, recipe) {
    if (recipe.userId == 1) {
      $(
        ".recipe-list"
      ).append(`<div class="recipe-list-item" id="recipe-${recipe.id}">
          <div class="recipe-list-item-content">
            <a href="#recipe-view/${recipe.id}"><div
              class="recipe-list-img"
              style="background-image: url(${recipe.img})"
            >
            <button class="view-recipe">View</button></div></a>
            <div class="recipe-list-text">
            <a href="#recipe-view/${recipe.id}"><h2>${recipe.name}</h2></a>
              <p>
                ${recipe.description}
              </p>
              <div class="recipe-list-info">
                <img src="./images/time.svg" alt="Cook Time" />
                <p>${recipe.totalTime}</p>
              </div>
              <div class="recipe-list-info">
                <img src="./images/servings.svg" alt="Servings" />
                <p>${recipe.servings} servings</p>
              </div>
            </div>
          </div>
          <div class="recipe-list-item-btns">
        <a href="#recipe-edit/${recipe.id}"><button class="recipe-edit-btn">Edit Recipe</button></a>
        <button class="recipe-delete-btn" id="recipe-delete-${recipe.id}">Delete</button>
      </div>
        </div>`);
    }

  });
}

export function addRecipe(recipeObj) {
  recipeObj.id = recipeCount;
  recipeCount++;
  recipes.push(recipeObj);
}

export function deleteRecipe(id) {
  $.each(recipes, function (idx, recipe) {
    if (id == recipe.id) {
      recipes.splice(idx, 1);
      resetYourRecipesView();
    }
  })

}

export function updateRecipe(recipeObj) {
  $.each(recipes, function (idx, recipe) {
    if (recipeObj.id == recipe.id) {

      recipes[idx] = recipeObj;
      console.log(recipes)
    }
  })
}
