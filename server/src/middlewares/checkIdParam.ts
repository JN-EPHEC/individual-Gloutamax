import { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // L'expression régulière /^\d+$/ vérifie que la chaîne ne contient QUE des chiffres
  if (!id || !/^\d+$/.test(id)) {
    // On bloque la requête immédiatement et on renvoie une erreur 400
    // Le 'return' est crucial ici pour empêcher le code de continuer et d'appeler next()
    return res.status(400).json({ 
      message: "Requête invalide : l'ID fourni doit être un nombre entier." 
    });
  }

  // Si l'ID est valide, on passe le relais au contrôleur (ou au middleware suivant)
  next();
};