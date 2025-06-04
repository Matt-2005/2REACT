import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Recipies from "./pages/10Recipies";
import AdvancedSearch from "./pages/AdvancedSearch";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <Router>
      <div style={{ padding: "25px", backgroundImage: 'url("/background.jpeg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '25px'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recettes" element={<Recipies/>} />
          <Route path="/recherche-avancee" element={<AdvancedSearch/>} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
