import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    // Récupération de l'en-tête
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé: Token manquant ou mal formaté"});
    }

    // Extraction du jeton (qui commence à partir du 7e caractère, après "Bearer ")
    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_ACCESS_SECRET;
        if (!secret) throw new Error("Secret manquant");

        // jwt.verify valide la signature et l'expiration 
        const decoded = jwt.verify(token, secret);

        // Si valide, on stocke le payload dans req.user
        (req as any).user = decoded;

        // ON passe au contrôleur
        next();
    } catch(error) {
        // Si expiré ou invalide, on renvoie 401 ou 403
        return res.status(403).json({ message: "Accès refusé : Token invalide ou expiré "});
    }
}