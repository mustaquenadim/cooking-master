// calling API
const apiKey = '1';
var apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

const getMeals = (meals) => {
    fetch(`${apiBase}?f=${meals}`)
    fetch(`${apiBase}?s=${meals}`)
        .then(response => response.json())
        .then(data => {
            console.log('hello');
            mealList(data.meals);
        });
};

// food items after search
const mealList = meal => {
    if (meal != null)
    {
        console.log('if')
        meal.forEach(item => {
            let mealItem = `
            <div onclick="ingredients('${item.idMeal}')">
            <img src="${item.strMealThumb}">
            <h4>${item.strMeal}</h4>
            </div>
            `;
            let createDiv = document.createElement('div');
            createDiv.className = 'image-with-title';
            createDiv.innerHTML = mealItem;
            document.getElementById('meal-items').appendChild(createDiv);
        });
    }
    else
    {
        alert.style.display = 'block';
    }
};

// search
const searchBtn = document.getElementById('search-btn');
const alert = document.getElementById('alert');
const mealItems = document.getElementById('meal-items');

searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('meal-name').value;
    mealItems.innerHTML = '';
    if (inputMeal === '')
    {
        alert.style.display = 'block';
    } 
    else
    {
        alert.style.display = 'none';
        getMeals(inputMeal);
    }
});

const ingredients = (id) => {
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
            // console.log('ami kintu vitore');
            console.log(data.meals[0]);
			ingredientsDisplay(data.meals[0]);
		});
};

// 
let ingredientsDisplay = (data) => {
	// document.getElementById("meal-list").style.display = "none";
	let fullDescription = `
    <div class="card">
        <div>
            <img src="${data.strMealThumb}">
        </div>
        <div>
            <h2>${data.strMeal}</h2>
            <p>Ingredients</p>
            <h5>+ ${data.strMeasure1}, ${data.strIngredient1}</h5>
            <h5>+ ${data.strMeasure2}, ${data.strIngredient2}</h5>
            <h5>+ ${data.strMeasure3}, ${data.strIngredient3}</h5>
            <h5>+ ${data.strMeasure4}, ${data.strIngredient4}</h5>
            <h5>+ ${data.strMeasure5}, ${data.strIngredient5}</h5>
            <h5>+ ${data.strMeasure6}, ${data.strIngredient6}</h5>
            <h5>+ ${data.strMeasure7}, ${data.strIngredient7}</h5>
            <h5>+ ${data.strMeasure8}, ${data.strIngredient8}</h5>
        </div>
    </div>
    `;

    // create Div:
	let createDiv = document.createElement("div");
	createDiv.className = "Description";
	createDiv.id = "Description";
	createDiv.innerHTML = fullDescription;

	document.body.appendChild(createDiv);
};