import React, { useState } from "react";
import AdminContent from "../../components/admin/AdminContent";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "./admin.css"; // CSS global
import MiddlewareAuth from "../../authentification/middleware";

const Admin = () => {
  MiddlewareAuth();
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="app">
      <AdminSidebar onSectionChange={setActiveSection} />
      <AdminContent activeSection={activeSection} />
    </div>
  );
};

export default Admin;
