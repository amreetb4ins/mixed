/*
  Author: Amreet
  This is the JS file for Mixed
*/
// Targetting the dropdown to see what the user selects
const userIngredient = document.getElementById("ingredient");
// Base URL for API
const cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
// The Mix! button in HTML
const mixButton = document.querySelector("input[type='button']");
// The div that will show list of cocktails, set to display none to begin with
const cocktailsDiv = document.querySelector(".cocktails");

// Function to fetch cocktails based on the selected ingredient
function getCocktailList() {
  // gets the alcohol the user selected
  const ingredient = userIngredient.value;
  // constructs new url based off the user selection
  const url = `${cocktailURL}${ingredient}`;

  fetch(url) //making the fetch request
    .then(response => response.json()) //after request is complete, convert format to json
    .then(data => {
      displayCocktails(data); //if api request is successful, pass the data to the displayCocktails function
    })
    .catch(error => {
      console.error("Error fetching cocktails:", error); //error handling
    });
}

// Function to display cocktails in the cocktails div (show 10 random cocktails)
function displayCocktails(data) { //displays results in .cocktails div
  if (data.drinks) { //looks for drinks property in api response
    const limitedCocktails = getRandomCocktails(data.drinks, 10); //limit to 10 random cokctails
    cocktailsDiv.innerHTML = "<h4> Try these cocktails!</h4>"; // add a title to the cocktailsDiv to tell the user what they’re looking at.

    limitedCocktails.forEach(cocktail => { //loops through each cocktail
      const cocktailElement = document.createElement("p"); //creates a new <p> for each cocktail
      cocktailElement.textContent = cocktail.strDrink; // sets text of new <p> to be name of cocktail strDrink is the property name from the API
      cocktailsDiv.appendChild(cocktailElement); // in the div, add in the names of each cocktail
    });
  } else {
    cocktailsDiv.innerHTML = "<h4> No cocktails found</h4>"; // display this message if no cocktails found
  }
}

// Function to get random cocktails, taking cocktails and the limit of how many as parameters
function getRandomCocktails(cocktails, limit) {
  // Shuffle the array and return the first 'limit' elements
  const shuffled = cocktails.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit); //returns limited number of items from the shuffled list
}

// Event listener to show the cocktails div and fetch the list when the button is clicked
mixButton.addEventListener("click", function() {
  cocktailsDiv.style.display = "block"; // Show the cocktails div as it's initially set to display:none
  getCocktailList(); // Fetch the list of cocktails
});
