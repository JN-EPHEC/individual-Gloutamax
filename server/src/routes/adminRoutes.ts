import * as adminController from '../controllers/adminController'; 
import { basicAuth } from '../middlewares/basicAuth';
import { digestAuth } from '../middlewares/digestAuth';
import { Router } from 'express';
const router = Router();

// Get : Accès à la route admin
/**
 * @swagger
 * /api/admin/basic:
 *   get:
 *     summary: Route admin protégée en HTTP Basic
 *     tags: [Admin]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Authentification Basic valide
 *       401: 
 *         description: Non autorisé
 */
router.get('/api/admin/basic', basicAuth, adminController.getAdmin);

// Get avec Digest : Accès à la route admin avec le digest
/**
 * @swagger
 * /api/admin/digest:
 *   get:
 *     summary: Route admin protégée en HTTP Digest
 *     tags: [Admin]
 *     security:
 *       - digestAuth: []
 *     responses:
 *       200:
 *         description: Authentification Digest valide
 *       401: 
 *         description: Non autorisé
 */
router.get('/api/admin/digest', digestAuth, adminController.getAdminDigest);

export default router;