import React from "react";
// import './AdminContent.css'; // Votre CSS fourni
import ChartComponent from "./ChartComponent";
import UserManagement from "./UserManagement";
import ReservationManagement from "./ReservationManagement";
import ContactManagement from "./ContactManagement";
import AvisManagement from "./AvisManagement";
const AdminContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Don":
        return <ReservationManagement service="chambre" />;
      case "Depenses":
        return <ReservationManagement service="restaurant" />;
      case "Spa":
        return <ReservationManagement service="spa" />;
      case "Users":
        return <UserManagement />;
      case "Ticket":
        return <ContactManagement />;
      case "Commentaire":
        return <AvisManagement />;
      default:
        return <h2>Section en cours de préparation</h2>;
    }
  };

  return <div className="content">{renderContent()}</div>;
};

const Dashboard = () => {
  // Données pour les graphiques
  const registrationsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Inscriptions",
        data: [5, 15, 10, 20, 25],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const participationData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Participation",
        data: [3, 10, 15, 7, 12],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ageData = {
    labels: ["18-25", "26-35", "36-45", "46+"],
    datasets: [
      {
        label: "Répartition des âges",
        data: [25, 35, 20, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Données pour le résumé des activités
  const data = {
    eventsThisMonth: 4,
    newMembersThisWeek: 12,
    totalActiveMembers: 120,
  };

  return (
    <div>
      <div className="header">
        <div className="profile">
          <img src="profile-placeholder.png" alt="Profile" />
          <span>Bienvenue, Admin</span>
        </div>
      </div>

      {/* Graphiques */}
      <div className="stats">
        <div className="card">
          <h3>Graphique des Inscriptions</h3>
          <ChartComponent
            type="bar"
            data={registrationsData}
            options={chartOptions}
          />
        </div>
        <div className="card">
          <h3>Graphique de Participation</h3>
          <ChartComponent
            type="line"
            data={participationData}
            options={chartOptions}
          />
        </div>
        <div className="card">
          <h3>Répartition des Âges</h3>
          <ChartComponent
            type="doughnut"
            data={ageData}
            options={{ responsive: true }}
          />
        </div>
        <div className="card">
          <h3>Résumé des Activités Récentes</h3>
          <p>Événements organisés ce mois-ci: {data.eventsThisMonth}</p>
          <p>
            Nouveaux membres inscrits cette semaine: {data.newMembersThisWeek}
          </p>
          <p>Nombre total de membres actifs: {data.totalActiveMembers}</p>
        </div>
      </div>
      {/* Résumé des activités récentes */}
    </div>
  );
};

export default AdminContent;
