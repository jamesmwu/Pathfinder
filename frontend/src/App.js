import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={user ? <HomePage /> : <LandingPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <RegisterPage />}
      />
    </Routes>
  );
}

export default App;

