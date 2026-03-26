import type { Request, Response, NextFunction } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    // Récupère l'en-tête Authorization
    const authHeader = req.headers.authorization;

    // Si l'en-tête est absent, on bloque directement
    if (!authHeader) {
        res.set('WWW-Authenticate', 'Basic realm="Zone Admin"');
        return res.status(401).json({ message: "Accès refusé : En-tête manquant" });
    }

    // Vérification de si l'en-tête commence bine par "Basic "
    if (authHeader.startsWith("Basic ")) {
        // Extraction de la partie encodée en base 64 (tout ce qui vient après "Basic ")
        const base64String = authHeader.split(" ")[1];

        // Décodage de la Base 64 en texte clair
        const credentials = Buffer.from(base64String, 'base64').toString('utf-8');

        // Séparation de la chaîne pour obtenir l'utilsiateur et le mot de passe 
        const [username, password] = credentials.split(":");

        // Vérification de si les identifaints correspdent à ceux demandés
        if (username === "admin" && password === "supersecret") {
            return next(); // Tout est bon, on passe à la suite ! 
        }
    }

    // Si les identifiants sont mauvais ou si ce n'est pas du Basic Auth, on renvoie une erreur 401
    res.set('WWW-Authenticate', 'Basic realm="Zone Admin"');
    return res.status(401).json({ message: "Accès refusé : Identifiants invalides" });
}