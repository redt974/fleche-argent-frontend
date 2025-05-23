import React, { useState, useEffect, useCallback} from "react";
import "./css/index.css";
import restaurantVideo from "./videos/restaurant1.mp4";
import slideImage1 from "./images/slide-image.jpg";
import slideImage2 from "./images/slide-image2.jpg";
import slideImage3 from "./images/slide-image3.jpg";
import slideImage4 from "./images/slide-image4.jpg";
import slideImage6 from "./images/slide-image6.jpeg";
import chef from "./images/chef.jpg";
import sommellerie from "./images/sommellerie.jpg";
import BookingCalendar from "../../components/calendrier";

function Restauration() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    slideImage1,
    slideImage2,
    slideImage3,
    slideImage4,
    slideImage6,
  ];

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [nextImage]);

  return (
    <div>
      <div className="rest-banner">
        <video className="rest-video" autoPlay loop muted>
          <source src={restaurantVideo} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        {/* <h1 className="rest-banner-title">Restaurant & Bar</h1> */}
      </div>

      <div className="rest-content">
        <div className="rest-description">
          <p>
            La Flèche d'Argent apporte un souffle nouveau à la scène culinaire
            bordelaise et redéfinit l'expérience gastronomique dans un cadre
            élégant et chaleureux...
          </p>
          <p>
            Dans l’assiette, les saveurs évoluent au gré des saisons, mettant en
            avant les produits locaux de qualité supérieure...
          </p>
        </div>

        <div className="rest-button-container">
          <BookingCalendar />
        </div>

        <div className="rest-card">
          <h2 className="rest-card-title">Nos Menus</h2>
          <p className="rest-card-content">
            Découvrez nos sélections exclusives de boissons et de plats préparés
            par nos chefs pour vous offrir une expérience inoubliable.
          </p>
          <div className="rest-card-buttons">
            <a
              href="https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/67571ce6429f81d0e434b9b4_good%20menu%20site%20%2B%20duve.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rest-card-button left"
            >
              Consulter la carte du bar
            </a>
            <a
              href="https://cdn.prod.website-files.com/5faeb38cb5f86ba2c2288cd3/6745c8464fae0a06dcc71206_Room%20Service%20Menu%20HDC-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rest-card-button right"
            >
              Consulter la carte du room service
            </a>
          </div>

          <div className="rest-slider">
            <div
              className="rest-slider-images"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="rest-slider-image"
                />
              ))}
            </div>
            <div className="rest-slider-buttons">
              <button className="rest-slider-button" onClick={prevImage}>
                &#10094;
              </button>
              <button className="rest-slider-button" onClick={nextImage}>
                &#10095;
              </button>
            </div>
          </div>

          <div className="rest-hours">
            <h3>Horaires</h3>
            <div className="rest-hours-item">
              <strong>Petit-déjeuner</strong>
              <p>De 6h30 à 10h en semaine</p>
              <p>De 6h30 à 10h30 le week-end</p>
              <p>Peut être servi en terrasse</p>
              <p>Possibilité d'emporter votre petit-déjeuner</p>
            </div>
            <div className="rest-hours-item">
              <strong>Déjeuner / Dîner</strong>
              <p>
                Le restaurant est ouvert tous les jours pour le déjeuner et le
                dîner de 12h à 22h.
              </p>
            </div>
            <div className="rest-hours-item">
              <strong>Bar</strong>
              <p>10h – 2h toute la semaine</p>
            </div>
          </div>
        </div>

        <div className="rest-team">
          <div className="rest-team-chef">
            <div className="rest-team-text">
              <h4>Sanji Vinsmoke</h4>
              <h5>Chef cuisinier</h5>
              <p>
              Sanji Vinsmoke est un chef cuisinier d'exception, reconnu pour sa
                maîtrise inégalée des recettes traditionnelles et modernes. Sa passion
                pour la cuisine est inébranlable, et il puise dans ses voyages à
                travers le monde pour offrir à ses convives une expérience gastronomique
                unique. En alliant des techniques modernes à des saveurs authentiques,
                il crée des plats qui enchantent les papilles et éveillent les sens. Son
                obsession pour la qualité des ingrédients et son souci du détail font de
                chaque repas une aventure culinaire inoubliable.
              </p>
            </div>
            <img
              src={chef}
              alt="Chef Sanji Vinsmoke"
              className="rest-team-image"
            />
          </div>
          <div className="rest-team-somm">
            <div className="rest-team-text">
              <h4>Edward Newgate</h4>
              <h5>Directeur de la Sommellerie</h5>
              <p>
              Edward Newgate est un sommelier d'exception, passionné par l'art de
                sélectionner les meilleurs crus pour accompagner les plats raffinés.
                Avec plus de 20 ans d'expérience dans le domaine de la sommellerie,
                Edward a acquis une connaissance approfondie des vins, des terroirs et
                des accords mets-vins. Son objectif est d'offrir aux invités une expérience
                sensorielle complète, où chaque gorgée de vin complète parfaitement les
                saveurs des plats. Son expertise et sa passion pour l'univers du vin font
                de lui une référence dans le domaine, et chaque repas qu'il soigne de ses
                choix devenant un véritable voyage gustatif.
              </p>
            </div>
            <img
              src={sommellerie}
              alt="Edward Newgate"
              className="rest-team-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restauration;
