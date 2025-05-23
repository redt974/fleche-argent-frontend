import React, { useState } from "react";
// import './AdminSidebar.css'; // Importez votre CSS

const AdminSidebar = ({ onSectionChange }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSection, setActiveSection] = useState("Dashboard");

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section); // Mise à jour locale
    onSectionChange(section); // Notification au parent
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>
          <i className="fas fa-tachometer-alt"></i> Admin
        </h2>
      </div>
      <ul className="sidebar-menu">
        <li
          id="D"
          onClick={() => handleSectionClick("Dashboard")}
          className={`activ ${activeSection === "Dashboard" ? "yes" : ""}`}
        >
          <i className="fas fa-home"></i> Dashboard
        </li>
        <li
          id="U"
          onClick={() => handleSectionClick("Users")}
          className={`activ ${activeSection === "Users" ? "yes" : ""}`}
        >
          <i className="fas fa-home"></i> Users
        </li>
        <li
          id="C"
          onClick={() => handleSectionClick("Commentaire")}
          className={`activ ${activeSection === "Commentaire" ? "yes" : ""}`}
        >
          <i className="fas fa-home"></i> Commentaire
        </li>
        <li
          id="fin-toggle"
          className="activ"
          onClick={() => toggleSubMenu("Reservation")}
        >
          <i className="fas fa-wallet"></i> Reservation
          <span
            className={`arrow ${activeMenu === "Reservation" ? "rotate" : ""}`}
          >
            &#9660;
          </span>
        </li>

        {activeMenu === "Reservation" && (
          <ul
            className={`submenu ${
              activeMenu === "Reservation" ? "visible" : ""
            }`}
          >
            <li
              id="Do"
              onClick={() => handleSectionClick("Don")}
              className={`activ ${activeSection === "Don" ? "yes" : ""}`}
            >
              <i className="fas fa-hand-holding-usd"></i> Hotel
            </li>
            <li
              id="DE"
              onClick={() => handleSectionClick("Depenses")}
              className={`activ ${activeSection === "Depenses" ? "yes" : ""}`}
            >
              <i className="fas fa-file-invoice-dollar"></i> Restaurant
            </li>
            <li
              id="AD"
              onClick={() => handleSectionClick("Spa")}
              className={`activ ${activeSection === "Spa" ? "yes" : ""}`}
            >
              <i className="fas fa-users"></i> Spa
            </li>
          </ul>
        )}
        <li
          id="T"
          onClick={() => handleSectionClick("Ticket")}
          className={`activ ${activeSection === "Ticket" ? "yes" : ""}`}
        >
          <i className="fas fa-home"></i> Contact
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
