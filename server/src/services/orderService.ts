import { EmailService } from "./emailService";
import { PricingService } from "./pricingService";
import type { OrderRequestDTO, UserDTO } from './dtos';// Assumant que les interfaces sont exportés ici

export class OrderService {
    // Utilisation de l'encapsulation avec 'private' pour ls dépendances
    private emailService: EmailService;
    private pricingService: PricingService;

    constructor() {
        this.emailService = new EmailService();
        this.pricingService = new PricingService();
    }

    public processOrder(orderRequest: OrderRequestDTO): number {
        this.validateUser(orderRequest.user);
        this.checkInventory(orderRequest.product.stock, orderRequest.quantity);

        const finalPrice = this.pricingService.calculateTotal(
            orderRequest.product.price,
            orderRequest.quantity,
            orderRequest.discountCode
        );

        // Mise à jour du stock (Simulation)
        orderRequest.product.stock -= orderRequest.quantity;

        // Envoi de l'email 
        this.emailService.send(
            orderRequest.user.email,
            `Votre commande pour ${orderRequest.quantity}x ${orderRequest.product.name} est confirmée. Total: ${finalPrice}€.`
        );

        return finalPrice;
    }

    public calculateRefund(price: number, quantity: number, discountCode: string): number {
        const refundAmount = this.pricingService.calculateTotal(price, quantity, discountCode);

        this.emailService.send(
            "admin@boutique.com", // Ou l'email client si on le passait en paramètre
            `Envoi de l'email de remboursement. Montant: ${refundAmount}€.`
        );

        return refundAmount;
    }

    // Méthodes privées pour alléger processOrder (Encapsulation)
    private validateUser(user: UserDTO): void {
        if (!user.email.includes("@") || user.firstName === "") {
            throw new Error("Utilisateur invalide");
        }
    }

    private checkInventory(stock: number, quantity: number): void {
        if (quantity > stock) {
            throw new Error("Stock insuffisant");
        }
    }
 }