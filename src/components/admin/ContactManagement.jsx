import React, { useState, useEffect, useContext } from "react";
import { getData, postData } from '../../services/api';
import { AuthContext } from "../../authentification/AuthContext";

const ContactManagement = () => {
  const { logout, refreshToken, auth } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getData("api/contacts", null, null);
      if (Array.isArray(data)) {
        setContacts(data.filter(contact => contact && Object.keys(contact).length > 0)); // Exclut les objets vides
      } else if (typeof data === "object" && data !== null) {
        setContacts(Object.values(data).filter(contact => contact && Object.keys(contact).length > 0));
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des contacts :", error);
      setContacts([]);
    }
  };

  const handleDelete = (contactId) => {
    setDeleteContactId(contactId);
    setDeletePopupVisible(true);
  };

  const handleDeleteAction = async (e) => {
    e.preventDefault();
    try {
      const data = await postData(
        "api/contact/delete",
        { id: deleteContactId },
        logout,
        refreshToken
      );
      alert(data.message);
      setDeletePopupVisible(false);
      fetchContacts();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur s'est produite lors de la suppression.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestion des Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Entreprise</th>
            <th>Email</th>
            <th>Pays</th>
            <th>Sujet</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.nom}</td>
              <td>{contact.prenom}</td>
              <td>{contact.entreprise || "-"}</td>
              <td>{contact.email}</td>
              <td>{contact.pays}</td>
              <td>{contact.sujet}</td>
              <td>{contact.message}</td>
              <td>
                <button onClick={() => handleDelete(contact.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletePopupVisible && (
        <div className="popup">
          <h2>Confirmer la suppression</h2>
          <form onSubmit={handleDeleteAction}>
            <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
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

export default ContactManagement;
