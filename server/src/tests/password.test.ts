import { describe } from "node:test";
import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {

    // --- 1. REGLES GLOBALES (Branches 1, 2, 3) ---
    describe("Règles globales (Toutes tranches d'âge)", () => {
        it("devrait rejeter un mot de passe vide (Branch 1)", () => {
            expect(validatePassword("", 25)).toBe(false);
        });

        it("devrait rejeter un mot de passe trop court, < 8 caractères (Branch 2)", () => {
            expect(validatePassword("short", 25)).toBe(false);
        });

        it("devrait rejeter un mot de passe trop long, > 20 caractères (Branch 3)", () => {
            expect(validatePassword("thisisaverylongpassword", 25)).toBe(false);
        });
    });

    // --- 2. REGLES ENFANT : < 12 ans ---
    describe("Règles Enfant (Age < 12)", () => {
        it("devrait rejeter s'il n'y a pas de minuscule (Branch 4)", () => {
            // 8 caractères, que des majuscules/chiffres
            expect(validatePassword("NOLOWER1", 10)).toBe(false);
        });

        it("devrait accepter avec au moins une minuscule (Branch finale Enfant)", () => {
            // 8 caractères avec au moins une minuscule
            expect(validatePassword("haslower", 10)).toBe(true);
        })
    });

    // --- 3. REGLES ADULTE : >= 12 et < 65 ans ---
    // Note : Il faut tester individuellement chaque partie du "OU" (||) de la Branch 5
    describe("Règles Adulte (12 <= Age < 65)", () => {
        it("devrait rejeter sans majuscule (Branch 5 - condition 1)", () => {
            expect(validatePassword("noupper123!", 25)).toBe(false);
        });

        it("devrait rejeter sans minuscule (Branch 5 - condition 2)", () => {
            expect(validatePassword("NOLOWER123!", 25)).toBe(false);
        });

        it("devrait rejeter sans chiffre (Branch 5 - condition 3)", () => {
            expect(validatePassword("NoNumbersHere!", 25)).toBe(false);
        });

        it("devrait rejeter sans caractère spécial (Branch 6)", () => {
            // Passe la branch 5, mais échoue à la 6
            expect(validatePassword("NoSpecial123", 25)).toBe(false);
        });

        it("devrait accepter si tous les critères stricts sont remplis (Branch finale Adulte)", () => {
            expect(validatePassword("AllValid123!", 25)).toBe(true);
        });
    });

    // --- 4. REGLES SENIOR : >= 65 ans ---
    // Note : Branch 7 utilise un "ET" (&&). Il faut prouver qu'il faut les DEUX manquants pour échouer.
    describe("Règles Senior (Age >= 65)", () => {
        it("devrait rejeter s'il n'y a NI chiffre NI majuscule (Branch 7)", () => {
            expect(validatePassword("onlylowercase", 70)).toBe(false);
        });

        it("devrait accepter avec juste un chiffre (sans majuscule)", () => {
            expect(validatePassword("hasnumbers123", 70)).toBe(true);
        });

        it("devrait accepter avec juste une majuscule (sans chiffre)", () => {
            expect(validatePassword("HASUPPERCASE", 70)).toBe(true);
        });
    });
});