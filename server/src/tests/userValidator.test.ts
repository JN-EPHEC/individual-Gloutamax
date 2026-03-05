import { validateUserRegistration } from "../utils/userValidator";

describe("User Validator - White Box Testing", () => { 
    // --- 1. Validation du rôle ---
    describe("Validation du Rôle", () => {
        it("devrait lever une erreur si le rôle n'est pas reconnu", () => {
            // On teste la branche de l'erreur
            expect(() => validateUserRegistration(25, "visiteur", "test@domaine.com")).toThrow("Rôle invalide");
        });
    });

    // --- 2. Validation de l'âge (Limites et types) ---
    describe("Validation de l'Age", () => {
        it("devrait retourner false si l'âge est un NaN (Not a Number)", () => {
            // On teste la branche de sécurité contre les types invalides
            expect(validateUserRegistration(NaN, "user", "test@domaine.com")).toBe(false);
        });

        it("devrait lever une erreur si l'âge est strictement supérieur à 120", () => {
            // On teste la limite haute de l'âge
            expect(() => validateUserRegistration(121, "user", "test@domaine.com")).toThrow("Age invalide");
        });
    });

    // --- 3. Validation de l'email ---
    // Note : Il y a un OU (||) dans la condition, donc on teste les deux cas d'échec
    describe("Validation de l'Email", () => {
        it("devrait retourner false s'il manque l'arobase (@)", () => {
            expect(validateUserRegistration(30, "user", "johndoe.com")).toBe(false);
        });

        it("devrait retourner false s'il manque le point (.)", () => {
            expect(validateUserRegistration(30, "user", "john@doecom")).toBe(false);
        });
    });

    // --- 4. Logique métier complexe (Age + Rôle) ---
    describe("Règles métiers (Mineurs et Majeurs)", () => {
        it("devrait accepter un mineur (< 18 ans) SI son rôle est 'stagiaire'", () => {
            // On entre dans le if (age < 18) ET dans le if (role === "stagiaire")
            expect(validateUserRegistration(17, "stagiaire", "stage@ecole.fr")).toBe(true);
        });

        it("devrait refuser un mineur (< 18 ans) si son rôle est différent de 'stagiaire'", () => {
            // On entre dans le if (age < 18) mais PAS dans l'exception du stagiaire
            expect(validateUserRegistration(17, "user", "jeune@domaine.com")).toBe(false);
        });

        it("devrait accepter un utilisateur classique (>= 18 ans, rôle valide, email valide)", () => {
            expect(validateUserRegistration(25, "admin", "boss@entreprise.com")).toBe(true);
        });
    });
});