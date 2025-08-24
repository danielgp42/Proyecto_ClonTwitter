import React, {useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; 
import "./Home.css";

const Home = () => {
  const { user, logout, tweets, addTweet } = useContext(AuthContext);
  const [newTweetText, setNewTweetText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handlePostTweet = (e) => {
    e.preventDefault();
    if (newTweetText.trim()) {
      addTweet(newTweetText);
      setNewTweetText(""); 
    } else {
      alert("El tweet no puede estar vacío.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenido a Twitter</h1>
        {user && (
          <div className="user-info">
            <p>Hola, {user.username}!</p>
            <div className="home-buttons">
              <Link to="/profile" className="button profile-button">Ver Perfil</Link>
              <button onClick={logout} className="button logout-button">Cerrar Sesión</button>
            </div>
          </div>
        )}
      </div>

      {user && (
        <div className="tweet-section">
          <h2>Publicar Nuevo Tweet</h2>
          <form onSubmit={handlePostTweet} className="tweet-form">
            <textarea
              placeholder="¿Qué está pasando?"
              value={newTweetText}
              onChange={(e) => setNewTweetText(e.target.value)}
              maxLength="280" // Límite de caracteres como en Twitter
            ></textarea>
            <button type="submit">Tweet</button>
          </form>

          <h2>Tweets Recientes</h2>
          <div className="tweets-list">
            {tweets.length === 0 ? (
              <p className="no-tweets-message">Aún no hay tweets. ¡Sé el primero en publicar!</p>
            ) : (
              tweets.map((tweet) => (
                <div key={tweet.id} className="tweet-card">
                  <p className="tweet-username">@{tweet.username}</p>
                  <p className="tweet-text">{tweet.text}</p>
                  <p className="tweet-timestamp">{tweet.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;