import * as userController from "../controllers/userController"
import { Router } from "express";
import { checkIdParam } from '../middlewares/checkIdParam' 
const router = Router();

// == DEFINITION DES METHODES DE REFACTORING API ==
// Get : Récupération de tous les utilisateurs
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/', userController.getAllUsers)

// Post : Création d'un utilisateur
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: Utilisateur crée
 */
router.post('/', userController.createUser)

// Delete/:id : Suppresion d'un utilsateur par son ID
/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', checkIdParam, userController.deleteUser);

export default router;  