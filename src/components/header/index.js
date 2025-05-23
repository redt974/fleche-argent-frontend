import React, { useState, useEffect, useContext } from "react";
import "./css/index.css";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from '../../authentification/AuthContext';
import Deconnexion from "../../authentification/deconnexion";

function Header() {
  const { auth } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // État pour le menu de gauche
  const [scrolled, setScrolled] = useState(false);

  // Fonction pour afficher/masquer la liste déroulante (bouton "Réserver")
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Fonction pour afficher/masquer le menu de gauche
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    const navbarMenuIcon = document.querySelector(".navbar-menu-icon");
    navbarMenuIcon.classList.toggle("active", !isMenuOpen); // Ajoute ou retire la classe active
  };

  // Fonction de gestion du scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true); // Ajouter la classe scrolled si l'utilisateur a fait défiler
    } else {
      setScrolled(false); // Retirer la classe scrolled si l'utilisateur est en haut de la page
    }
  };

  useEffect(() => {
    // Ajout de l'écouteur d'événement scroll
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        {/* Menu déroulant à gauche */}
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          {isMenuOpen && (
            <div className="dropdown">
              <ul>
                <li>
                  <Link to="/">Accueil</Link> {/* Ajout du lien Accueil */}
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/avis">Avis</Link>
                </li>
                {auth.token ? (
                  <>
                    <li>
                      <Link to="/user">Mon espace</Link>
                    </li>
                    {auth.user && auth.user.isAdmin ? (
                      <>
                        <li >
                          <Link to="/admin">Admin</Link>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <Deconnexion />
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/connexion" >Mon espace</Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <Link to="/" style={{ textDecoration: "none" }}>
          {/* Logo avec texte */}
          <div className="navbar-logo">
            <img src={logo} alt="La Flèche d'Argent" />
            <div className="navbar-logo-text">
              La Flèche d'Argent
              <br />
              <span className="navbar-logo-subtext">Bordeaux</span>
            </div>
          </div>
        </Link>

        {/* Bouton à droite */}
        <div className="navbar-button">
          <button onClick={toggleDropdown}>Reserver</button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="/chambres">Hôtel</Link>
                </li>
                <li>
                  <Link to="/restaurant">Table</Link>
                </li>
                <li>
                  <Link to="/spa-massage">Spa & Massage</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
