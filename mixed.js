/*
  Author: Amreet
  This is the JS file for Mixed
*/

const userIngredient = document.getElementById("ingredient");
const cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const mixButton = document.querySelector("input[type='button']");
const cocktailsDiv = document.querySelector(".cocktails");

// Function to fetch cocktails based on the selected ingredient
function getCocktailList() {
  const ingredient = userIngredient.value;
  const url = `${cocktailURL}${ingredient}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCocktails(data);
    })
    .catch(error => {
      console.error("Error fetching cocktails:", error);
    });
}

// Function to display cocktails in the cocktails div (limit to 10 random cocktails)
function displayCocktails(data) {
  if (data.drinks) {
    // Limit to 10 random cocktails
    const limitedCocktails = getRandomCocktails(data.drinks, 10);
    cocktailsDiv.innerHTML = "<h6>Here are your cocktails:</h6>";

    limitedCocktails.forEach(cocktail => {
      const cocktailElement = document.createElement("p");
      cocktailElement.textContent = cocktail.strDrink;
      cocktailsDiv.appendChild(cocktailElement);
    });
  } else {
    cocktailsDiv.innerHTML = "<p>No cocktails found for this ingredient.</p>";
  }
}

// Function to get a random selection of cocktails (up to the specified limit)
function getRandomCocktails(cocktails, limit) {
  // Shuffle the array and return the first 'limit' elements
  const shuffled = cocktails.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}

// Event listener to show the cocktails div and fetch the list when the button is clicked
mixButton.addEventListener("click", function() {
  cocktailsDiv.style.display = "block"; // Show the cocktails div
  getCocktailList(); // Fetch the list of cocktails
});
