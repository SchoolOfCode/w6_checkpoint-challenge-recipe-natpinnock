# Fetch

## Objectives:

- To fetch from an API.
- To use async and await correctly.
- To return the necesary information from a request using object manipulation.

## Syntax:

- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Async / await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [.JSON()](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

## Making A Recipe Generator

Your task over the next couple of weeks is to create a recipe generator by fetching from an API. We have written some instructions to help you, but feel free to expand on these and add any additional features you would like in order to create the best application you can.

Sign up to the free tier of the Edamam API [here](https://developer.edamam.com/). Click on SIGN UP and select 'Recipe Search'. On the next screen, select the free DEVELOPER tier by clicking START NOW.

Click "Get an API Key Now" in the top menu once signed in. Click the green button on the resulting page to create an application and enter a short name/description (it doesn't matter what). Once you submit this, you are taken to a page with your application ID and key.

Make a note of your ID and key and then navigate to the API docs [here](https://developer.edamam.com/edamam-docs-recipe-api) for more information on how to use it.

To use your API ID and key in the url, just replace ${YOUR_APP_ID} and ${YOUR_APP_KEY} with your information from Edamam:

```

const YOUR_APP_ID = "YOUR_APP_ID"
const YOUR_APP_KEY = "YOUR_APP_KEY"

const requestUrl = `https://api.edamam.com/search?q=kale&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`

```

The above request URL would return recipes containing kale.

Use the fetchRecipe function to make a fetch request to the Edamam API with the food that the function takes in entered as a search query. Use the first recipe from the hits array in the data that you receive.

Use .innerHTML to set the text contained in the a tag with the id #recipe-link to be the recipe label from the data you receive. Then set the href of #recipe-link to be the recipe's url, also from the received data.

Note: We have added some of the code for you already. Please don't change this. You can write your code in fetchRecipe below those. Once you have completed this initial step, see what else you can do...

- Can you add images, ingredients or other information to your page?
- Can you have more than one recipe appear on the page with the information so people can pick from a selection?
- Add a CSS file and style your page appropriately.

Take a look at sites like [BBC Good Food](https://www.bbcgoodfood.com/) for inspiration. Explore recipe sites from a user perspective, and think about how you could use the newfound power of APIs, along with your knowledge of creating dynamic websites, to build an experience based on searching for recipes. Collaborate with your pair and team to build something amazing - you don't have to write your code alone!
