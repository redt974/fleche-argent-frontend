import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "./AuthContext";
import { validateLoginForm } from "./validation";
import MiddlewareAuth from "./middleware";
import { jwtDecode } from "jwt-decode";
import Google from "../components/google";
import "./connexion.css";

function Connexion() {
  // Rediriger si l'utilisateur est déjà connecté
  MiddlewareAuth();

  // Utilisation du contexte AuthContext pour accéder à la fonction de connexion
  const { login } = useContext(AuthContext);

  // États locaux pour gérer les données du formulaire, les messages d'erreur et d'alerte
  const [formData, setFormData] = useState({
    email: "",
    mot_de_passe: "",
    rememberMe: false, // Ajout de l'option "Rester connecté"
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // Nouveau state pour gérer les alertes de nouvelle connexion

  // Hook useNavigate pour naviguer entre les pages
  const navigate = useNavigate();

  // Référence pour le reCAPTCHA
  const recaptcha = useRef(null);

  // Fonction pour gérer les changements dans les champs de saisie
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour gérer les changements dans la case à cocher "Rester connecté"
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  // Fonction pour gérer le clic sur la case à cocher "Rester connecté"
  const handleClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rememberMe: !prevFormData.rememberMe,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des données du formulaire
    const validationError = validateLoginForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Vérification du reCAPTCHA
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      setError("Veuillez vérifier le reCAPTCHA!");
      return;
    }

    try {
      // Appel de la fonction de connexion avec les données du formulaire et la valeur du reCAPTCHA
      const response = await login({ ...formData, captchaValue });
      const token = localStorage.getItem("token"); // Récupérer le token
      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken?.isAdmin || false; // Vérifier si l'utilisateur est admin
      if (response && response.message === "Nouvelle Connexion Détectée") {
        // Si le backend détecte une nouvelle connexion, informer l'utilisateur
        setAlertMessage(
          "Une nouvelle connexion a été détectée. Un email vous a été envoyé pour confirmer."
        );
      } else if (isAdmin) {
        navigate("/admin"); // Redirection vers la page d'accueil en cas de succès
      } else {
        navigate("/user");
      }
    } catch (error) {
      setMessage("");
      setError(error?.message || "Une erreur inconnue est survenue."); // Gestion des erreurs
    }
  };

  return (
    <div className="formauth">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            tabIndex={1}
            autoFocus
            autoCapitalize="none"
            spellCheck="false"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="mot_de_passe"
            autoComplete="off"
            tabIndex={2}
            autoCapitalize="none"
            spellCheck="false"
            placeholder="Mot de passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            required
          />
        </div>

        <Link to="/motdepasse_oublie">Mot de passe oublié ?</Link>

        <div className="rememberMe" onClick={handleClick}>
          <input
            type="checkbox"
            name="rememberMe"
            tabIndex={3}
            checked={formData.rememberMe}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="rememberMe">Rester connecté</label>
        </div>

        <div className="recaptcha-wrapper">
          <ReCAPTCHA
            ref={recaptcha}
            tabIndex={4}
            sitekey={process.env.REACT_APP_CAPTCHA_KEY}
          />
        </div>

        <button type="submit" tabIndex={5}>
          Se connecter
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {alertMessage && <p className="alert-message">{alertMessage}</p>}

      <div className="switch-page">
        <p>Vous n'avez pas de compte ?</p>
        <Link to="/inscription">Inscription</Link>
      </div>

      <div className="divider-wrapper">
        <span className="divider">ou</span>
      </div>

      <Google />

      <div className="juridique">
        <Link to="/condition-d-utilisation">Condition d'Utilisation</Link>
        <p>|</p>
        <Link to="/politique-de-confidentialite">
          Politique de confidentialité
        </Link>
      </div>
    </div>
  );
}

export default Connexion;
