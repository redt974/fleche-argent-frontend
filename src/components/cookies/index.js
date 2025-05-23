import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

const CookieProvider = ({ children }) => {
    const [cookieConsent, setCookieConsent] = useState(false); 
    const [urlHistory, setUrlHistory] = useState([]);
    const [contentStyle, setContentStyle] = useState({}); // Nouvel état pour les styles du contenu
    const location = useLocation();
    const navigate = useNavigate();

    // Vérifier le consentement des cookies au montage et toutes les 30 secondes
    useEffect(() => {
        const checkCookieConsent = () => {
            const consent = Cookies.get('cookies');
            if (consent === 'accepted') {
                setCookieConsent(true);
            } else {
                setCookieConsent(false); // Remettre à false si le cookie n'existe pas ou a été supprimé
            }
        };

        checkCookieConsent(); // Vérifier au montage
        const intervalId = setInterval(checkCookieConsent, 30000); // Vérifier toutes les 30 secondes

        return () => clearInterval(intervalId); // Nettoyer l'intervalle à la désinstallation du composant
    }, []); // Se déclenche uniquement au montage

    useEffect(() => {
        // Mettre à jour l'historique des URL lors du changement de page
        setUrlHistory(prevHistory => [...prevHistory, location.pathname]);
    }, [location]);

    useEffect(() => {
        // Appliquer ou enlever le style en fonction du consentement
        if (!cookieConsent) {
            setContentStyle({
                filter: 'blur(5px)',
                pointerEvents: 'none'
            });
        } else {
            setContentStyle({
                filter: 'none',
                pointerEvents: 'auto'
            });
        }
    }, [cookieConsent]); // Se déclenche lorsque le consentement change

    const handleAcceptCookies = () => {
        // Accepter tous les cookies et mettre à jour les états
        Cookies.set('cookies', 'accepted', { expires: 365 });
        setCookieConsent(true);
    };

    const handleCancel = () => {
        // Vérifier si l'historique contient des URLs
        if (urlHistory.length >= 1) {
            const previousUrl = urlHistory[urlHistory.length - 2];
            // Vérifier si l'URL précédente est du même domaine
            if (new URL(previousUrl, window.location.origin).hostname === window.location.hostname) {
                // Si c'est du même domaine, rediriger vers Google
                window.location.replace('https://www.google.com');
            } else {
                // Sinon, revenir en arrière
                navigate(-1);
            }
        } else {
            // Si aucun historique, rediriger vers Google
            window.location.replace('https://www.google.com');
        }
    };

    return (
        <div>
            {/* Affichage conditionnel du bandeau de cookies */}
            {cookieConsent === false && (
                <div className="cookie-banner">
                    <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.</p>
                    <div className="cookie-buttons">
                        <button onClick={handleAcceptCookies}>Accepter</button>
                        <button onClick={handleCancel}>Annuler</button>
                    </div>
                </div>
            )}
            {/* Appliquer les styles conditionnels au contenu */}
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

export default CookieProvider;
