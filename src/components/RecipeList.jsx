import { useEffect, useState } from "react";

function RecipeList() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
        .then((response) => response.json())
        .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
        });
    }, []);

    return (
    <div>
        <h2>Liste des recettes avec "chicken"</h2>
        {loading ? (
        <p>Chargement...</p>
        ) : meals.length === 0 ? (
        <p>Aucune recette trouvée.</p>
        ) : (
        <ul>
            {meals.map((meal) => (
            <li key={meal.idMeal}>
                {meal.strMeal}
                <br />
                <img src={meal.strMealThumb} alt={meal.strMeal} width="150" />
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}

export default RecipeList;
