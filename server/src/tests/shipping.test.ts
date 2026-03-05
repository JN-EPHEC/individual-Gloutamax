import { calculateShipping } from '../utils/shipping';

describe('Shipping Calculator - Tests Fonctionnels', () => {
    describe('1. Catalog & Boundaries', () => {

        const testCases = [
            // [Description, Distance, Poids, Type, Attendu]
            ['Distance 0 km -> Prix 10€ (standard)', 0, 5, 'standard', 10],
            ['Distance 50 km -> Prix 10€ (standard)', 50, 5, 'standard', 10],
            ['Distance 51 km -> Prix 25€ (standard)', 51, 5, 'standard', 25],
            ['Distance 500 km -> Prix 25€ (standard)', 500, 5, 'standard', 25],
            ['Distance 501 km -> Prix 50€ (standard)', 501, 5, 'standard', 50],

            ['Poids 9 kg -> Prix 10€ (standard)', 10, 9, 'standard', 10],
            ['Poids 10 kg -> Prix 15€ (standard)', 10, 10, 'standard', 15],
            ['Poids 50 kg -> Prix 15€ (standard)', 10, 50, 'standard', 15],

            ['Entrée invalide (-1, 5) doit lever une erreur distance', -1, 5, 'standard', 'Invalid distance'],
            ['Entrée invalide (10, 0) doit lever une erreur poids', 10, 0, 'standard', 'Invalid weight'],
            ['Entrée invalide (10, -5) doit lever une erreur poids', 10, -5, 'standard', 'Invalid weight'],
            ['Entrée invalide (10, 51) doit lever une erreur poids', 10, 51, 'standard', 'Invalid weight'],
        ];

        // Exécution des 12 tests
        test.each(testCases)(
            '%s',
            (description, distance, weight, type, expected) => {
                if (typeof expected === 'string') {
                    expect(() => calculateShipping(distance as number, weight as number, type as any)).toThrow(expected);
                } else {
                    expect(calculateShipping(distance as number, weight as number, type as any)).toBe(expected);
                }
            }
        );
    });

    describe('2. Pairwise Combinations', () => {
        const pairwiseCases = [
            // ID 1 : D1 (Courte), W1 (Léger), T1 (Standard)
            // Calcul : Bases 10€ + 0% = 10€
            { desc: 'Scénario : 25 km, 5 kg, standard -> Total 10 €', distance: 25, weight: 5, type: 'standard', expected: 10},

            // ID 2 : D1 (Courte), W2 (Lourd), T2 (Express)
            // Calcul : (Base 10€ + 50%) * 2 = 15€ * 2 = 30€
            { desc: 'Scénario : 25 km, 20 kg, express -> Total 30 €', distance: 25, weight: 20, type: 'express', expected: 30 },

            // ID 3 : D2 (Moyenne), W1 (Léger), T2 (Express)
            // Calcul : (Base 25€ + 0%) * 2 = 50€
            { desc: 'Scénario : 100 km, 5 kg, express -> Total 50 €', distance: 100, weight: 5, type: 'express', expected: 50},

            // ID 4 : D2 (Moyenne), W2 (Lourd), T1 (Standard)
            // Calcul : Base 25€ + 50% = 37.5 €
            { desc: 'Scénario : 100 km, 20 kg, standard -> Total 37.5 €', distance: 100, weight: 20, type: 'standard', expected: 37.5},

            // ID 5 : D3 (Longue), W1 (Léger), T2 (Express)
            // Calcul : (Base 50€ + 0%) * 2 = 100€
            { desc: 'Scénario : 600 km, 5 kg, express -> Total 100 €', distance: 600, weight: 5, type: 'express', expected: 100},

            // ID 6 : D3 (Longue), W2 (Lourd), T1 (Standard)
            // Calcul : Base 50€ + 50% = 75€
            { desc: 'Scénario : 600 km, 20 kg, standard -> Total 75 €', distance: 600, weight: 20, type: 'standard', expected: 75},
        ];

        test.each(pairwiseCases)(
            '$desc',
            ({ distance, weight, type, expected }) => {
                expect(calculateShipping(distance, weight, type as any)).toBe(expected);
            }
        );
    });
});