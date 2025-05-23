import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function MiddlewareAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Définir les routes publiques et privées
  const publicRoutes = [
    "/inscription",
    "/connexion",
    "/motdepasse_oublie",
    "/reinitialisation",
  ]; // Routes accessibles sans authentification
  const privateRoutes = ["/deconnexion", "/admin", "/user"]; // Routes nécessitant une authentification

  useEffect(() => {
    const token = localStorage.getItem("token"); // Récupérer le token

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Décoder le token
        const isAdmin = decodedToken?.isAdmin; // Vérifier si l'utilisateur est admin

        if (publicRoutes.includes(currentPath)) {
          // Rediriger les utilisateurs connectés tentant d'accéder à une page publique
          navigate("/");
        } else if (currentPath === "/admin" && !isAdmin) {
          // Empêcher les utilisateurs non-admin d'accéder à /admin
          navigate("/");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        if (privateRoutes.includes(currentPath)) {
          // Rediriger vers la connexion si le token est invalide
          navigate("/connexion");
        }
      }
    } else {
      // Si pas de token, rediriger les utilisateurs non connectés depuis les routes privées
      if (privateRoutes.includes(currentPath)) {
        navigate("/connexion");
      }
    }
  }, [navigate, currentPath, publicRoutes, privateRoutes]);

  return null; // Ce composant est un middleware, donc il ne rend rien
}

export default MiddlewareAuth;
