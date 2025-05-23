import React, { useEffect } from "react";
import "./css/index.css";
import introVideo from "./videos/intro-video.mp4";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import { Link } from "react-router-dom";

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

function Accueil() {
  useScrollAnimation(); // Activation du hook


  return (
    <div>
      {/* Vidéo d'introduction */}
      <video
        className="intro-video"
        src={introVideo}
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "auto", pointerEvents: "none" }}
      />

      {/* Bannière de bienvenue */}
      <div className="banner">
        Bienvenue à l'Hôtel La Flèche d'Argent - Votre confort, notre priorité.

      </div>

      {/* Conteneur principal */}
      <div className="content-container">
        {/* Section 1 : Texte à gauche, Image à droite */}
        <div className="content-div scroll-animation scroll-animation-left">
          <div className="text-content">
            <h1 className="text-title">
              LA <br /> RENAISSANCE D'UNE LEGENDE ART DECO
            </h1>
            <h3 className="text-subtitle">
              APRES PLUS DE SEPT ANS DE RENOVATION,
            </h3>
            <p className="text-paragraph">
              Le lobby et les espaces de restauration ont été entièrement
              rénovés en respectant fidèlement l'esthétique de l'art déco.
              Inspiré par le glamour des paquebots transatlantiques des années
              30, notre style vous transporte dans une époque de grandeur et de
              sophistication, offrant une expérience élégante et raffinée,
              unique à Bordeaux.
              <br />
              <br />
              Au-delà du simple séjour, nous vous invitons à vivre une
              expérience inédite, une plongée dans le faste et le chic de cette
              période révolue.
              <br />
              <br />
              L’hôtel La Flèche d'Argent, se situe rue des Quinconces, face au
              Jardin Public et à proximité de la Place de la Bourse ainsi que de
              la rue Sainte-Catherine. Il célèbre l'héritage des majestueux
              hôtels particuliers qui ont marqué le paysage du XIXe siècle.
            </p>
          </div>
          <div className="image-content">
            <img src={image1} alt="Description 1" />
          </div>
        </div>

        {/* Section 2 : Image à gauche, Texte à droite */}
        <div className="content-div reverse scroll-animation scroll-animation-right">
          <div className="image-content">
            <img src={image2} alt="Chambres" />
          </div>
          <div className="text-content">
            <h1 className="text-title">Nos Chambres</h1>
            <h3 className="text-subtitle">Confort et Élégance</h3>
            <p className="text-paragraph">
              Chaque chambre de l'Hôtel La Flèche d'Argent est un havre de paix
              et de confort, pensée pour offrir une expérience unique à nos
              clients. Profitez d'un design raffiné, alliant modernité et
              éléments d'Art Déco pour une atmosphère chaleureuse et intime.
            </p>
            <Link to="/chambres" style={{ textDecoration: "none" }} className="btn-accueil">Découvrir nos chambres</Link>
          </div>
        </div>

        {/* Section 3 : Texte à gauche, Image à droite */}
        <div className="content-div scroll-animation scroll-animation-left">
          <div className="text-content">
            <h1 className="text-title">Restauration</h1>
            <h3 className="text-subtitle">Saveurs et Élégance</h3>
            <p className="text-paragraph">
              Dans notre espace de restauration, chaque repas devient une
              expérience culinaire d'exception. Avec des plats raffinés préparés
              à partir des meilleurs produits locaux, notre chef et son équipe
              vous réservent une aventure gustative à la hauteur de vos
              attentes.
            </p>
            <Link to="/restaurant" style={{ textDecoration: "none" }} className="btn-accueil">Découvrir notre restaurant</Link>
          </div>
          <div className="image-content">
            <img src={image3} alt="Restauration" />
          </div>
        </div>

        {/* Section 4 : Image à gauche, Texte à droite */}
        <div className="content-div reverse scroll-animation scroll-animation-right">
          <div className="image-content">
            <img src={image4} alt="Salon de Massage" />
          </div>
          <div className="text-content">
            <h1 className="text-title">Le Salon de Massage</h1>
            <h3 className="text-subtitle">Détente et Bien-être</h3>
            <p className="text-paragraph">
              Offrez-vous un moment de détente absolue dans notre salon de
              massage, où des soins personnalisés vous attendent. Que ce soit
              pour un massage relaxant ou un soin plus ciblé, vous ressortirez
              totalement ressourcé.
            </p>
            <Link to="/spa-massage" style={{ textDecoration: "none" }} className="btn-accueil">Découvrir le spa</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
