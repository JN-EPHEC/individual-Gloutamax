export type Role = 'admin' | 'user' | 'stagiaire';

/**
 * Valide les données d'un nouvel utilisateur avant de l'enregistrer en base de données.
 *
 * @remarks
 * Cette fonction suit les règles métier suivantes :
 * * 1. Rôle de l'utilisateur :
 * - N'accepte que trois valeurs exactes : "admin", "user", ou "stagiaire".
 * - Erreur : Toute autre valeur lève une exception.
 * * 2. Âge de l'utilisateur :
 * - Doit être un nombre valide.
 * - Si inférieur à 18 ans : Inscription refusée, *sauf* si le rôle est "stagiaire".
 * - Erreur : Un âge strictement supérieur à 120 doit lever une exception.
 * * 3. Email de l'utilisateur :
 * - Doit obligatoirement contenir un caractère '@' et un point '.'.
 * - Sinon, l'inscription est refusée.
 *
 * @param {number} age - L'âge de l'utilisateur.
 * @param {Role | string} role - Le rôle d'accès demandé par l'utilisateur.
 * @param {string} email - L'adresse courriel de l'utilisateur.
 *
 * @returns {boolean} Retourne `true` si les données sont valides, `false` si l'inscription est refusée.
 *
 * @throws {Error} "Rôle invalide" si le rôle fourni n'est pas autorisé.
 * @throws {Error} "Âge invalide" si l'âge est supérieur à 120.
 */
export const validateUserRegistration = (age: number, role: Role | string, email: string): boolean => {
  // 1. Validation du rôle en premier (pour lever l'erreur au plus vite)
  if (role !== "admin" && role !== "user" && role !== "stagiaire") {
    throw new Error("Rôle invalide");
  }

  // 2. Validation de l'âge (Types et Limite haute)
  if (Number.isNaN(age)) {
    return false; 
  }

  if (age > 120) {
    throw new Error("Âge invalide");
  }

  // 3. Validation de l'email
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  // 4. Logique métier : Mineurs vs Majeurs
  if (age < 18) {
    if (role === "stagiaire") {
      return true; // Exception pour les stagiaires mineurs
    }
    return false; // Refusé pour les autres rôles si < 18 ans
  }

  // Si l'utilisateur a 18 ans ou plus, un rôle valide et un email valide
  return true;
};