import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Recipies() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const recipesPerPage = 10;

    useEffect(() => {
        const fetchAll = async () => {
            let all = [];
            const letters = "abcdefghijklmnopqrstuvwxyz".split("");

            for (const letter of letters) {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
                const data = await res.json();
                if (data.meals) {
                    all = [...all, ...data.meals];
                }
            }

            all.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
            setAllRecipes(all);
            setDisplayedRecipes(all.slice(0, recipesPerPage));
            setCurrentIndex(recipesPerPage);
        };

        fetchAll();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
        ) {
            loadMore();
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const loadMore = () => {
        if (currentIndex >= allRecipes.length) return;

        const nextRecipes = allRecipes.slice(currentIndex, currentIndex + recipesPerPage);
        setDisplayedRecipes((prev) => [...prev, ...nextRecipes]);
        setCurrentIndex(currentIndex + recipesPerPage);
    };

    return (
        <div className="bigDiv">
            <h2 className="titre">Toutes les recettes <span style={{ background: "linear-gradient(to right, #f1871b, #d74921)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "900"}}>(A à Z)</span></h2>
            <p className="texte">Découvrez tous nos plats</p>
            <div className="mealCards">
                {displayedRecipes.map((meal) => (
                    <Link to={`/recipe/${meal.idMeal}`} className="card">
                        <h3>{meal.strMeal}</h3>
                        <img src={meal.strMealThumb} alt={meal.strMeal} width="150" />
                    </Link>
                ))}
                {currentIndex < allRecipes.length && <p>Chargement...</p>}
            </div>
        </div>
    );
}

export default Recipies;
