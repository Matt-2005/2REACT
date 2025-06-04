import { useEffect, useState } from "react";
import "./Home.css";
import "./AdvancedSearch.css";

function AdvancedSearch() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [selectedArtist, setSelectedArtist] = useState("");

    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
            .then(res => res.json())
            .then(data => setDepartments(data.departments));
    }, []);

    const handleSearch = () => {
        if (!selectedDepartment) return;

        setLoading(true);
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${selectedDepartment}`)
            .then(res => res.json())
            .then(data => {
                const ids = data.objectIDs?.slice(0, 100) || [];
                const fetchDetails = ids.map(id =>
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
                );

                Promise.all(fetchDetails).then(objects => {
                    let filtered = objects.filter(obj => obj.primaryImageSmall);

                    if (selectedPeriod) {
                        const year = parseInt(selectedPeriod);
                        filtered = filtered.filter(obj => obj.objectBeginDate <= year && obj.objectEndDate >= year);
                    }

                    if (selectedArtist) {
                        filtered = filtered.filter(obj =>
                            obj.artistDisplayName.toLowerCase().includes(selectedArtist.toLowerCase())
                        );
                    }

                    setArtworks(filtered.slice(0, 20));
                    setLoading(false);
                });
            });
    };

    return (
        <div className="bigDiv">
            <h2 className="titre">Recherche avancée</h2>

            <div className="selecteurs">
                <select onChange={(e) => setSelectedDepartment(e.target.value)} className="monSelecteur">
                    <option value="">-- Département --</option>
                    {departments.map(dep => (
                        <option key={dep.departmentId} value={dep.departmentId}>{dep.displayName}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Année (ex : 1500)"
                    className="monSelecteur"
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nom de l'artiste"
                    className="monSelecteur"
                    onChange={(e) => setSelectedArtist(e.target.value)}
                />

                <button onClick={handleSearch} className="monBouton">Rechercher</button>
            </div>

            {loading ? (
                <p>Chargement des œuvres...</p>
            ) : artworks.length === 0 ? (
                <p>Aucune œuvre trouvée.</p>
            ) : (
                <div className="mealCards">
                    {artworks.map((art) => (
                        <div className="card" key={art.objectID}>
                            <h4>{art.title}</h4>
                            <img src={art.primaryImageSmall} alt={art.title} />
                            <p>{art.artistDisplayName || "Artiste inconnu"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdvancedSearch;
