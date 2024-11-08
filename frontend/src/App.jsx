import "./App.css";
import Navigator from "./components/Navigator.jsx";
import Home from "./userViews/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedAdmin from "./adminViews/LoggedAdmin.jsx";
import LoggedAdmon from "./adminViews/LoggedAdmon.jsx"; // Importa la vista de admon
import AdminInventory from "./adminViews/AdminInventory.jsx"; // Importa la vista del inventario
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterUser from "./adminViews/RegisterUser.jsx";
import AcudeRegister from "./adminViews/AcudeRegister.jsx";
import AcudeInventory from "./adminViews/AcudeInventory.jsx";
import RecommendationSystem from "./components/Recommendations.jsx";
// import Recommendations from "./components/Recommendations.jsx";
function App() {
    return (
        <Router>
          <div className="navigator-container">
          <Navigator />
          </div>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/recommendations" element={<Recommendations />} />  */}
                <Route path="/recommendations" element={<RecommendationSystem />} />
                <Route
                    path="/acudeRegister"
                    element={
                        <ProtectedRoute roles={['admin','admon']}>
                            <AcudeRegister /> 
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/acudeInventory"
                    element={
                        <ProtectedRoute roles={['admin','admon']}>
                            <AcudeInventory /> 
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/loggedAdmin"
                    element={
                        <ProtectedRoute roles={['admin']}>
                            <LoggedAdmin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/loggedAdmon"
                    element={
                        <ProtectedRoute roles={['admon']}>
                            <LoggedAdmon />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/adminInventory"
                    element={
                        <ProtectedRoute roles={['admon']}>
                            <AdminInventory />
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/registerAdmin"
                    element={
                        <ProtectedRoute roles={['admon']}>
                            <RegisterUser />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
