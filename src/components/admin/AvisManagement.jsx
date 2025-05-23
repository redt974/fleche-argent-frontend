import React, { useState, useEffect, useContext } from "react";
import { getData, postData } from "../../services/api";
import { AuthContext } from "../../authentification/AuthContext";
import './AvisManagement.css'; // Importation du fichier CSS

const AvisManagement = () => {
  const { logout, refreshToken } = useContext(AuthContext);
  const [avis, setAvis] = useState([]);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [deleteAvisId, setDeleteAvisId] = useState(null);

  useEffect(() => {
    fetchAvis();
  }, []);

  // Récupérer les avis depuis l'API
  const fetchAvis = async () => {
    try {
      const data = await getData("api/avis", null, null);
      if (Array.isArray(data)) {
        setAvis(data.filter(avis => avis && Object.keys(avis).length > 0)); // Exclut les objets vides
      } else if (typeof data === "object" && data !== null) {
        setAvis(Object.values(data).filter(avis => avis && Object.keys(avis).length > 0));
      } else {
        setAvis([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des avis :", error);
      setAvis([]);
    }
  };

  // Gérer la suppression d'un avis
  const handleDelete = (avisId) => {
    setDeleteAvisId(avisId);
    setDeletePopupVisible(true);
  };

  const handleDeleteAction = async (e) => {
    e.preventDefault();
    try {
      const data = await postData(
        "api/avis/delete",
        { id: deleteAvisId },
        logout,
        refreshToken
      );
      alert(data.message || "Avis supprimé avec succès.");
      setDeletePopupVisible(false);
      fetchAvis();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur s'est produite lors de la suppression.");
    }
  };

  return (
    <div className="avis-management">
      <h1>Gestion des Avis</h1>
      <table className="avis-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Commentaire</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {avis.map((item) => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>{item.commentaire}</td>
              <td>{item.date}</td>
              <td className="avis-actions">
                <button onClick={() => handleDelete(item.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletePopupVisible && (
        <div className="popup">
          <h2>Confirmer la suppression</h2>
          <form onSubmit={handleDeleteAction}>
            <p>Êtes-vous sûr de vouloir supprimer cet avis ?</p>
            <button type="submit">Confirmer</button>
            <button type="button" onClick={() => setDeletePopupVisible(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AvisManagement;
