import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isAuth, setIsAuth] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("accessToken");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsAuth(true);
      if (location.pathname === "/register") {
        navigate("/");
      }
    } else {
      setIsAuth(false);
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/register");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/" element={isAuth ? <Home /> : <Register />} />
    </Routes>
  );
}

export default App;
