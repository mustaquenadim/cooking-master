const alert = document.getElementById('alert');

// search for meal
let searchFoodRecipe = () => {
    const inputMeal = document.getElementById('meal-name').value;
    if (inputMeal != '')
    {
        getMeals(inputMeal);
    } 
    else
    {
        alert.style.display = 'block';
    }
};

const apiKey = '1';
var apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

// calling API
const getMeals = (meals) => {
    fetch(`${apiBase}?s=${meals}`)
        .then(response => response.json())
        .then(data => {
            mealList(data.meals);
        });
};

const foodItems = document.getElementById('food-items');

// food items after search
const mealList = meal => {
    if (meal != null)
    {
        alert.style.display = 'none'
        meal.forEach(item => {
            let mealItem = `
            <div class="meal-item" onclick="ingredients('${item.idMeal}')">
            <img src="${item.strMealThumb}">
            <h3>${item.strMeal}</h3>
            </div>
            `;
            foodItems.innerHTML += mealItem;
        });
    }
    else
    {
        alert.style.display = 'block';
    }
};

// calling ingredients
const ingredients = (id) => {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then(response => response.json())
		.then(data => {
			recipeDisplay(data.meals[0]);
		});
};

// showing recipe
const recipeDisplay = (recipe) => {
    document.getElementById('search').style.display = 'none';
    foodItems.style.display = 'none';
    alert.style.display = 'none';
    const ingredients = [];
    for (let i = 1; i <= 20; i++) 
    {
        if (recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`])
        {
            ingredients[i] = `${recipe[`strMeasure${i}`]}, ${recipe[`strIngredient${i}`]}`;
        }
        else 
        {
            break;
        }
    }
    const recipeDiv = `
        <div class="ingredients">
            <div>
                <img src="${recipe.strMealThumb}">
            </div>
            <div class="content">
                <h2>${recipe.strMeal}</h2>
                <h6>Ingredients</h6>
                <ul>
                    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    document.getElementById('recipe').innerHTML = recipeDiv;
};