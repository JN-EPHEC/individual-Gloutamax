import * as userController from "../controllers/userController"
import { Router } from "express";

// Création du router 
const router = Router();

// == DEFINITION DES METHODES DE REFACTORING API ==
// Get : Récupération de tous les utilisateurs
router.get('/', userController.getAllUsers)

// Post : Création d'un utilisateur
router.post('/', userController.createUser)

// Delete/:id : Suppresion d'un utilsateur par son ID
router.delete('/:id', userController.deleteUser);

export default router;  