import React from "react";
import "./index.css";
import spa1 from "./images/spa1.png";
import spa2 from "./images/spa2.png";
import ReservationApp from "../../components/calendrier";
 
const Massage = () => {
  return (
    <div className="massage-container">
      <div className="spa-suite-container">
        <div style={{ position: "relative" }}>
          <h1 className="spa-header">La suite bien-être</h1>
          <img src={spa1} alt="Spa" className="spa-image-reduced" />
        </div>
 
        <div className="spa-text-container">
          <p className="spa-content">
            Nous vous informons que le spa de l’Hôtel du Collectionneur Paris  
            ferme ses portes pour se refaire une beauté et vous accueillir  
            au printemps 2025 dans un nouveau cadre magnifique et élégant.
          </p>
          <p className="spa-content">
            Pendant cette période de rénovation, vous pourrez retrouver nos  
            soins signatures et notre salle de sport dans nos espaces éphémères  
            dédiés.
          </p>
        </div>
 
        <div className="spa-rectangle-container">
          <div className="spa-rectangle">
            <p>
              Laissez-vous tenter par un gommage corps en cabine, un soin exfoliant
              qui élimine les impuretés et révèle la douceur naturelle de votre peau.
              Offrez-vous une pause bien-être et un teint éclatant grâce à ce rituel
              délicat et apaisant.
            </p>
          </div>
          <div className="spa-rectangle">
            <p>
              Découvrez l’art du lâcher-prise avec un massage relaxant aux huiles
              essentielles. Ce soin associe des gestes doux et des arômes apaisants
              pour dissiper le stress et nourrir votre corps et votre esprit en profondeur.
            </p>
          </div>
          <div className="spa-rectangle">
            <p>
              Boostez votre vitalité avec un massage tonique, une expérience énergisante
              qui redynamise vos muscles et réveille vos sens. Idéal pour retrouver
              tonus et légèreté après une journée bien remplie.
            </p>
          </div>
          <div className="spa-rectangle">
            <p>
              Partez pour un voyage sensoriel avec le massage balinais, un soin inspiré
              des traditions indonésiennes. Entre pressions délicates et étirements
              subtils, ce rituel équilibre vos énergies pour une détente absolue.
            </p>
          </div>
          <div className="spa-rectangle">
            <p>
              Chassez les tensions grâce à un massage aux pierres chaudes, où chaleur
              et mouvements enveloppants détendent vos muscles en profondeur.
              Un véritable cocon de réconfort pour le corps et l’esprit.
            </p>
          </div>
        </div>
 
        <div className="spa-button-container">
          <ReservationApp/>
        </div>
      </div>
 
      <div className="image-wrapper">
         <img src={spa2} alt="Spa" className="spa-image-reduced" />
        <div className="massage-left-box">
          <h2>La suite bien-être</h2>
          <p>
            Retrouvez notre gamme de soins corps ainsi que nos soins visages et
            offrez-vous des produits et services d’excellence pour une expérience
            unique.
          </p>
          <p>
            <strong>Conditions médicales :</strong> Veuillez nous informer de tout
            état, allergie, blessure, contre-indication à la réalisation d’un soin.
            Merci de nous prévenir.
          </p>
        </div>
 
         <div className="massage-contact-box">
        <div>
          <h4>Horaires</h4>
          <p>
            Nous vous informons que le spa de l’Hôtel du Collectionneur Paris
            ferme ses portes pour se refaire une beauté et vous accueillir au
            printemps 2025 dans un nouveau cadre magnifique et élégant.
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>+33 (0)1 58 36 68 09</p>
          <p>spa@hôtel.com</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Massage;