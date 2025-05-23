import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authentification/AuthContext';

function Deconnexion() {

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  // Effet pour vérifier la présence du token lors du rendu du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/connexion'); // Redirige vers la page de connexion si aucun token n'est trouvé
    }
  }, [navigate]);
  
  // Utilisation du contexte AuthContext pour accéder aux fonctions de déconnexion
  const { logout, checkAuth } = useContext(AuthContext);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    try {
      logout(); // Déconnexion locale (effacement des informations d'authentification)
      localStorage.removeItem('refreshToken'); // Token de rafraîchissement
      localStorage.removeItem('rememberMeToken'); // Token Remember Me
      checkAuth(true); // Appel de checkAuth avec isManualLogout = true
      navigate('/connexion'); // Redirection vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error.message); // Gestion des erreurs
    }
  };

  return (
    <a onClick={handleLogout}>Déconnexion</a>
  );
}

export default Deconnexion;