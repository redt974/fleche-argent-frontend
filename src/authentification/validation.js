// Fonction utilitaire pour supprimer les espaces superflus
export const normalizeString = (str) => {
    return str.replace(/\s+/g, '').trim();
};

// Validation des champs d'email
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return "L'email n'est pas valide.";
    }
    return null;
};

// Validation des champs de mot de passe
export const validatePassword = (mot_de_passe) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(mot_de_passe)) {
        return "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
    }
    return null;
};

// Validation des champs de profession
export const validateProfession = (profession) => {
    if (profession.length < 2) {
        return 'La profession doit contenir au moins 2 caractères.';
    }
    return null;
};

// Fonction de validation de la date de naissance
export const validateDateDeNaissance = (date_de_naissance) => {
    const dateNaissance = new Date(date_de_naissance);
    const today = new Date();
    const age = today.getFullYear() - dateNaissance.getFullYear();
    const monthDiff = today.getMonth() - dateNaissance.getMonth();
    const dayDiff = today.getDate() - dateNaissance.getDate();

    if (isNaN(dateNaissance.getTime()) || dateNaissance >= today) {
        return 'Veuillez entrer une date de naissance valide.';
    }

    // Vérifier si la personne est mineure
    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return 'Vous devez être majeur pour continuer.';
    }

    return null;
};

// Validation des champs d'adresse
export const validateAdresse = (adresse) => {
    if (adresse.length < 5) {
        return 'L\'adresse doit contenir au moins 5 caractères.';
    }
    return null;
};

// Validation des champs de ville
export const validateVille = (ville) => {
    if (ville.length < 2) {
        return 'La ville doit contenir au moins 2 caractères.';
    }
    return null;
};

// Fonction de validation de code postal
export const validateCodePostal = (code_postal) => {
    const normalizedCodePostal = normalizeString(code_postal);
    const codePostalRegex = /^\d{5}$/; // Un code postal en France est constitué de 5 chiffres
    if (!codePostalRegex.test(normalizedCodePostal)) {
        return 'Le code postal doit contenir exactement 5 chiffres.';
    }
    return null;
};

// Validation des champs de prix
export const validatePrix = (prix) => {
    const prixValue = parseInt(prix);
    if (isNaN(prixValue) || prixValue <= 0) {
        return 'Veuillez entrer un prix valide.';
    }
    return null;
};

// Validation des champs de N° Téléphone
export const validateTelephone = (phoneNumber) => {
    const phoneRegex = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return "Le numéro de téléphone n'est pas valide.";
    }
    return null;
};

// Validation des champs du formulaire de connexion
export const validateLoginForm = (formData) => {
    return (
        validateEmail(formData.email) ||
        validatePassword(formData.mot_de_passe)
    );
};

// Validation des champs du formulaire de demandes d'inscription
export const validateDemandeForm = (formData) => {
    return (
        validateEmail(formData.email) ||
        validatePassword(formData.mot_de_passe) ||
        validateTelephone(formData.telephone)
    );
};

// Validation des champs du formulaire d'adhésion
export const validateAdhesionForm = (formData) => {
    return (
        validateAdherent(formData.adherent) ||
        validateUtilisateur(formData.utilisateur) ||
        validatePrix(formData.prix)
    );
};

// Validation des champs de l'objet adherent
export const validateAdherent = (adherent) => {
    return (
        validateProfession(adherent.profession) ||
        validateDateDeNaissance(adherent.date_de_naissance) ||
        validateAdresse(adherent.adresse) ||
        validateVille(adherent.ville) ||
        validateCodePostal(adherent.code_postal)
    );
};

// Validation des champs de l'objet utilisateur
export const validateUtilisateur = (utilisateur) => {
    return (
        validateEmail(utilisateur.email) ||
        validateTelephone(utilisateur.telephone)
    );
};

// Validation des champs du formulaire de contact
export const validateContactForm = (formData) => {
    return (
        validatePassword(formData.mot_de_passe) ||
        validateEmail(formData.email) ||
        validateTelephone(formData.telephone) ||
        validateAdresse(formData.adresse) ||
        validateVille(formData.ville) ||
        validateCodePostal(formData.code_postal)
    );
};