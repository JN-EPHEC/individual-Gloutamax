import type { Request, Response, NextFunction } from "express";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On renvoie simplement les informations que le middleware a décodées et placées dans req.user
        res.json({
            message: "Bienvenue sur votre profil sécurisé !",
            profil: (req as any).user
        });
    } catch(error) {
        next(error);
    }
};