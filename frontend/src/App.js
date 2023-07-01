import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <RegisterPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        {/* <Route
          path="/friends"
          element={user ? <Friends /> : <Register />}
        /> */}
        {/* <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
