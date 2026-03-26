import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Création d'un utilisateur fictif
const demoUser = { id: 1, username: "student", password: "password123", role: "admin" };

// La fonction pour l'Access Token 
const createAccessToken = () => {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    if (!accessSecret) {
        throw new Error("JWT_ACCESS_SECRET non configure");
    }
    return jwt.sign(
        { id: demoUser.id, username: demoUser.username, role: demoUser.role },
        accessSecret,
        { expiresIn: "15m" },
    );
};

// La fonction pour le Refresh Token
const createRefreshToken = () => {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
        throw new Error("JWT_REFRESH_SECRET non configuré");
    }
    return jwt.sign(
        { id: demoUser.id, username: demoUser.username },
        refreshSecret,
        { expiresIn: "7d" },
    );
};

// Le contrôleur de la route POST /api/auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        // On vérifie les identifiants
        if (username !== demoUser.username || password !== demoUser.password) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        // Exécution des fonctions pour obtenir les valeurs
        const accessToken = createAccessToken();
        const refreshToken = createRefreshToken();

        // On met le refreshToken dans un cookie sécurisé 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // On renvoie l'accessToken en JSON
        res.status(200).json({ accessToken });

    } catch (error) {
        next(error);
    }
};