
const searchBtn = document.getElementById('search-btn');
const recipeItem = document.querySelector('#recipe-item');
const recipeBtn = document.querySelector('#recipe-btn');
const mealDetail = document.querySelector("#meal-detail");
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// Event Listener
searchBtn.addEventListener("click", getMealList);

// get meal list that matchs 
function getMealList() {
    let searchInputTxt = document.getElementById('search').value.trim();
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=egg")
    .then((res) => {res.json()})
        .then ((data) => {console.log(data);})
        .catch ((error) => {console.log(error);})
}
