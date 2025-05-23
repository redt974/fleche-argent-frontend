import React from 'react';
import './index.css';

function Politique() {

  return (
    <div className="container">
      <div>      
        <h1 className="title">Politique de Confidentialité</h1>
        <h2 className="subtitle">1. Introduction</h2>
        <p className="paragraph">Chez Je suis L'Autre, nous accordons une grande importance à la confidentialité de vos informations personnelles. Cette Politique de Confidentialité décrit comment nous collectons, utilisons, et protégeons vos données lorsque vous utilisez notre service de connexion.</p>
        <h2 className="subtitle">2. Collecte des Informations</h2>
        <p className="paragraph">Nous collectons différentes catégories d'informations lorsque vous utilisez notre service :</p>
        <ul className="list">
          <li className="list-item"><strong className="strong">Informations que vous fournissez directement :</strong> Lors de la création d'un compte, nous collectons des informations telles que votre nom, adresse email, mot de passe, et autres informations nécessaires à l'inscription.</li>
          <li className="list-item"><strong className="strong">Informations collectées automatiquement :</strong> Lorsque vous utilisez notre service, nous pouvons collecter des informations sur votre appareil, votre adresse IP, le type de navigateur, et des données de connexion.</li>
          <li className="list-item"><strong className="strong">Cookies et Technologies Similaires :</strong> Nous utilisons des cookies pour améliorer votre expérience utilisateur, mémoriser vos préférences, et collecter des informations sur l'utilisation de notre service.</li>
        </ul>
        <h2 className="subtitle">3. Utilisation des Informations</h2>
        <p className="paragraph">Les informations que nous collectons sont utilisées pour :</p>
        <ul className="list">
          <li className="list-item">Vous fournir l'accès à notre service de connexion.</li>
          <li className="list-item">Maintenir et améliorer notre service.</li>
          <li className="list-item">Vous envoyer des communications relatives à votre compte.</li>
          <li className="list-item">Protéger la sécurité de notre service et de nos utilisateurs</li>
          <li className="list-item">Se conformer aux obligations légales et réglementaires.</li>
        </ul>
        <h2 className="subtitle">4. Partage des Informations</h2>
        <p className="paragraph">Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :</p>
        <ul className="list">
          <li className="list-item"><strong className="strong">Avec votre consentement :</strong> Nous partagerons vos informations avec des tiers lorsque vous nous avez donné votre accord explicite.</li>
          <li className="list-item"><strong className="strong">Fournisseurs de services :</strong> Nous pouvons partager vos informations avec des tiers qui nous aident à exploiter notre service, comme les fournisseurs d'hébergement ou les outils de sécurité.</li>
          <li className="list-item"><strong className="strong">Conformité légale :</strong> Nous pouvons divulguer vos informations si la loi l'exige ou si nous pensons que cela est nécessaire pour protéger nos droits, votre sécurité, ou la sécurité d'autrui.</li>
        </ul>
        <h2 className="subtitle">5. Sécurité des Données</h2>
        <p className="paragraph">Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, toute modification, divulgation ou destruction. Cependant, aucune méthode de transmission ou de stockage des données n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.</p>
        <h2 className="subtitle">6. Vos Droits</h2>
        <p className="paragraph">Vous disposez de plusieurs droits concernant vos informations personnelles, notamment :</p>
        <ul className="list">
          <li className="list-item"><strong className="strong">Droit d'accès :</strong> Vous pouvez demander l'accès aux informations personnelles que nous détenons sur vous.</li>
          <li className="list-item"><strong className="strong">Droit de rectification :</strong> Vous pouvez demander la correction de toute information incorrecte ou incomplète.</li>
          <li className="list-item"><strong className="strong">Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos informations personnelles, sous certaines conditions.</li>
          <li className="list-item"><strong className="strong">Droit à la portabilité des données :</strong> Vous pouvez demander à recevoir vos informations personnelles dans un format structuré et couramment utilisé.</li>
        </ul>
        <p className="paragraph">Pour exercer ces droits, veuillez nous contacter à <a href="mailto:contact@jesuislautre.org">contact@jesuislautre.org</a>.</p>
        <h2 className="subtitle">7. Conservation des Données</h2>
        <p className="paragraph">Nous conservons vos informations personnelles aussi longtemps que nécessaire pour vous fournir notre service et pour respecter nos obligations légales. Lorsque vos informations ne sont plus nécessaires, nous les supprimons de manière sécurisée.</p>
        <h2 className="subtitle">8. Modifications de cette Politique</h2>
        <p className="paragraph">Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Toute modification sera publiée sur cette page et prendra effet immédiatement. Nous vous encourageons à consulter régulièrement cette page pour vous tenir informé des modifications.</p>
        <h2 className="subtitle">9. Contact</h2>
        <p className="paragraph">Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits, veuillez nous contacter à <a href="mailto:contact@jesuislautre.org">contact@jesuislautre.org</a>.</p>     
      </div>
    </div>
  );
}

export default Politique;
