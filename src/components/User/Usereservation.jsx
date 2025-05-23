import React, { useState, useEffect } from "react";
import { getData } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import "./Usereservation.css";

const UserReserve = () => {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getData(`api/reservation/get?user_id=${userId}`, null, null);
      console.log(data);
      if (data && data["0"]) {
        setReservations(Object.values(data).filter((item) => typeof item === "object" && item.id));
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des réservations:", error);
      setReservations([]);
    }
  };

  return (
    <div className="user-reserve-container">
      <div className="user-reserve-header">
        <h1 className="user-reserve-title">Historique des Réservations</h1>
      </div>

      {reservations.length === 0 ? (
        <p className="user-reserve-no-data">Aucune réservation n'a été trouvée.</p>
      ) : (
        <table className="user-reserve-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Type</th>
              <th>Date</th>
              <th>Horaire</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.service_nom}</td>
                <td>{reservation.service_type}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.horaire}</td>
                <td>{reservation.prix} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserReserve;
