import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registrar from "./pages/Registrar/Registrar"
import Registrados from "./pages/Registrados/Registrados"
import Painel from "./pages/Painel/Painel"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/registrados" element={<Registrados />} />
        <Route path="/painel" element={<Painel />} />



        {/* Adicione outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
