import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AdvancedSearch from "./pages/AdvancedSearch";
import OeuvreDetails from "./pages/OeuvreDetails";
import "./App.css"; // Assure-toi d'importer ton CSS global

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche-avancee" element={<AdvancedSearch />} />
            <Route path="/artwork/:id" element={<OeuvreDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
