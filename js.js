
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const recipeBtn = document.querySelector('#recipe-btn');
const mealDetailsContent = document.querySelector(".meal-detail");
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// Event Listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matchs 
function getMealList() {
    let searchInputTxt = document.getElementById('search').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(res => res.json())
    .then(data => {
        let html = '';
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div data-id="${meal.idMeal}" class="recipe-item">
                    <img src="${meal.strMealThumb}" alt="">
                    <h3 class="foodname">${meal.strMeal}</h3>
                    <a href="#" id="recipe-btn" class="recipe-btn">Get Recipe</a>
                </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    }).catch(error => console.log(error));
}


// get Meal Recipe
function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals));
    }
}


// create a Modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <button type="button" class="btn recipe-close-btn" id="reciep-close-btn">
            <i class="fas fa-times"></i>
        </button>
        <div id="title" class="title">
            <h1>${meal.strMeal}</h1>
            <p class="recipe-cata">${meal.strCategory}</p>
        </div>
        <div id="recipe-instruct" class="recipe-instruct">
            <h2>Instructions:</h2>
        </div>
        <div id="para" class="para">
            <p>${meal.strInstructions}</p>
        </div>
        <div id="meal-img" class="meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div id="video-watch" class="video-watch">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}








