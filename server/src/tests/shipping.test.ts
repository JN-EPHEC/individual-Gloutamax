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
});