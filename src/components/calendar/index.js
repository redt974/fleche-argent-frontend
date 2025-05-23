import React, { useState, useContext } from "react";
import { postData } from "../../services/api";
import "./css/index.css";
import Loading from "../loading";
import { AuthContext } from "../../authentification/AuthContext"; // Importer AuthContext
import { jwtDecode } from "jwt-decode"; // Assurez-vous d'importer jwtDecode

const BookingCalendar = ({ selectedRange, setSelectedRange }) => {
  const { logout, refreshAuthToken, auth } = useContext(AuthContext); // Utiliser useContext pour obtenir logout, refreshAuthToken, et auth
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDatesMap, setBookedDatesMap] = useState({});
  const [selectedService, setSelectedService] = useState("hotel");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Etat pour le modal

  // Décoder le token JWT pour obtenir userId
  const userId = auth?.token ? jwtDecode(auth.token).id : null;

  // Generate days for the calendar view
  const generateDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Fill empty slots before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Ajouter les jours du mois 
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(year, month, i);
      days.push(date.toLocaleDateString('en-CA'));  // Format : YYYY-MM-DD
    }

    return days;
  };

  // Check if the date is already booked and has a price
  const isBooked = (dateStr) => {
    return bookedDatesMap[dateStr]; // Vérifie si la date (formatée) est réservée
  };

  // Handle selecting a date range
  const handleDateClick = (dateStr) => {
    if (!dateStr || isBooked(dateStr)) return;

    if (selectedRange.length === 0 || selectedRange.length === 2) {
      setSelectedRange([dateStr]); // Commence une nouvelle sélection
    } else {
      const [startDate] = selectedRange;
      const endDate = dateStr;
      const range = [];

      for (
        let d = new Date(Math.min(new Date(startDate), new Date(endDate)));
        d <= new Date(Math.max(new Date(startDate), new Date(endDate)));
        d.setDate(d.getDate() + 1)
      ) {
        range.push(d.toISOString().split("T")[0]); // Convertit en format YYYY-MM-DD
      }

      setSelectedRange(range); // Sélectionne la plage complète
    }
  };

  // Handle switching months
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1, 1))

    );
  };

  // Handle the reservation process
  const handleReservation = async () => {
    if (selectedRange.length === 0) {
      alert("Veuillez sélectionner au moins une date pour la réservation.");
      return;
    }

    if (selectedService === "restaurant" && numberOfGuests < 1) {
      alert("Le nombre de personnes doit être d'au moins 1.");
      return;
    }

    try {
      const serviceData = {
        dates: selectedRange,
        user_id: userId, // Utilisation de userId décodé depuis le token JWT
        type: selectedService,
        ...(selectedService === "restaurant" && { guests: numberOfGuests }),
      };

      const endpoint = {
        hotel: "api/hotel",
        restaurant: "api/restaurant",
        "spa-massage": "api/spa-massage",
      }[selectedService];

      await postData(endpoint, serviceData, logout, refreshAuthToken);
      alert(`Réservation pour le service ${selectedService} confirmée.`);
      setShowModal(false); // Fermer le modal après une réservation réussie
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert(
        "Une erreur est survenue lors de la réservation. Veuillez réessayer."
      );
    }
  };


  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="btn-calendar prev-month">
          &lt;
        </button>
        <span className="month-year">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={handleNextMonth} className="btn-calendar next-month">
          &gt;
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="calendar-error">{error}</div>
      ) : (
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {generateDays().map((dateStr, index) => {
            if (!dateStr) {
              return <div key={index} className="calendar-day empty"></div>;
            }

            const booking = isBooked(dateStr);
            return (
              <div
                key={index}
                className={`calendar-day ${booking ? "booked" : ""} ${
                  selectedRange.includes(dateStr) ? "selected" : ""
                }`}
                onClick={() => handleDateClick(dateStr)}
              >
                {new Date(dateStr).getDate()} {/* Affiche le jour */}
                {booking && <div className="price-tag">${booking.prix}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
