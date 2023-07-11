import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LandingNavbar from "./components/LandingNavbar";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AboutPage from "./pages/AboutPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {!user && <LandingNavbar />}
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
