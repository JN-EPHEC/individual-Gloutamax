import { Request, Response, NextFunction } from "express"; 

// L'interface permet de typer l'erreur, ou vous pouvez utiliser 'any' pour plus de souplesse
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // 1. Affichage de l'erreur dans la console pour le debug
    console.error(`[Erreur] ${req.method} ${req.url} :`, err.message || err);

    // 2. Récupération dynamique du statut (si l'erreur n'en a pas, on met 500 par défaut)
    const status = err.status || err.statusCode || 500;

    // 3. Récupération du message d'erreur
    const message = err.message || "Une erreur interne du serveur s'est produite";

    // 4. Envoi de la réponse en JSON 
    res.status(status).json({ message });
}; 