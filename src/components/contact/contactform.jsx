import React, { useState } from "react";
import { postData } from '../../services/api'; // Fonction pour envoyer des données à l'API
import "./index.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    pays: "",
    sujet: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await postData(
        "api/contact", // URL de l'API
        formData
      );

      alert("Les données du formulaire ont été enregistrées avec succès.");
      window.location.reload(); // Rafraîchit la page après la soumission
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container page-offset">
      <h1 className="contact-title">Contactez-nous</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Entreprise (facultatif) :</label>
          <input
            type="text"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Pays :</label>
          <input
            type="text"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Sujet :</label>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Message :</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`submit-button ${isSubmitting ? "disabled" : ""}`}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
