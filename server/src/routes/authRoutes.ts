import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter pour obtenir un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: student
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne l'accessToken
 *       401:
 *         description: Identifiants invalides
 */
router.post('/api/auth/login', authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Obtenir un nouvel Access Token grâce au cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Nouvel Access Token généré avec succès
 *       401:
 *         description: Aucun Refresh Token trouvé dans les cookies
 *       403:
 *         description: Refresh Token invalide ou expiré
 */
router.post('/api/auth/refresh', authController.refresh); 

export default router;