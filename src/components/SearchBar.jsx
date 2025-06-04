import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import "../pages/Home.css";


function SearchBar() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);

    const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
        setMeals([]);
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        .then((res) => res.json())
        .then((data) => {
            setMeals(data.meals || []);
        })
        .catch((err) => {
            console.error("Erreur API :", err);
            setMeals([]);
        });
    };

    return (
    <div>
        <input type="text" placeholder="Rechercher une recette..." value={query} onChange={handleSearch} className="searchZone"/>
        {query && (
            <div className="bigDiv">
            {meals.length === 0 ? (<p>Aucune recette trouvée.</p>) : (
                <div className="mealCards">
                {meals.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal}  className="card">
                    <h3>{meal.strMeal}</h3>
                    <img src={meal.strMealThumb} alt={meal.strMeal} width="150" />
                    </Link>
                ))}
                </div>
            )}
            </div>
        )}
    </div>

    );
}

export default SearchBar;
