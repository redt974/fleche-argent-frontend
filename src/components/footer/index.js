import React from 'react';
import './css/index.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <h2>Nous trouver à Bordeaux</h2>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90493.80993368957!2d-0.6685844572839972!3d44.86368805030597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527e8f751ca81%3A0x796386037b397a89!2sBordeaux!5e0!3m2!1sfr!2sfr!4v1736244165616!5m2!1sfr!2sfr"
          width="90%" 
          height="350" 
          style={{ border: 0 }}
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps - Bordeaux"
        ></iframe>
      </div>

      <div className="footer-links">
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/conditions-generales-de-vente">Conditions générales de vente</a>
        <a href="/qui-sommes-nous">Qui sommes-nous ?</a>
      </div>
    </div>
  );
}

export default Footer;
