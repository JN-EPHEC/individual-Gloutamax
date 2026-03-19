export class EmailService {
    public send(email: string, message: string): void {
        console.log("Connexion au serveur SMTP...");
        console.log(`Envoi de l'email à ${email}: ${message}`);
    }
}