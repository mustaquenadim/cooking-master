const searchBtn = document.getElementById('search-btn');
const alert = document.getElementById('alert');

// search
searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('meal-name').value;
    if (inputMeal != '')
    {
        alert.style.display = 'block';
        getMeals(inputMeal);
    } 
    else
    {
        alert.style.display = 'none';
    }
});

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

// food items after search
const mealList = meal => {
    if (meal != null)
    {
        alert.style.display = 'none'
        meal.forEach(item => {
            let mealItem = `
            <div onclick="ingredients('${item.idMeal}')">
            <img src="${item.strMealThumb}">
            <h3>${item.strMeal}</h3>
            </div>
            `;
            let createDiv = document.createElement('div');
            createDiv.className = 'meal-item';
            createDiv.innerHTML = mealItem;
            document.getElementById('food-items').appendChild(createDiv);
            // document.getElementById('food-items').appendChild(mealItem);
        });
    }
    else
    {
        alert.style.display = 'block';
    }
};

// calling ingredients
const ingredients = (id) => {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
            console.log(data.meals[0]);
			recipeDisplay(data.meals[0]);
		});
};

// showing recipe
let recipeDisplay = (recipe) => {
    console.log('babu tomar ki hoise');
	document.getElementById('food-items').style.display = 'none';
    document.getElementById('alert').style.display = 'none';
	let ingredients = `
        <div>
            <img src="${recipe.strMealThumb}">
        </div>
        <div class="content">
            <h2>${recipe.strMeal}</h2>
            <h6>Ingredients</h6>
            <h5>+ ${recipe.strMeasure1}, ${recipe.strIngredient1}</h5>
            <h5>+ ${recipe.strMeasure2}, ${recipe.strIngredient2}</h5>
            <h5>+ ${recipe.strMeasure3}, ${recipe.strIngredient3}</h5>
            <h5>+ ${recipe.strMeasure4}, ${recipe.strIngredient4}</h5>
            <h5>+ ${recipe.strMeasure5}, ${recipe.strIngredient5}</h5>
        </div>
    `;

	let recipeDiv = document.createElement("div");
	recipeDiv.className = "ingredients";
	recipeDiv.innerHTML = ingredients;
	document.getElementById('recipe').appendChild(recipeDiv);
};

// const renderFoodInfo = (recipe) => {
//     // Get all ingredients from the object. Up to 20
//     const ingredients = [];
//     for (let i = 1; i <= 20; i++) 
//     {
//         if (recipe[`strIngredient${i}`]) 
//         {
//             ingredients.push(`${recipe.strIngredient`${i}`}` - `${recipe.strMeasure`${i}`}`);
//         }
//         else 
//         {
//             // Stop if there are no more ingredients
//             break;
//         }
//     }
//     const recipeDiv = document.getElementById('foodsDetails');
//     recipeDiv.innerHTML = `
//     <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
//     <h4>${food.strMeal}</h4>
    
//     <h5 class="pt-3 pb-2">Ingredients</h5>
//     <ul class="list-unstyled mb-0">
//     ${ingredients.map((ingredient) => <li>${ingredient}</li>).join('')}
//     </ul>
// `;
// };