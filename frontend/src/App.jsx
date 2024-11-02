import "./App.css";
import RegisterUser from "./adminViews/RegisterUser";
import Navigator from "./components/Navigator.jsx";
import Home from "./userViews/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUser from "./adminViews/LoginUser.jsx";
import LoggedAdmin from "./adminViews/LoggedAdmin.jsx"
function App() {
  return (
    <Router>
      <Navigator />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerAdmin" element={<RegisterUser />} />
          <Route path="/loginAdmin" element={<LoginUser />} />
          <Route path="/loggedAdmin" element={<LoggedAdmin />} /> {/* Asegúrate de tener esta ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
