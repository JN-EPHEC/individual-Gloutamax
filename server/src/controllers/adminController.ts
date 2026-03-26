import type { Request, Response, NextFunction } from 'express'; 

export const getAdmin = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        res.json({ message: "Bienvenue dans la zone admin Basic" });
    } catch(error) {
        next(error);
    }
};

export const getAdminDigest = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        // req.user contiendra "mufasa" si l'authentification réussit
        res.json({ message: `Bienvenue dans la zone Digest, ${req.user} !`})
    } catch(error) {
        next(error);
    }
};