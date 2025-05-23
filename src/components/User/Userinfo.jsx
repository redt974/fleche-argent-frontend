import React, { useEffect, useState } from "react";
import { postData, getData } from "../../services/api"; // Fonction pour envoyer des données à l'API
import { jwtDecode } from "jwt-decode"; // Corrigé : importation correcte de jwtDecode
import "./Userinfo.css";

const UpdateUserForm = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getData(`api/users`, null, null);
      const user = Array.isArray(data)
        ? data.find((u) => u.id === userId)
        : Object.values(data).find((u) => u.id === userId);

      if (user) {
        setUsers(data);
        setFormData({
          nom: user.nom || "",
          email: user.email || "",
          telephone: user.telephone || "",
          adresse: user.adresse || "",
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postData(`api/update-user/${userId}`, formData);
      alert("Les informations ont été mises à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-user-form-container">
      <h1 className="update-user-form-title">Modifier vos informations</h1>
      <form onSubmit={handleSubmit} className="update-user-form">
        <div className="update-user-form-group">
          <label className="update-user-label">Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="update-user-input"
          />
        </div>
        <div className="update-user-form-group">
          <label className="update-user-label">Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="update-user-input"
          />
        </div>
        <div className="update-user-form-group">
          <label className="update-user-label">Téléphone :</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="update-user-input"
          />
        </div>
        <div className="update-user-form-group">
          <label className="update-user-label">Adresse :</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="update-user-input"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`update-user-submit-button ${
            isSubmitting ? "update-user-submit-disabled" : ""
          }`}
        >
          {isSubmitting ? "Envoi en cours..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
