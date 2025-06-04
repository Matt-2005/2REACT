import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=*")
            .then((res) => res.json())
            .then((data) => {
                const ids = data.objectIDs.slice(0, 50);
                const fetchDetails = ids.map((id) =>
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((res) => res.json())
                );
                Promise.all(fetchDetails).then((objects) => {
                    const withImages = objects.filter(obj => obj.primaryImageSmall);
                    setArtworks(withImages.slice(0, 12));
                    setLoading(false);
                });
            });
    }, []);

    return (
        <div className="bigDiv">
            <h1 className="titre">
                Bienvenue sur{" "}
                <span
                    style={{
                        color: "#eb032a",
                    }}
                >
                    The Met Museum Explorer
                </span>
            </h1>

            <p className="texte">Découvrez des œuvres d’art du Met Museum !</p>

            <h2 className="sousTitre">Sélection du musée :</h2>
            {loading ? (
                <p>Chargement des œuvres...</p>
            ) : (
                <div className="mealCards">
                    {artworks.map((art) => (
                        <Link to={`/artwork/${art.objectID}`} className="card" key={art.objectID}>
                            <img src={art.primaryImageSmall} alt={art.title} />
                            <h3>{art.title}</h3>
                            <p>{art.artistDisplayName || "Artiste inconnu"}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
