import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; 
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        {user && <p>Nombre de usuario: <span>{user.username}</span></p>}
        <p className="profile-bio">
          ¡Bienvenido a tu página de perfil! Aquí es donde podrás ver tu información
          personal y gestionar tus configuraciones. (Funcionalidades futuras aquí).
        </p>
        <Link to="/" className="back-button">Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default Profile;