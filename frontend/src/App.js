import './index.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RootPage from './pages/RootPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/root" element={<RootPage />} />
      </Routes>
    </div>
  );
}

export default App;
