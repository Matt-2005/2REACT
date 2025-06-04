import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
        });
    }, []);

    return (
    <div className="bigDiv">
        <h1 className="titre"> Bienvenue sur <span style={{ background: "linear-gradient(to right, #f1871b, #d74921)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "900"}}>SUPMEAL</span></h1>

        <p className="texte">Explorez des centaines de recettes du monde entier !</p>

        <h2 className="sousTitre">Catégories populaires :</h2>
        {loading ? (
            <p>Chargement des catégories...</p>
        ) : (
        <div className="mealCards">
            {categories.map((cat) => (
            <div className="card">
                <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                <h3>{cat.strCategory}</h3>
                <p>{cat.strCategoryDescription.slice(0, 80)}...</p>
            </div>
            ))}
        </div>
        )}
    </div>
    );
}

export default Home;
