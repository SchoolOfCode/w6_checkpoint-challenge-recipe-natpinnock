let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

let data = "";
let recipeSection = "";
let recipeLabel = "";
async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${foodToSearch}&app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487`
  );
  data = await response.json();
  for (i = 0; i < data.hits.length; i++) {
    recipeSection = document.querySelector("#recipe-section");
    recipeLabel = document.createElement("a");
    recipeLabel.innerHTML = data.hits[i].recipe.label;
    recipeLabel.href = data.hits[i].recipe.url;
    recipeSection.appendChild(recipeLabel);
    recipeImage = document.createElement("img");
    recipeImage.src = data.hits[i].recipe.image;
    recipeSection.appendChild(recipeImage);
    recipeIngredients = document.createElement("img");
    recipeImage.src = data.hits[i].recipe.image;
    recipeSection.appendChild(recipeImage);
  }
}
