import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import "./App.css";

export const AuthContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  // Cargar usuario y tweets desde localStorage al inicio
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar el usuario de localStorage:", error);
      localStorage.removeItem("user");
    }

    try {
      const storedTweets = localStorage.getItem("tweets");
      if (storedTweets) {
        setTweets(JSON.parse(storedTweets));
      }
    } catch (error) {
      console.error("Error al cargar los tweets de localStorage:", error);
      localStorage.removeItem("tweets");
    }
  }, []);

  // Función para iniciar sesión
  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Función para añadir un tweet
  const addTweet = (tweetText) => {
    if (!user) {
      alert("Debes iniciar sesión para publicar un tweet.");
      return;
    }
    const newTweet = {
      id: Date.now(),
      username: user.username,
      text: tweetText,
      timestamp: new Date().toLocaleString(),
    };
    const updatedTweets = [newTweet, ...tweets]; 
    setTweets(updatedTweets);
    localStorage.setItem("tweets", JSON.stringify(updatedTweets));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, tweets, addTweet }}>
      <Router>
        <div className="app-container"> {/* Contenedor principal para estilos globales */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" replace />}
            />
            {/* Redirigir cualquier otra ruta desconocida a la página principal */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;