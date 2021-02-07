// calling API
const apiKey = '1';
const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';

const getMeals = (meals) => {
    fetch(`${apiBase}?f=${meals}`)
    fetch(`${apiBase}?s=${meals}`)
        .then(response => response.json())
        .then(data => {
            console.log('hambu');
            mealList(data.meals);
        });
};

// search
const searchBtn = document.getElementById('search-btn');
const alert = document.getElementById('alert');
const mealItems = document.getElementById('meal-items');

searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('meal-name').value;
    // mealItems.innerHTML = '';
    if (inputMeal === '')
    {
        console.log('hambu2');
        alert.style.display = 'block';
    } 
    else
    {
        console.log('hambu3');
        alert.style.display = 'none';
        getMeals(inputMeal);
    }
});