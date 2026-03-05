// Définition d'un type strict pour les rôles autorisés
export type Role = 'admin' | 'user' | 'stagiaire';

export const validateUserRegistration = (age: number, role: Role | string, email: string): boolean => {
    // 1. Validation du rôle en premier (pour lever l'erreur au plus vite)
    if (role !== "admin" && role !== "user" && role !== "stagiaire") {
        throw new Error("Rôle invalide");
    }

    // 2. Validation de l'âge
    // On s'assure d'abord que c'est un vrai nombre (pas un NaN qui fausserait les calculs)
    if (Number.isNaN(age)) {
        return false;
    }

    if (age > 120) {
        throw new Error("Age invalide");
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