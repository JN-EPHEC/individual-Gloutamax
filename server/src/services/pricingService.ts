export class PricingService {
    // Centralise le calcul pour éviter la duplication de code
    public calculateTotal(price: number, quantity: number, discountCode: string): number {
        let amount = price * quantity;

        if (discountCode === "SUMMER20") {
            amount -= amount * 0.2;
        } else if (discountCode === "WELCOME10") {
            amount -= amount * 0.1;
        }

        amount += amount * 0.21; // Ajout de 21% de TVA
        return amount;
    }
}