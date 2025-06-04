import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";

function RecipePage() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            setMeal(data.meals[0]);
        });
    }, [id]);

    if (!meal) return <p>Chargement...</p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
        }
    }

    let youtubeEmbedUrl = null;
    if (meal.strYoutube) {
        youtubeEmbedUrl = meal.strYoutube.replace("watch?v=", "embed/");
    }

    return (
        <div className="bigDivContainer">
            <div className="bigDivRecipe">
                <div className="leftDiv">
                    <h2>{meal.strMeal}</h2>
                    <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
                    <p><strong>Catégorie :</strong> {meal.strCategory}</p>
                    <p><strong>Origine :</strong> {meal.strArea}</p>
                    <h3>Ingrédients</h3>
                    <ul>
                        {ingredients.map((item, index) => (
                        <li key={index}>
                            {item.ingredient} - {item.measure}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="rightDiv">
                    <h3>Instructions</h3>
                    <p>{meal.strInstructions}</p>
                    {youtubeEmbedUrl && (
                        <>
                        <h3>Vidéo</h3>
                        <iframe
                            width="560"
                            height="315"
                            src={youtubeEmbedUrl}
                            title="Vidéo de préparation"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: "10px", marginTop: "10px" }}
                        ></iframe>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
