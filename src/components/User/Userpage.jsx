import React, { useEffect, useState } from "react";
import "../../pages/Accueil/css/index.css";
import MiddlewareAuth from "../../authentification/middleware";
import UserReserve from "./Usereservation.jsx";
import UpdateUserForm from "./Userinfo.jsx";
import { Link } from "react-router-dom";
import "./Userpage.css";

// Hook pour gérer les animations au défilement
function useScrollAnimation() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-animation");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifie une fois au chargement
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

function User() {
  MiddlewareAuth();

  useScrollAnimation(); // Activation du hook

  const [activeSection, setActiveSection] = useState("Accueil");

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      {/* Boutons pour changer de section */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="navigation-buttons navigation-buttons-top">
        <Link className="btn-nav" style={{ textDecoration: "none", textTransform: "uppercase"}} to="/">
          Accueil
        </Link>
        <button className="btn-nav" onClick={() => setActiveSection("Reservation")}>
          Mes Réservations
        </button>
        <button className="btn-nav" onClick={() => setActiveSection("InfoPerso")}>
          Mes Informations Personnelles
        </button>
      </div>

      {/* Sections dynamiques */}
      <div>
        {activeSection === "Reservation" && (
          <>
            <br />
            <br />
            <br />
            <div className="Reservation">
              <h1>Mes Réservations</h1>
              <UserReserve />
            </div>
            <br />
            <br />
            <br />
          </>

        )}

        {activeSection === "InfoPerso" && (
          <>
            <br />
            <br />
            <br />
            <div className="InfoPerso">
              <h1>Mes Informations Personnelles</h1>
              <UpdateUserForm />
            </div>
            <br />
            <br />
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default User;
