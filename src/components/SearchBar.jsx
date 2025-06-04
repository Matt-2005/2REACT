import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import "../pages/Home.css";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        setLoading(true);
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${value}&hasImages=true`)
            .then((res) => res.json())
            .then((data) => {
                const ids = data.objectIDs?.slice(0, 10) || [];
                const fetchDetails = ids.map(id =>
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
                );

                Promise.all(fetchDetails).then(objects => {
                    setResults(objects);
                    setLoading(false);
                });
            })
            .catch((err) => {
                console.error("Erreur API :", err);
                setResults([]);
                setLoading(false);
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher une œuvre d'art..."
                value={query}
                onChange={handleSearch}
                className="searchZone"
            />
            {query && (
                <div className="bigDiv">
                    {loading ? (
                        <p>Chargement...</p>
                    ) : results.length === 0 ? (
                        <p>Aucune œuvre trouvée.</p>
                    ) : (
                        <div className="mealCards">
                            {results.map((art) => (
                                <Link to={`/artwork/${art.objectID}`} key={art.objectID} className="card">
                                    <h3>{art.title}</h3>
                                    <img src={art.primaryImageSmall} alt={art.title} width="150" />
                                    <p>{art.artistDisplayName || "Artiste inconnu"}</p>
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
