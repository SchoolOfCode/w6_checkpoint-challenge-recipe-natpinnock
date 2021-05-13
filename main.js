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
  for (i = 0; i < 8; i++) {
    recipeSection = document.querySelector("#recipe-section");
    recipeBox = document.createElement("section");
    recipeBox.id = "recipebox";
    recipeSection.appendChild(recipeBox);
    recipeLabel = document.createElement("a");
    recipeLabel.innerHTML = data.hits[i].recipe.label;
    recipeLabel.href = data.hits[i].recipe.url;
    recipeBox.appendChild(recipeLabel);
    recipeImage = document.createElement("img");
    recipeImage.src = data.hits[i].recipe.image;
    recipeBox.appendChild(recipeImage);
  }
}

//delete current items when a new search starts
