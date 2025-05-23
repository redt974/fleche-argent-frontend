import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Inscription from "./authentification/inscription";
import Connexion from "./authentification/connexion";
import ReinitialisationMotDePasse from "./authentification/reinitialisation";
import MotDePasseOublie from "./authentification/motdepasse_oublie";
import { AuthProvider } from "./authentification/AuthContext";
import Accueil from "./pages/Accueil";
import GoogleRedirect from "./components/google/redirect";
import Header from "./components/header";
import Footer from "./components/footer";
import Verify from "./components/verify";
import Politique from "./juridique/politique";
import Condition from "./juridique/condition";
import ErrorBoundary from "./pages/Error/ErrorBoundary";
import Error from "./pages/Error";
import CookieProvider from "./components/cookies";
import Restauration from "./pages/Restauration";
import Avis from "./pages/Avis/avis";
import Contact from "./pages/Contact/contact";
import Admin from "./pages/Admin/admin";
import Users from "./pages/User/user";
import RoomsPage from "./pages/chambres";
import Massage from "./pages/Spa";

const MainLayout = () => {
  return (
    <AuthProvider>
      <CookieProvider>
        <Header />
        <Outlet />
        <Footer />
      </CookieProvider>
    </AuthProvider>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: (
        <AuthProvider>
          <Header />
          <Error />
          <Footer />
        </AuthProvider>
      ),
      children: [
        {
          path: "/",
          element: <Accueil />,
        },
        {
          path: "/inscription",
          element: <Inscription />,
        },
        {
          path: "/connexion",
          element: <Connexion />,
        },
        {
          path: "/motdepasse_oublie",
          element: <MotDePasseOublie />,
        },
        {
          path: "/reinitialisation",
          element: <ReinitialisationMotDePasse />,
        },
        {
          path: "/auth/google/redirect",
          element: <GoogleRedirect />,
        },
        {
          path: "/politique-de-confidentialite",
          element: <Politique />,
        },
        {
          path: "/condition-d-utilisation",
          element: <Condition />,
        },
        {
          path: "/verify",
          element: <Verify />,
        },
        {
          path: "/chambres",
          element: <RoomsPage />,
        },
        {
          path: "/restaurant",
          element: <Restauration />,
        },
        {
          path: "/spa-massage",
          element: <Massage />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/avis",
          element: <Avis />,
        },
        {
          path: "/user",
          element: <Users />,
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
