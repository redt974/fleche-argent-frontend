import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { getData, postData } from '../../services/api'; 
import { AuthContext } from '../../authentification/AuthContext'; 
import './index.css'; 

function Verify() {
  // Déclaration des états locaux pour gérer le statut de la vérification, l'affichage du modal, et l'état de soumission
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation(); // Hook pour obtenir l'objet location qui contient l'URL actuelle
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const query = new URLSearchParams(location.search); // Analyse les paramètres de requête dans l'URL
  const token = query.get('token'); // Extrait le paramètre "token" de l'URL
  const { checkAuth } = useContext(AuthContext); // Utilise le contexte d'authentification pour vérifier l'état de connexion

  // Effet pour effectuer la vérification une fois que le composant est monté et que le token est disponible
  useEffect(() => {
    if (token) {
      getData(`verify?token=${token}`) // Effectue une requête GET pour vérifier le token
        .then((response) => {

          // Gère les différentes réponses possibles de l'API
          switch (response.message) {
            case 'Nouvelle Connexion Détectée':
              setShowModal(true); // Affiche le modal pour confirmer la nouvelle connexion
              setStatus('Une nouvelle connexion a été détectée. Veuillez confirmer.');
              break;
            case 'Token expiré.':
              setStatus('Le lien de vérification a expiré. Veuillez demander un nouveau lien.');
              setShowModal(false);
              break;
            case 'Une réponse est en attente pour cette connexion.':
              setStatus('Une réponse est en attente pour cette connexion.');
              setShowModal(true);
              break;
            case 'Connexion validée avec succès.':
              setStatus('Connexion validée.');
              setShowModal(true);
              break;
            default:
              setStatus('Échec de la vérification de la connexion.');
              setShowModal(false);
              break;
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification de la connexion:', error);
          setStatus('Une erreur est survenue lors de la vérification. Veuillez réessayer.');
        });
    } else {
      navigate('/'); // Redirige vers la page d'accueil
    }
  }, [token, navigate]);

  // Fonction pour gérer la réponse de l'utilisateur (oui ou non)
  const handleUserResponse = (response) => {
    if (isSubmitting) return; // Empêche la soumission multiple
    setIsSubmitting(true);

    postData('verify/response', { token: token, response }) // Envoie la réponse de l'utilisateur à l'API
      .then((result) => {
        if (result.success && result.message === 'Connexion validée et tokens créés.') {
          localStorage.setItem('token', result.accessToken); // Stocke le token d'accès dans le stockage local
          setStatus('Réponse enregistrée.');
          setShowModal(false);
          checkAuth(); // Met à jour le statut de connexion
          navigate('/'); // Redirige vers la page d'accueil
        } else {
          setStatus(result.message || 'Réponse enregistrée.');
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de la réponse:', error);
        setStatus("Erreur lors de l'enregistrement de votre réponse.");
      })
      .finally(() => setIsSubmitting(false)); // Réinitialise l'état de soumission après la requête
  };

  return (
    <div>
      <h2>Vérification de Connexion</h2>
      <p>{status}</p>
      {showModal && (
        <div className="verify-modal">
          <div className="verify-modal-content">
            <p>Nous avons détecté une nouvelle connexion. Confirmez-vous cette connexion ?</p>
            <button className='verify' onClick={() => handleUserResponse('yes')} disabled={isSubmitting}>Oui</button>
            <button className='verify' onClick={() => handleUserResponse('no')} disabled={isSubmitting}>Non</button>
          </div>
        </div>
      )}
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  );
}

export default Verify;
