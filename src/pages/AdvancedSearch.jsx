import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./AdvancedSearch.css";



function AdvancedSearch() {
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);

    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
            .then(res => res.json())
            .then(data => setIngredients(data.meals || []));

        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
            .then(res => res.json())
            .then(data => setCategories(data.meals || []));

        fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            .then(res => res.json())
            .then(data => setAreas(data.meals || []));
    }, []);

    const handleSearch = () => {
        let url = "";

        if (selectedIngredient) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
        } else if (selectedCategory) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (selectedArea) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
        } else {
        return;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setMeals(data.meals || []));
    };

    return (
        <div className="bigDiv">
            <h2 className="titre">Recherche avancée</h2>

            <div className="selecteurs">
                <select onChange={(e) => setSelectedIngredient(e.target.value)} className="monSelecteur">
                    <option value="">-- Ingrédient --</option>
                    {ingredients.map((ing) => (
                        <option key={ing.strIngredient} value={ing.strIngredient}>
                        {ing.strIngredient}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedCategory(e.target.value)} className="monSelecteur">
                    <option value="">-- Catégorie --</option>
                    {categories.map((cat) => (
                        <option key={cat.strCategory} value={cat.strCategory}>
                        {cat.strCategory}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedArea(e.target.value)} className="monSelecteur">
                    <option value="">-- Zone géographique --</option>
                    {areas.map((area) => (
                        <option key={area.strArea} value={area.strArea}>
                        {area.strArea}
                        </option>
                    ))}
                </select>

                <button onClick={handleSearch} className="monBouton">Rechercher</button>
            </div>

            <div>
                {meals.length === 0 ? (
                <p>Aucune recette trouvée.</p>
                ) : (
                <div className="mealCards">
                    {meals.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} className="card">
                        <h4>{meal.strMeal}</h4>
                        <img src={meal.strMealThumb} alt={meal.strMeal} width="100%" />
                    </Link>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default AdvancedSearch;
