import React from 'react';
import './index.css';

function Condition() {

  return (
    <div className="container">
      <div>
        <h1 className="title">Conditions d'Utilisation</h1>
        <h2 className="subtitle">1. Acceptation des Conditions</h2>
        <p className="paragraph">En accédant et en utilisant le service de connexion de L'Hôtel Flèche Argenté, vous acceptez de vous conformer aux présentes Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce service.</p>
        <h2 className="subtitle">2. Description du Service</h2>
        <p className="paragraph">L'Hôtel Flèche Argenté fournit un service de connexion permettant aux utilisateurs de créer un compte, de se connecter et d'accéder à certaines fonctionnalités de notre site web ou application. Ce service est destiné uniquement aux utilisateurs qui respectent ces conditions et toutes les lois applicables.</p>
        <h2 className="subtitle">3. Création de Compte</h2>
        <p className="paragraph">Pour utiliser le service, vous devez créer un compte en fournissant des informations exactes, complètes et à jour. Vous êtes responsable de la sécurité de vos identifiants de connexion et vous acceptez de ne pas partager votre mot de passe avec des tiers. Toute activité effectuée sous votre compte est de votre responsabilité.</p>
        <h2 className="subtitle">4. Protection de la Vie Privée</h2>
        <p className="paragraph">La protection de votre vie privée est importante pour nous. Veuillez consulter notre Politique de Confidentialité pour en savoir plus sur la manière dont nous collectons, utilisons, et protégeons vos informations personnelles.</p>
        <h2 className="subtitle">5. Utilisation Autorisée</h2>
        <p className="paragraph">Vous acceptez d'utiliser notre service uniquement à des fins légales et conformément aux présentes conditions. Il est interdit de :</p>
        <ul className="list">
          <li className="list-item">Utiliser le service à des fins frauduleuses ou illégales.</li>
          <li className="list-item">Violer les droits de propriété intellectuelle ou tout autre droit de tiers.</li>
          <li className="list-item">Tenter d'accéder de manière non autorisée à nos systèmes ou réseaux.</li>
          <li className="list-item">Partager des contenus inappropriés, nuisibles, ou offensants via notre service.</li>
        </ul>
        <h2 className="subtitle">6. Résiliation</h2>
        <p className="paragraph">Nous nous réservons le droit de suspendre ou de résilier votre accès au service sans préavis si vous violez ces conditions ou si nous avons des raisons de croire que votre utilisation du service est inappropriée ou illégale.</p>
        <h2 className="subtitle">7. Modification des Conditions</h2>
        <p className="paragraph">Nous pouvons réviser ces Conditions d'Utilisation à tout moment. Toute modification sera publiée sur cette page et prendra effet immédiatement. En continuant d'utiliser le service après la publication des modifications, vous acceptez les nouvelles conditions.</p>
        <h2 className="subtitle">8. Limitation de Responsabilité</h2>
        <p className="paragraph">Dans la mesure permise par la loi, Je suis L'Autre ne pourra être tenu responsable des dommages directs, indirects, accessoires, consécutifs, ou punitifs résultant de l'utilisation du service, même si nous avons été informés de la possibilité de tels dommages.</p>
        <h2 className="subtitle">9. Droit Applicable</h2>
        <p className="paragraph">Ces conditions sont régies par les lois de [Votre Juridiction]. Tout litige en rapport avec ces conditions sera soumis à la compétence exclusive des tribunaux de [Votre Juridiction].</p>
        <h2 className="subtitle">10. Contact</h2>
        <p className="paragraph">Pour toute question concernant ces Conditions d'Utilisation, veuillez nous contacter à <a href="mailto:"></a>.</p>
      </div>
    </div>
  );
}

export default Condition;
