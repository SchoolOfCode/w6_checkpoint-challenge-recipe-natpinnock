let data = "";
let recipeSection = "";
let recipeLabel = "";
let foodToSearch = null;
let mealType = "";
let cuisineType = "";
let calorieArray = [];
let calories = "";
let totalResults = "";
let needsList = [];
let searchSection = "";
let message = "";

handleRecipeClick = () => {
  var letters = /^[A-Za-z]+$/;
  if (foodToSearch.match(letters)) {
    // document.querySelector("#oops").innerHTML = "";
    fetchRecipe(foodToSearch);
    let mealCheck = document.getElementsByName("meal-filters");
    for (let i = 0; i < mealCheck.length; i++) mealCheck[i].checked = false;
    let cuisineCheck = document.getElementsByName("cuisineType");
    for (let i = 0; i < cuisineCheck.length; i++)
      cuisineCheck[i].checked = false;
    let calorieCheck = document.getElementsByName("calories");
    for (let i = 0; i < calorieCheck.length; i++)
      calorieCheck[i].checked = false;
  } else {
    searchSection = document.querySelector("#recipe-search");
    let message = document.createElement("p");
    message.id = "oops";
    message.innerText =
      "Oops! Your search should contain letters only, no numbers!";
    searchSection.appendChild(message);
  }
};

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

addRecipeToPage = (test) => {
  recipeSection = document.querySelector("#recipe-section");
  recipeBox = document.createElement("section");
  recipeBox.id = "recipebox";
  recipeSection.appendChild(recipeBox);
  //create a tag and show recipe label
  recipeLabel = document.createElement("a");
  recipeLabel.innerHTML = test.hits[i].recipe.label;
  recipeLabel.href = test.hits[i].recipe.url;
  recipeLabel.target = "_blank";
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
  if (test.hits[i].recipe.cuisineType) {
    cuisineType.innerHTML = test.hits[i].recipe.cuisineType;
    recipeBox.appendChild(cuisineType);
  }
  //create a p tag for health labels
  healthLabel = document.createElement("p");
  let healthArray = test.hits[i].recipe.healthLabels;
  if (healthArray.includes("Vegan")) {
    healthLabel.innerHTML = "Vegan";
    recipeBox.appendChild(healthLabel);
  }
  //else
  healthLabel2 = document.createElement("p");
  if (healthArray.includes("Vegetarian")) {
    healthLabel2.innerHTML = "Vegetarian";
    recipeBox.appendChild(healthLabel2);
  }
};
async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${foodToSearch}&app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487&to=25`
  );
  data = await response.json();
  totalResults = data.hits.length;
  console.log(totalResults);
  if (data !== "") {
    for (i = 0; i < 5; i++) {
      addRecipeToPage(data);
    }
  } else {
    let searchSection = document.querySelector("#recipe-search");
    let message = document.createElement("p");
    message.innerText = "Sorry, there were no matches to your search!";
    searchSection.appendChild(message);
  }
}

//apply filter functions
async function filterMeals() {
  let response = await fetch(
    `https://api.edamam.com/search?app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487&to=50&q=${foodToSearch}${mealType}${cuisineType}${calories}`
  );
  let data = await response.json();
  totalResults = data.hits.length;
  console.log(totalResults);
  if (data !== "") {
    for (i = 0; i < 5; i++) {
      addRecipeToPage(data);
    }
  } else {
    let searchSection = document.querySelector("#recipe-search");
    let message = document.createElement("p");
    message.innerText = "Sorry, there were no matches to your search!";
    searchSection.appendChild(message);
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

async function getFoodBankNeeds() {
  let response = await fetch("https://www.givefood.org.uk/api/2/needs/");
  let data = await response.json();
  for (i = 0; i < 10; i++) {
    needsList.push(data[i].needs.substring(0, data[i].needs.indexOf("\r\n")));
  }
  addNeedsList();
}
getFoodBankNeeds();

function addNeedsList() {
  foodBankList = document.querySelector("ol");
  for (i = 0; i < needsList.length; i++) {
    listItem = document.createElement("li");
    listItem.innerText = needsList[i];
    foodBankList.appendChild(listItem);
  }
}
