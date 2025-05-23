import React, { useState, useEffect } from "react";
import { getData, postData } from "../../services/api";
import { jwtDecode } from "jwt-decode";

const AvisPage = () => {
  const [users, setUsers] = useState([]);

  const [avis, setAvis] = useState([]);
  const [nom, setNom] = useState("");
  const [commentaire, setCommentaire] = useState("");

  // Charger les avis au démarrage
  useEffect(() => {
    fetchAvis();
    fetchUsers();
  }, []);

  // Récupérer les avis depuis l'API
  const fetchAvis = async () => {
    try {
      const data = await getData("api/avis", null, null);
      if (Array.isArray(data)) {
        setAvis(data.filter((avis) => avis && Object.keys(avis).length > 0)); // Exclut les objets vides
      } else if (typeof data === "object" && data !== null) {
        setAvis(
          Object.values(data).filter(
            (avis) => avis && Object.keys(avis).length > 0
          )
        );
      } else {
        setAvis([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des avis :", error);
    }
  };

  // Fonction pour formater la date au format "jj/mm/aaaa"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Ajouter un nouvel avis via l'API
  const ajouterAvis = async (e) => {
    e.preventDefault();
    try {
      const nouvelAvis = {
        nom: getPseudoByUserId(userId),
        commentaire,
        date: new Date().toISOString().split("T")[0],
      };

      const response = await postData("api/avis", nouvelAvis, null);

      if (response && response.success === true) {
        alert("Avis ajouté avec succès !");
        setNom("");
        setCommentaire("");

        // Recharger les avis depuis l'API
        await fetchAvis();
      } else {
        alert(response.message || "Erreur lors de l'ajout de l'avis.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un avis :", error);
      alert("Une erreur s'est produite.");
    }
  };
  const fetchUsers = async () => {
    try {
      const data = await getData("api/users", null, null); // Remplacez l'URL par l'endpoint pour récupérer les utilisateurs
      setUsers(Array.isArray(data) ? data : Object.values(data));
      console.log(data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
    }
  };
  console.log(users);

  const getPseudoByUserId = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.nom : "inconue"; // Remplacez "pseudo" par la propriété correspondante dans vos données
  };
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Page des Avis</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={ajouterAvis} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="hidden"
              value={getPseudoByUserId(userId)}
              onChange={(e) => setNom(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Commentaire:
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              rows="4"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Ajouter un avis
        </button>
      </form>

      {/* Liste des avis */}
      <h2>Derniers avis</h2>
      <div>
        {avis.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{item.nom}</strong> - <em>{formatDate(item.date)}</em>
            </p>
            <p>{item.commentaire}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvisPage;
