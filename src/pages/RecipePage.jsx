import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";

function RecipePage() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);

    useEffect(() => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then((res) => res.json())
            .then((data) => setArtwork(data));
    }, [id]);

    if (!artwork) return <p>Chargement...</p>;

    return (
        <div className="bigDivContainer">
            <div className="bigDivRecipe">
                <div className="leftDiv">
                    <h2>{artwork.title}</h2>
                    {artwork.primaryImage && (
                        <img src={artwork.primaryImage} alt={artwork.title} width="300" />
                    )}
                    <p><strong>Artiste :</strong> {artwork.artistDisplayName || "Inconnu"}</p>
                    <p><strong>Département :</strong> {artwork.department}</p>
                    <p><strong>Date :</strong> {artwork.objectDate}</p>
                    <p><strong>Culture :</strong> {artwork.culture}</p>
                    <p><strong>Matériaux :</strong> {artwork.medium}</p>
                </div>

                <div className="rightDiv">
                    <h3>Description</h3>
                    <p>{artwork.creditLine || "Aucune description disponible."}</p>

                    {artwork.objectURL && (
                        <>
                            <h3>Voir sur le site du Met</h3>
                            <a
                                href={artwork.objectURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#f1871b", fontWeight: "bold" }}
                            >
                                Consulter la fiche officielle
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
