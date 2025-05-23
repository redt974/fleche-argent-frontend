import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import "./css/index.css";
import Loading from "../loading"; // Assurez-vous que vous avez un composant Loading
import RowButtons from "../buttons"; // Importer le composant RowButtons
import BookingCalendar from "../calendar";

const ReservationApp = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(() => {
    // Charger les sélections précédentes depuis le localStorage
    const savedReservation = JSON.parse(
      localStorage.getItem("selectedReservation")
    );
    return (
      savedReservation || {
        service_id: "",
        type: "",
        date: "",
        horaire: "",
        prix: "",
      }
    );
  });
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceCategory, setServiceCategory] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Hook pour la navigation
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          setUserId(jwtDecode(token).id);
          setIsConnected(true);
          fetchAvailableServices();
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error("Token invalide :", error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  }, [token]);

  useEffect(() => {
    // Sauvegarder la sélection de l'utilisateur dans le localStorage chaque fois qu'elle change
    localStorage.setItem(
      "selectedReservation",
      JSON.stringify(selectedReservation)
    );
  }, [selectedReservation]);

  const fetchAvailableServices = async () => {
    setLoading(true);
    try {
      const response = await getData("api/reservation/services");
      if (response && typeof response === "object") {
        const servicesArray = Object.values(response);
        setServices(servicesArray);
      } else {
        console.error(
          "La réponse de l'API n'est pas un objet valide",
          response
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des services :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (!isConnected) {
      navigate("/connexion"); // Redirection vers la page de connexion
    } else {
      setShowModal(true);
      setCurrentStep(1);
      setServiceCategory("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation({
      service_id: "",
      type: "",
      date: "",
      horaire: "",
      prix: "",
    });
    setServiceCategory(""); // Réinitialiser la catégorie de service
    localStorage.removeItem("selectedReservation"); // Supprimer la sélection du localStorage
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSelectServiceCategory = (category) => {
    setServiceCategory(category);
    setSelectedReservation({
      service_id: "",
      type: "",
      date: "",
      horaire: "",
      prix: "",
    });
    setCurrentStep(2);
  };

  const handleSelectType = (type, id, prix) => {
    setSelectedReservation({
      ...selectedReservation,
      type,
      service_id: id,
      prix: prix || 0, // Définit le prix à 0 si non fourni
    });
    setCurrentStep(3);
  };

  const handleSelectDate = (date) => {
    setSelectedReservation({ ...selectedReservation, date });
    setCurrentStep(4);
  };

  const handleReservation = async () => {
    const { service_id, type, date, horaire, prix } = selectedReservation;
    if (!service_id || !type || !date || !horaire) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      // Vérifiez d'abord la disponibilité
      const availabilityResponse = await getData(
        `api/reservation/disponibilite?service_id=${service_id}&date=${date}&horaire=${horaire}`
      );

      if (
        !availabilityResponse ||
        availabilityResponse.nombre_disponible === 0
      ) {
        alert(
          "Ce créneau n'est plus disponible. Veuillez en choisir un autre."
        );
        return;
      }

      const response = await postData("api/reservation/create", {
        user_id: userId,
        service_id: service_id,
        type: type,
        date: date,
        horaire: horaire,
        prix: prix,
      });
      console.log("Réservation réussie !");
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Erreur lors de la réservation");
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Réserver</button>

      {showModal && (
        <div className="reservation-modal">
          <div className="reservation-modal-content">
            <button onClick={handleCloseModal}>Fermer</button>

            {currentStep === 1 && (
              <>
                <h2>Réservation</h2>
                <div>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div>
                      <button
                        onClick={() => handleSelectServiceCategory("chambre")}
                      >
                        Hôtel
                      </button>
                      <button
                        onClick={() =>
                          handleSelectServiceCategory("restaurant")
                        }
                      >
                        Restaurant
                      </button>
                      <button
                        onClick={() => handleSelectServiceCategory("spa")}
                      >
                        Spa
                      </button>
                    </div>
                  )}
                </div>
                <button onClick={handleNextStep} disabled={!serviceCategory}>
                  Suivant
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2>Choisissez un type pour {serviceCategory}</h2>
                <div>
                  {services
                    .filter(
                      (service) =>
                        service.nom &&
                        service.nom.toLowerCase() === serviceCategory
                    )
                    .map((service) => (
                      <button
                        key={service.id}
                        onClick={() =>
                          handleSelectType(
                            service.type,
                            service.id,
                            service.prix
                          )
                        }
                      >
                        {Number(service.prix) === 0
                          ? service.type
                          : `${service.type} - ${service.prix}€`}
                      </button>
                    ))}
                </div>
                <button onClick={handlePreviousStep}>Précédent</button>
                <button
                  onClick={handleNextStep}
                  disabled={!selectedReservation.type}
                >
                  Suivant
                </button>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="step-title">Choisissez une date</h2>
                <BookingCalendar
                  selectedRange={
                    selectedReservation.date
                      ? [new Date(selectedReservation.date)]
                      : []
                  }
                  setSelectedRange={(dates) => {
                    const date = dates.length ? dates[0] : "";
                    setSelectedReservation({ ...selectedReservation, date });
                  }}
                />
                <button
                  className="previous-step-button"
                  onClick={handlePreviousStep}
                >
                  Précédent
                </button>
                <button
                  className="next-step-button"
                  onClick={handleNextStep}
                  disabled={!selectedReservation.date}
                >
                  Suivant
                </button>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="reservation-title">Choisissez une heure</h2>
                <RowButtons
                  className="time-selection-buttons"
                  options={[
                    { value: "10:00", label: "10:00" },
                    { value: "12:00", label: "12:00" },
                    { value: "14:00", label: "14:00" },
                  ]}
                  multiple={false}
                  onSelect={(horaire) =>
                    setSelectedReservation({ ...selectedReservation, horaire })
                  }
                  selectedOptions={[selectedReservation.horaire]}
                  disabledOptions={[]}
                />
                <button
                  onClick={handlePreviousStep}
                  className="previous-step-button"
                >
                  Précédent
                </button>
                <button
                  onClick={handleReservation}
                  className="reservation-button"
                  disabled={!selectedReservation.horaire}
                >
                  Réserver
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationApp;
