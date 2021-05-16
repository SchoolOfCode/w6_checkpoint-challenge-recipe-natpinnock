let data = "";
let recipeSection = "";
let recipeLabel = "";
let foodToSearch = null;
let mealType = "";
let cuisineType = "";
let calorieArray = [];
let calories = "";

handleRecipeClick = () => {
  recipeSection.innerHTML = "";
  fetchRecipe(foodToSearch);
  let mealCheck = document.getElementsByName("meal-filters");
  for (let i = 0; i < mealCheck.length; i++) mealCheck[i].checked = false;
  let cuisineCheck = document.getElementsByName("cuisineType");
  for (let i = 0; i < cuisineCheck.length; i++) cuisineCheck[i].checked = false;
  let calorieCheck = document.getElementsByName("calories");
  for (let i = 0; i < calorieCheck.length; i++) calorieCheck[i].checked = false;
};

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

addRecipeToPage = (test) => {
  //section for each recipe
  recipeSection = document.querySelector("#recipe-section");
  recipeBox = document.createElement("section");
  recipeBox.id = "recipebox";
  recipeSection.appendChild(recipeBox);
  //create a tag and show recipe label
  recipeLabel = document.createElement("a");
  recipeLabel.innerHTML = test.hits[i].recipe.label;
  recipeLabel.href = test.hits[i].recipe.url;
  recipeBox.appendChild(recipeLabel);
  //create img tag and display image
  recipeImage = document.createElement("img");
  recipeImage.src = test.hits[i].recipe.image;
  recipeBox.appendChild(recipeImage);
  //create a p tag for diet type
  dietType = document.createElement("p");
  dietType.innerHTML = test.hits[i].recipe.dietLabels;
  recipeBox.appendChild(dietType);
  //create a p tag for cuisine
  cuisineType = document.createElement("p");
  cuisineType.innerHTML = test.hits[i].recipe.cuisineType;
  recipeBox.appendChild(cuisineType);
  //create a p tag for health labels
  healthLabel = document.createElement("p");
  let healthArray = test.hits[i].recipe.healthLabels;
  if (healthArray.includes("Vegan")) {
    healthLabel.innerHTML = "Vegan";
    recipeBox.appendChild(healthLabel);
  }
  healthLabel2 = document.createElement("p");
  if (healthArray.includes("Vegetarian")) {
    healthLabel2.innerHTML = "Vegetarian";
    recipeBox.appendChild(healthLabel2);
  }
};

async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${foodToSearch}&app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487`
  );
  data = await response.json();

  for (i = 0; i < 5; i++) {
    addRecipeToPage(data);
  }
}

// //Dish Type
// async function filterMealType() {
//   let response = await fetch(
//     `https://api.edamam.com/search?q=${foodToSearch}&app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487&${mealType}`
//   );
//   mealData = await response.json();
//   for (i = 0; i < 5; i++) {
//     addRecipeToPage(mealData);
//   }
// }

// function getMealType() {
//   recipeSection.innerHTML = "";
//   mealType = `&mealType=${this.value}`;
//   filterMealType();
// }

// document.querySelectorAll(".mealType").forEach((item) => {
//   item.addEventListener("click", getMealType);
// });

// //Cuisine Type
// async function filterCuisineType() {
//   let response = await fetch(
//     `https://api.edamam.com/search?app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487&q=${foodToSearch}&cuisineType=${cuisineType}${mealType}`
//   );
//   cuisineData = await response.json();
//   for (i = 0; i < 5; i++) {
//     addRecipeToPage(cuisineData);
//   }
// }

// function getCuisineType() {
//   recipeSection.innerHTML = "";
//   cuisineType = this.value;
//   filterCuisineType();
// }

// document.querySelectorAll(".cuisineType").forEach((item) => {
//   item.addEventListener("click", getCuisineType);
// });

//practice all filter functions
async function filterMeals() {
  let response = await fetch(
    `https://api.edamam.com/search?app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487&q=${foodToSearch}${mealType}${cuisineType}${calories}`
  );
  filterData = await response.json();
  for (i = 0; i < 5; i++) {
    addRecipeToPage(filterData);
  }
}

function applyFilters() {
  recipeSection.innerHTML = "";
  let filters = document.querySelectorAll(".filter");
  mealType = "";
  cuisineType = "";
  calories = "";
  calorieArray = [];
  filters.forEach((filter) => {
    if (filter.checked === true) {
      if (filter.className === "filter mealType") {
        mealType += `&mealType=${filter.value}`;
      } else if (filter.className === "filter cuisineType") {
        cuisineType += `&cuisineType=${filter.value}`;
      } else {
        calorieArray.push(filter.min, filter.max);
        calories = `&calories=${calorieArray[0]}-${
          calorieArray[calorieArray.length - 1]
        }`;
      }
    }
  });
  filterMeals();
}

//catch error function

// add some more filter options
//what happens if any of the hits are null
//move link to entire recipe box
//show next 5 on click
//additional API
//CSS styling
