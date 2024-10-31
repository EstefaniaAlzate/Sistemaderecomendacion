import "./App.css";
import RegisterUser from "./components/RegisterUser";
import Navigator from "./components/Navigator.jsx"
import Home from "./userViews/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return <>
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerAdmin" element={<RegisterUser />} />
        </Routes>
      </Router>
    </div>
  </>
}

export default App;
