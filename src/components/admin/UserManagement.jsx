import React, { useState, useEffect, useContext } from "react";
import { postData, getData } from '../../services/api';
import { AuthContext } from "../../authentification/AuthContext";

const UserManagement = () => {
  const { logout, refreshToken, auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getData("api/users", null, null);
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (typeof data === "object" && data !== null) {
        setUsers(Object.values(data));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      setUsers([]);
    }
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setDeletePopupVisible(true);
  };

  const handleDeleteAction = async (e) => {
    e.preventDefault();
    try {
      const data = await postData(
        "api/delete_user",
        { id: deleteUserId },
        logout,
        refreshToken
      );
      alert(data.message);
      setDeletePopupVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users
        .filter((user) => user && Object.keys(user).length > 0) // Exclut les objets vides ou null
        .filter((user) => (selectedRole ? user.role === selectedRole : true)) // Applique le filtre par rôle si nécessaire
    : [];

  return (
    <div>
      <div>
        <h1>Gestion des Utilisateurs</h1>
        <label>
          Filtrer par rôle :
          <select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
          >
            <option value="">Tous</option>
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{user.adresse}</td>
              <td>0{user.telephone}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletePopupVisible && (
        <div className="popup">
          <h2>Confirmer la suppression</h2>
          <form onSubmit={handleDeleteAction}>
            <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
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

export default UserManagement;
