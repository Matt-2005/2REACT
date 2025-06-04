import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navBar">
            <div className="leftNavBar">
                <img src="/logo.png" alt="Logo SUPMEAL" className="logo"/>
            </div>
            <div className="rightNavBar">
                <Link to="/" className="nav-link">
                    Accueil
                </Link>
                <Link to="/recherche-avancee" className="nav-link">
                    Recherche avancée
                </Link>
                <SearchBar className="searchBar" />
            </div>

            
        </nav>
    );
}



export default Navbar;
