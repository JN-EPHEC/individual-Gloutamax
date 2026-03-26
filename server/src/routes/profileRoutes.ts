import { Router } from 'express';
import * as profileController from '../controllers/profileController';
import { jwtAuth } from '../middlewares/jwtAuth';

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Obtenir le profil utilisateur (protégé par JWT)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé, retourne les données du profil
 *       401:
 *         description: Token manquant
 *       403:
 *         description: Token invalide ou expiré
 */
// On protège la route avec le middleware
router.get('/api/profile', jwtAuth, profileController.getProfile);

export default router;