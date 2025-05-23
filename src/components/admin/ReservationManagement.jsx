import React, { useState, useEffect, useContext } from "react";
import { postData, getData } from "../../services/api";
import { AuthContext } from "../../authentification/AuthContext";

const ReservationManagement = ({ service }) => {
  const { logout, refreshToken } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [deleteReservationId, setDeleteReservationId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, [service]);

  const fetchReservations = async () => {
    try {
      const data = await getData(`api/services/${service}`, null, null);
      setReservations(Array.isArray(data) ? data : Object.values(data));
    } catch (error) {
      console.error("Erreur lors du chargement des réservations:", error);
      setReservations([]);
    }
  };

  const handleDelete = (reservationId) => {
    setDeleteReservationId(reservationId);
    setDeletePopupVisible(true);
  };

  const handleDeleteAction = async (e) => {
    e.preventDefault();
    try {
      const data = await postData(
        "api/delete_reservation",
        { id: deleteReservationId },
        logout,
        refreshToken
      );
      alert(data.message);
      setDeletePopupVisible(false);
      fetchReservations();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <div>
      <h1>Gestion des Réservations : {service.toUpperCase()}</h1>

      <table>
        <thead>
          <tr>
            <th>ID Utilisateur</th>
            <th>Service</th>
            <th>Date</th>
            <th>Horaire</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations
            .filter(
              (reservation) =>
                reservation && Object.keys(reservation).length > 0
            )
            .map((reservation) => {
              const date = new Date(reservation.date); // Conversion de la date ISO en objet Date
              return (
                <tr key={reservation.id}>
                  <td>{reservation.user_id}</td>
                  <td>{reservation.service}</td>
                  <td>{date.toLocaleDateString("fr-FR")}</td>{" "}
                  {/* Format: jj/mm/aaaa */}
                  <td>{reservation.horaire}</td>
                  <td>{Number(reservation.prix).toFixed(2)}€</td>
                  <td>
                    <button onClick={() => handleDelete(reservation.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {deletePopupVisible && (
        <div className="popup">
          <h2>Confirmer la suppression</h2>
          <form onSubmit={handleDeleteAction}>
            <p>Êtes-vous sûr de vouloir supprimer cette réservation ?</p>
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

export default ReservationManagement;
