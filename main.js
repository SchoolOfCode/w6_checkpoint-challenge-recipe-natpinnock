let foodToSearch = null;

function handleRecipeClick() {
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = document.querySelector("#food-input").value;
}

async function fetchRecipe(food) {
  let response = await fetch(
    `https://api.edamam.com/search?q=${foodToSearch}&app_id=3424b541&app_key=0e5519f0352e931ba2358451a65bc487`
  );
  let data = await response.json();
  let recipeLabel = document.querySelector("#recipe-label");
  recipeLabel.innerHTML = data.hits[0].recipe.label;
  recipeLabel.href = data.hits[0].recipe.url;
}
